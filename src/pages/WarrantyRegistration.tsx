import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';


const WarrantyRegistration = () => {
  const [formData, setFormData] = useState({
    serialNumber: '',
    productModel: '',
    dateOfPurchase: '',
    billFile: null as File | null
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, billFile: file }));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.serialNumber || !formData.productModel || !formData.dateOfPurchase) {
      toast({
        title: 'Error',
        description: 'Please fill all required fields',
        variant: 'destructive'
      });
      return;
    }

    if (!user) {
      toast({
        title: 'Error',
        description: 'Please sign in to register warranty',
        variant: 'destructive'
      });
      navigate('/auth');
      return;
    }

    setLoading(true);
    try {
      let billUploadUrl = '';
      
      // Upload bill file if provided
      if (formData.billFile) {
        const fileExt = formData.billFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from('warranty-bills')
          .upload(fileName, formData.billFile);
        
        if (error) throw error;
        billUploadUrl = data.path;
      }

      // Insert warranty registration
      const { error } = await supabase
        .from('warranty_registrations')
        .insert({
          user_id: user.id,
          serial_number: formData.serialNumber,
          product_model: formData.productModel,
          date_of_purchase: formData.dateOfPurchase,
          customer_name: user.email || 'Customer',
          customer_mobile: '',
          bill_upload_url: billUploadUrl,
          status: 'pending'
        });

      if (error) throw error;

      // Create notification for admin
      await supabase
        .from('notifications')
        .insert({
          type: 'warranty_registration',
          title: 'New Warranty Registration',
          message: `New warranty registration for ${formData.productModel}`,
          data: {
            serialNumber: formData.serialNumber,
            productModel: formData.productModel
          },
          priority: 'normal'
        });

      toast({
        title: 'Success',
        description: 'Warranty request sent successfully! Admin will review your registration.',
      });
      
      // Reset form
      setFormData({
        serialNumber: '',
        productModel: '',
        dateOfPurchase: '',
        billFile: null
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to register warranty',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Warranty Registration</CardTitle>
          <CardDescription>
            Register your Mango appliance for warranty coverage and support
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="serialNumber">Serial Number / Barcode</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="serialNumber"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleInputChange}
                    placeholder="Enter or scan serial number"
                    className="flex-1"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="productModel">Product Model</Label>
                <Input
                  id="productModel"
                  name="productModel"
                  value={formData.productModel}
                  onChange={handleInputChange}
                  placeholder="e.g., Cool Master i, Arctic TC 25"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="dateOfPurchase">Date of Purchase</Label>
                <Input
                  id="dateOfPurchase"
                  name="dateOfPurchase"
                  type="date"
                  value={formData.dateOfPurchase}
                  onChange={handleInputChange}
                  placeholder="dd-mm-yyyy"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="billFile">Bill Upload</Label>
                <div className="mt-1">
                  <Input
                    id="billFile"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload purchase bill (JPG, PNG, PDF)
                  </p>
                </div>
              </div>
            </div>
            
            <Button 
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Warranty Request'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WarrantyRegistration;