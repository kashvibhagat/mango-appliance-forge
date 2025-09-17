-- Create function to send order email notification
CREATE OR REPLACE FUNCTION public.send_order_email_notification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  customer_profile RECORD := NULL;
  request_id uuid;
BEGIN
  -- Get customer profile information if user_id exists
  IF NEW.user_id IS NOT NULL THEN
    SELECT first_name, last_name, phone INTO customer_profile
    FROM public.profiles 
    WHERE user_id = NEW.user_id
    LIMIT 1;
  END IF;

  -- Call the edge function to send email notification
  -- Wrap in exception handling to prevent order insertion failure if email fails
  BEGIN
    SELECT net.http_post(
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
          'customer_name', NEW.customer_name,
          'customer_email', NEW.customer_email,
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
    ) INTO request_id;
  EXCEPTION
    WHEN OTHERS THEN
      -- Log the error but don't fail the order insertion
      RAISE WARNING 'Failed to send order email notification: %', SQLERRM;
  END;

  RETURN NEW;
END;
$function$;

-- Create trigger to call the email function after order insertion
CREATE TRIGGER send_order_email_notification_trigger
AFTER INSERT ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.send_order_email_notification();