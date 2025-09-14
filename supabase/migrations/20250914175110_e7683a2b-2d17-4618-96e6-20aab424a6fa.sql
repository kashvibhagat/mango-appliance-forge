-- Modify orders table to support anonymous customer orders
ALTER TABLE public.orders 
ALTER COLUMN user_id DROP NOT NULL,
ADD COLUMN customer_name TEXT,
ADD COLUMN customer_email TEXT;

-- Update the existing email notification trigger to work with anonymous orders
CREATE OR REPLACE FUNCTION public.send_order_email_notification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  customer_profile RECORD;
  request_id uuid;
BEGIN
  -- Get customer profile information if user_id exists, otherwise use direct customer info
  IF NEW.user_id IS NOT NULL THEN
    SELECT first_name, last_name, phone INTO customer_profile
    FROM public.profiles 
    WHERE user_id = NEW.user_id
    LIMIT 1;
  END IF;

  -- Call the edge function to send email notification using net.http_post
  SELECT net.http_post(
    url := 'https://ccgvldazqlyvptschjkl.supabase.co/functions/v1/send-order-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjZ3ZsZGF6cWx5dnB0c2NoamtsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzE3NTk1NywiZXhwIjoyMDcyNzUxOTU3fQ.6z2WlYdadNu3BYRU7nvlLqhRrFeq8BHBxgWUlOxm2XY'
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

  RETURN NEW;
END;
$$;

-- Create RLS policy to allow anonymous order creation
CREATE POLICY "Allow anonymous order creation" 
ON public.orders 
FOR INSERT 
WITH CHECK (user_id IS NULL);

-- Create RLS policy to allow reading anonymous orders for admin
CREATE POLICY "Admins can view anonymous orders" 
ON public.orders 
FOR SELECT 
USING (user_id IS NULL OR has_role(auth.uid(), 'admin'::app_role));

-- Generate order numbers for anonymous orders too
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := 'MNG-ORD-' || LPAD((SELECT COALESCE(MAX(SUBSTRING(order_number FROM 9)::INTEGER), 0) + 1 FROM public.orders WHERE order_number LIKE 'MNG-ORD-%')::TEXT, 6, '0');
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for order number generation
DROP TRIGGER IF EXISTS generate_order_number_trigger ON public.orders;
CREATE TRIGGER generate_order_number_trigger
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_order_number();