-- Remove the email notification trigger and function with CASCADE
DROP FUNCTION IF EXISTS public.send_order_email_notification() CASCADE;