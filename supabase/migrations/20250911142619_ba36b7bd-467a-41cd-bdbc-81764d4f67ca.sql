-- Create storage bucket for warranty bill uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('warranty-bills', 'warranty-bills', false);

-- Create RLS policies for warranty bills bucket
CREATE POLICY "Users can upload their own warranty bills" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'warranty-bills' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own warranty bills" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'warranty-bills' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admin can view all warranty bills" ON storage.objects
  FOR SELECT USING (bucket_id = 'warranty-bills');

CREATE POLICY "Admin can delete warranty bills" ON storage.objects
  FOR DELETE USING (bucket_id = 'warranty-bills');