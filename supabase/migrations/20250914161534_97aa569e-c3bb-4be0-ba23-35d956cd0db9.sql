-- Enable realtime for orders table
ALTER TABLE public.orders REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.orders;

-- Enable realtime for notifications table (for admin notifications)  
ALTER TABLE public.notifications REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.notifications;

-- Create a trigger to automatically send email notifications when new orders are created
CREATE OR REPLACE FUNCTION public.send_order_email_notification()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
AS $$
DECLARE
  customer_profile RECORD;
BEGIN
  -- Get customer profile information
  SELECT first_name, last_name, phone INTO customer_profile
  FROM public.profiles 
  WHERE user_id = NEW.user_id
  LIMIT 1;

  -- Call the edge function to send email notification
  PERFORM
    net.http_post(
      url := 'https://ccgvldazqlyvptschjkl.supabase.co/functions/v1/send-order-notification',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
      ),
      body := jsonb_build_object(
        'order', jsonb_build_object(
          'id', NEW.id,
          'order_number', NEW.order_number,
          'status', NEW.status,
          'total_amount', NEW.total_amount,
          'created_at', NEW.created_at,
          'user_id', NEW.user_id,
          'items', NEW.items,
          'shipping_address', NEW.shipping_address,
          'profiles', CASE 
            WHEN customer_profile IS NOT NULL THEN
              jsonb_build_object(
                'first_name', customer_profile.first_name,
                'last_name', customer_profile.last_name,
                'phone', customer_profile.phone
              )
            ELSE NULL
          END
        )
      )
    );

  RETURN NEW;
END;
$$;

-- Create trigger for new orders
DROP TRIGGER IF EXISTS send_order_notification_trigger ON public.orders;
CREATE TRIGGER send_order_notification_trigger
  AFTER INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.send_order_email_notification();

-- Create notification for admin when new order is placed
CREATE OR REPLACE FUNCTION public.create_order_notification()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.notifications (type, title, message, data, priority)
  VALUES (
    'new_order',
    'New Order Received',
    'Order ' || NEW.order_number || ' has been placed for ₹' || NEW.total_amount,
    jsonb_build_object(
      'order_id', NEW.id,
      'order_number', NEW.order_number,
      'total_amount', NEW.total_amount
    ),
    'high'
  );

  RETURN NEW;
END;
$$;

-- Create trigger for order notifications
DROP TRIGGER IF EXISTS create_order_notification_trigger ON public.orders;
CREATE TRIGGER create_order_notification_trigger
  AFTER INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.create_order_notification();