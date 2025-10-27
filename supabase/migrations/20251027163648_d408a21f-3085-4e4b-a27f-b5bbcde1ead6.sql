-- Remove the trigger that sends order notification emails
DROP TRIGGER IF EXISTS send_order_email_notification_trigger ON public.orders;

-- Optionally, also drop the function if you want to completely remove it
DROP FUNCTION IF EXISTS public.send_order_email_notification();