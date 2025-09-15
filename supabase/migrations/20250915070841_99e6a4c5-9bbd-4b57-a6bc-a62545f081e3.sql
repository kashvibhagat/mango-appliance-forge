-- Temporarily drop problematic triggers to isolate the issue
DROP TRIGGER IF EXISTS send_order_email_notification_trigger ON public.orders;
DROP TRIGGER IF EXISTS create_order_notification_trigger ON public.orders;
DROP TRIGGER IF EXISTS update_customer_stats_trigger ON public.orders;

-- Keep only the essential order number generation trigger
-- But also fix the generate_order_number function to be more robust
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    -- Simple counter-based approach without complex logic
    NEW.order_number := 'MNG-ORD-' || LPAD(
      (EXTRACT(EPOCH FROM NOW())::BIGINT % 1000000)::TEXT, 
      6, '0'
    );
  END IF;
  RETURN NEW;
END;
$$;