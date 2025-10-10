import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';


const WarrantyRegistration = () => {
  const [formData, setFormData] = useState({
    serialNumber: '',
    productModel: '',
    dateOfPurchase: '',
    customerName: '',
    customerMobile: '',
    billFile: null as File | null
  });
  const [loading, setLoading] = useState(false);
  const [warranties, setWarranties] = useState<any[]>([]);
  const [loadingWarranties, setLoadingWarranties] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUserWarranties();
    }
  }, [user]);

  const fetchUserWarranties = async () => {
    if (!user) return;
    
    try {
      setLoadingWarranties(true);
      const { data, error } = await supabase
        .from('warranty_registrations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWarranties(data || []);
    } catch (error) {
      console.error('Error fetching warranties:', error);
    } finally {
      setLoadingWarranties(false);
    }
  };

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
    
    if (!formData.serialNumber || !formData.productModel || !formData.dateOfPurchase || !formData.customerName || !formData.customerMobile) {
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
          customer_name: formData.customerName,
          customer_mobile: formData.customerMobile,
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
      
      // Reset form and refresh warranties
      setFormData({
        serialNumber: '',
        productModel: '',
        dateOfPurchase: '',
        customerName: '',
        customerMobile: '',
        billFile: null
      });
      
      // Refresh warranties list
      fetchUserWarranties();
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


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <div className="flex items-center gap-2 text-success">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Warranty Accepted</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center gap-2 text-destructive">
            <XCircle className="w-5 h-5" />
            <span className="font-semibold">Warranty Denied</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-warning">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Pending Review</span>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Previous Warranty Registrations */}
      {user && warranties.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Warranty Status</h2>
          <div className="space-y-4">
            {warranties.map((warranty) => (
              <Card key={warranty.id} className={
                warranty.status === 'approved' ? 'border-success bg-success/5' :
                warranty.status === 'rejected' ? 'border-destructive bg-destructive/5' :
                'border-warning bg-warning/5'
              }>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    {getStatusBadge(warranty.status)}
                    <span className="text-sm text-muted-foreground">
                      {new Date(warranty.created_at).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Product:</span>
                      <p className="font-medium">{warranty.product_model}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Serial Number:</span>
                      <p className="font-medium font-mono">{warranty.serial_number}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Purchase Date:</span>
                      <p className="font-medium">
                        {new Date(warranty.date_of_purchase).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {warranty.status === 'approved' && (
                    <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                      <p className="text-sm text-success font-medium">
                        ✓ You have successfully claimed warranty for this product
                      </p>
                    </div>
                  )}

                  {warranty.status === 'rejected' && (
                    <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-sm text-destructive font-medium">
                        ✗ Warranty claim has been denied
                      </p>
                      {warranty.admin_notes && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Note: {warranty.admin_notes}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* New Warranty Registration Form */}
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
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="customerMobile">Mobile Number</Label>
                <Input
                  id="customerMobile"
                  name="customerMobile"
                  type="tel"
                  value={formData.customerMobile}
                  onChange={handleInputChange}
                  placeholder="Enter your mobile number"
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