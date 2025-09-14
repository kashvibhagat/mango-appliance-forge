-- Add missing triggers to orders table for proper functionality

-- Add trigger for generating order numbers
DROP TRIGGER IF EXISTS generate_order_number_trigger ON public.orders;
CREATE TRIGGER generate_order_number_trigger
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_order_number();

-- Add trigger for creating notifications when new orders are placed
DROP TRIGGER IF EXISTS create_order_notification_trigger ON public.orders;
CREATE TRIGGER create_order_notification_trigger
  AFTER INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.create_order_notification();

-- Add trigger for sending email notifications when new orders are placed
DROP TRIGGER IF EXISTS send_order_email_notification_trigger ON public.orders;
CREATE TRIGGER send_order_email_notification_trigger
  AFTER INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.send_order_email_notification();

-- Add trigger for updating updated_at timestamp
DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();