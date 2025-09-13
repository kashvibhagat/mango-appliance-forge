-- Fix function search path issues
CREATE OR REPLACE FUNCTION public.update_customer_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update customer statistics when order is created or updated
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    INSERT INTO public.customers (user_id, email, total_orders, total_spent, last_order_date)
    SELECT 
      NEW.user_id,
      COALESCE(au.email, ''),
      COUNT(orders.id),
      COALESCE(SUM(orders.total_amount), 0),
      MAX(orders.created_at)
    FROM orders
    LEFT JOIN auth.users au ON au.id = NEW.user_id
    WHERE orders.user_id = NEW.user_id
    GROUP BY NEW.user_id, au.email
    ON CONFLICT (user_id) 
    DO UPDATE SET
      total_orders = EXCLUDED.total_orders,
      total_spent = EXCLUDED.total_spent,
      last_order_date = EXCLUDED.last_order_date,
      updated_at = now();
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;