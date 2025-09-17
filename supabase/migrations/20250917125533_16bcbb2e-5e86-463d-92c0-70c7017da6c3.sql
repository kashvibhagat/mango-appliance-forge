-- Remove the email notification trigger and function
DROP TRIGGER IF EXISTS send_order_email_notification_trigger ON public.orders;
DROP FUNCTION IF EXISTS public.send_order_email_notification();