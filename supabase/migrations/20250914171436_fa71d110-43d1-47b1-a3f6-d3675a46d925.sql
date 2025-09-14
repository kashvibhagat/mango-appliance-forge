-- Check and fix the missing triggers on orders table
-- First, let's see the current triggers
SELECT trigger_name, event_manipulation, action_statement 
FROM information_schema.triggers 
WHERE event_object_table = 'orders';

-- Re-create the triggers to ensure they're properly attached
DROP TRIGGER IF EXISTS send_order_notification_trigger ON orders;
DROP TRIGGER IF EXISTS create_order_notification_trigger ON orders;

-- Create the order notification trigger
CREATE TRIGGER create_order_notification_trigger
  AFTER INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION create_order_notification();

-- Create the email notification trigger  
CREATE TRIGGER send_order_notification_trigger
  AFTER INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION send_order_email_notification();

-- Insert a test notification to verify the function works
INSERT INTO notifications (type, title, message, data, priority)
VALUES (
  'test',
  'System Test',
  'Testing notification system',
  '{"test": true}'::jsonb,
  'normal'
);

-- Enable realtime for both tables if not already enabled
ALTER TABLE orders REPLICA IDENTITY FULL;
ALTER TABLE notifications REPLICA IDENTITY FULL;