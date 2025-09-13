import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Truck, CreditCard, Shield, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [saveAddress, setSaveAddress] = useState(false);
  const [requireGST, setRequireGST] = useState(false);
  const [gstDetails, setGstDetails] = useState({
    gstNumber: '',
    companyName: '',
    companyAddress: ''
  });
  
  // Form states
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  
  const [selectedDelivery, setSelectedDelivery] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('cod');

  useEffect(() => {
    if (user) {
      fetchSavedAddresses();
      prefillUserData();
    }
  }, [user]);

  const fetchSavedAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', user?.id)
        .order('is_default', { ascending: false });

      if (error) throw error;
      setSavedAddresses(data || []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const prefillUserData = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (profile) {
        setShippingAddress(prev => ({
          ...prev,
          name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
          email: user?.email || '',
          phone: profile.phone || ''
        }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleAddressSelect = (addressId: string) => {
    const address = savedAddresses.find(addr => addr.id === addressId);
    if (address) {
      setShippingAddress({
        name: `${address.first_name} ${address.last_name}`,
        email: user?.email || '',
        phone: address.phone,
        address: `${address.address_line_1}${address.address_line_2 ? ', ' + address.address_line_2 : ''}`,
        city: address.city,
        state: address.state,
        pincode: address.postal_code,
      });
      setSelectedAddressId(addressId);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
      </div>
    );
  }

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: '5-7 business days',
      price: 0,
      icon: Truck
    },
    {
      id: 'express',
      name: 'Express Delivery', 
      description: '2-3 business days',
      price: 99,
      icon: Truck
    }
  ];

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when you receive your order',
      icon: Shield
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'PhonePe, Google Pay, Paytm',
      icon: CreditCard
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, Rupay',
      icon: CreditCard
    }
  ];

  const selectedDeliveryOption = deliveryOptions.find(option => option.id === selectedDelivery);
  const deliveryCharge = selectedDeliveryOption?.price || 0;
  const gst = Math.round(total * 0.18);
  const finalTotal = total + deliveryCharge + gst;

  const handleAddressSubmit = () => {
    if (!shippingAddress.name || !shippingAddress.email || !shippingAddress.phone || 
        !shippingAddress.address || !shippingAddress.city || !shippingAddress.pincode) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    if (requireGST) {
      if (!gstDetails.gstNumber || !gstDetails.companyName || !gstDetails.companyAddress) {
        toast({
          title: "GST Information Required",
          description: "Please fill all GST details to proceed",
          variant: "destructive"
        });
        return;
      }
    }

    setCurrentStep(2);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      const orderNumber = 'MNG' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      // Save order to database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id,
          order_number: orderNumber,
          status: 'pending',
          total_amount: finalTotal,
          shipping_cost: deliveryCharge,
          is_free_shipping: deliveryCharge === 0,
          shipping_address: {
            ...shippingAddress,
            gst_details: requireGST ? gstDetails : null
          },
          items: items.map(item => ({
            product_id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            total: item.product.price * item.quantity
          }))
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Send admin notification about new order
      try {
        await supabase.functions.invoke('send-admin-order-notification', {
          body: {
            orderId: orderData.id,
            orderNumber: orderNumber
          }
        });
        console.log('Admin notification sent for order:', orderNumber);
      } catch (notificationError) {
        console.error('Failed to send admin notification:', notificationError);
        // Don't fail the order placement if notification fails
      }

      // Send order confirmation email to customer
      try {
        await supabase.functions.invoke('send-order-confirmation', {
          body: {
            orderNumber: orderNumber,
            customerEmail: shippingAddress.email,
            customerName: shippingAddress.name,
            items: items.map(item => ({
              name: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
            })),
            totalAmount: finalTotal,
            shippingAddress: shippingAddress,
          }
        });
        console.log('Order confirmation email sent for order:', orderNumber);
      } catch (emailError) {
        console.error('Failed to send order confirmation email:', emailError);
        // Don't fail the order placement if email fails
      }

      // Save address if requested
      if (saveAddress && user && !selectedAddressId) {
        await supabase.from('user_addresses').insert({
          user_id: user.id,
          title: 'Order Address',
          first_name: shippingAddress.name.split(' ')[0] || '',
          last_name: shippingAddress.name.split(' ').slice(1).join(' ') || '',
          phone: shippingAddress.phone,
          address_line_1: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postal_code: shippingAddress.pincode,
          country: 'India'
        });
      }

      clearCart();
      
      toast({
        title: "Order placed successfully!",
        description: `Your order #${orderNumber} has been confirmed.`
      });
      
      navigate(`/order-success?orderId=${orderNumber}&orderDbId=${orderData.id}&gst=${requireGST}`);
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Error placing order",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {currentStep > step ? <Check className="h-4 w-4" /> : step}
              </div>
              {step < 3 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  currentStep > step ? 'bg-accent' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Saved Addresses */}
                {savedAddresses.length > 0 && (
                  <div className="space-y-2">
                    <Label>Select Saved Address</Label>
                    <Select onValueChange={handleAddressSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose from saved addresses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">+ Use New Address</SelectItem>
                        {savedAddresses.map((address) => (
                          <SelectItem key={address.id} value={address.id}>
                            {address.title} - {address.first_name} {address.last_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={shippingAddress.name}
                      onChange={(e) => setShippingAddress({...shippingAddress, name: e.target.value})}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingAddress.email}
                      onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                    placeholder="Enter 10-digit mobile number"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                    placeholder="House no, Building name, Street name"
                  />
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={shippingAddress.pincode}
                      onChange={(e) => setShippingAddress({...shippingAddress, pincode: e.target.value})}
                      placeholder="6-digit pincode"
                    />
                  </div>
                </div>

                {/* Save Address Checkbox */}
                {user && !selectedAddressId && (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="saveAddress" 
                      checked={saveAddress}
                      onCheckedChange={(checked) => setSaveAddress(checked === true)}
                    />
                    <Label htmlFor="saveAddress" className="text-sm">
                      Save this address for future orders
                    </Label>
                  </div>
                )}

                {/* GST Section */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="requireGST" 
                      checked={requireGST}
                      onCheckedChange={(checked) => setRequireGST(checked === true)}
                    />
                    <Label htmlFor="requireGST" className="text-sm">
                      I need GST invoice for this order
                    </Label>
                  </div>
                  
                  {requireGST && (
                    <div className="space-y-3 ml-6">
                      <div>
                        <Label htmlFor="gstNumber">GST Number *</Label>
                        <Input
                          id="gstNumber"
                          value={gstDetails.gstNumber}
                          onChange={(e) => setGstDetails({...gstDetails, gstNumber: e.target.value})}
                          placeholder="Enter GST number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          value={gstDetails.companyName}
                          onChange={(e) => setGstDetails({...gstDetails, companyName: e.target.value})}
                          placeholder="Enter company name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="companyAddress">Company Address *</Label>
                        <Input
                          id="companyAddress"
                          value={gstDetails.companyAddress}
                          onChange={(e) => setGstDetails({...gstDetails, companyAddress: e.target.value})}
                          placeholder="Enter company address"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <Button onClick={handleAddressSubmit} className="w-full btn-hero">
                  Continue to Delivery Options
                </Button>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Delivery Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Delivery Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedDelivery} onValueChange={setSelectedDelivery}>
                    <div className="space-y-3">
                      {deliveryOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <option.icon className="h-5 w-5 text-muted-foreground" />
                          <div className="flex-1">
                            <Label htmlFor={option.id} className="font-medium cursor-pointer">
                              {option.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                          <div className="text-right">
                            {option.price === 0 ? (
                              <Badge variant="secondary">Free</Badge>
                            ) : (
                              <span className="font-medium">₹{option.price}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <method.icon className="h-5 w-5 text-muted-foreground" />
                          <div className="flex-1">
                            <Label htmlFor={method.id} className="font-medium cursor-pointer">
                              {method.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back to Address
                </Button>
                <Button 
                  onClick={handlePlaceOrder} 
                  className="flex-1 btn-hero"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : `Place Order - ₹${finalTotal.toLocaleString()}`}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded bg-muted"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>
                    {deliveryCharge === 0 ? (
                      <Badge variant="secondary">Free</Badge>
                    ) : (
                      `₹${deliveryCharge.toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4 border-t">
                <Shield className="h-4 w-4" />
                <span>Secure & encrypted checkout</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;