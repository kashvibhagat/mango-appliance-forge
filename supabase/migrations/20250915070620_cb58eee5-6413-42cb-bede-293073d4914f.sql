-- Fix the update_customer_stats function that's causing the ON CONFLICT error
CREATE OR REPLACE FUNCTION public.update_customer_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Update customer statistics when order is created or updated
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    -- Use UPSERT with proper unique constraint on user_id
    INSERT INTO public.customers (user_id, email, total_orders, total_spent, last_order_date)
    SELECT 
      NEW.user_id,
      COALESCE(NEW.customer_email, ''),
      1,
      NEW.total_amount,
      NEW.created_at
    WHERE NEW.user_id IS NOT NULL
    ON CONFLICT (user_id) 
    DO UPDATE SET
      total_orders = customers.total_orders + 1,
      total_spent = customers.total_spent + NEW.total_amount,
      last_order_date = GREATEST(customers.last_order_date, NEW.created_at),
      updated_at = now();
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;