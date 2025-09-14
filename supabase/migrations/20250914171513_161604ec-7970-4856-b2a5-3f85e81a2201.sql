-- Fix remaining search path security issues
CREATE OR REPLACE FUNCTION public.update_customer_stats()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name, phone)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.raw_user_meta_data ->> 'phone'
  );
  RETURN NEW;
END;
$$;