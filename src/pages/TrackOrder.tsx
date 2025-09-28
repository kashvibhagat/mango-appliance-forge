import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import OrderTrackingCard from '@/components/ui/OrderTrackingCard';
import { Search, Package, Truck, MapPin, Calendar, ExternalLink, AlertCircle, Clock, User, Receipt } from 'lucide-react';

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
  user_id: string;
  customer_name: string | null;
  customer_email: string | null;
}

interface ShipmentDetail {
  id: string;
  order_id: string;
  tracking_number: string | null;
  vendor_name: string;
  status: string;
  shipped_at: string | null;
  delivered_at: string | null;
  tracking_link: string | null;
  pod_number: string | null;
  created_at: string;
  updated_at: string;
}

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetail | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  const fetchUserOrders = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    // Clean the order number by removing # prefix if present
    const cleanOrderNumber = orderNumber.trim().replace(/^#/, '');
    const isOrderNumber = cleanOrderNumber.startsWith('MNG-ORD-');

    setSearching(true);
    try {
      let query = supabase.from('orders').select('*');
      
      if (user) {
        // Authenticated users can search by order number or ID
        query = isOrderNumber 
          ? query.eq('order_number', cleanOrderNumber)
          : query.eq('id', cleanOrderNumber);
      } else {
        // Anonymous users must provide both order number and email for security
        if (!customerEmail.trim()) {
          toast({
            title: "Email required",
            description: "Please provide both order number and email address to track your order.",
            variant: "destructive"
          });
          return;
        }
        query = isOrderNumber
          ? query.eq('order_number', cleanOrderNumber).eq('customer_email', customerEmail.trim())
          : query.eq('id', cleanOrderNumber).eq('customer_email', customerEmail.trim());
      }

      const { data: orderData, error } = await query.maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!orderData) {
        toast({
          title: "Order not found",
          description: "No order found with the provided details. Please check your order number" + (user ? "" : " and email address") + ".",
          variant: "destructive"
        });
        setSearchedOrder(null);
        setShipmentDetails(null);
        return;
      }

      setSearchedOrder(orderData);

      // Fetch shipment details for the found order
      const { data: shipmentData, error: shipmentError } = await supabase
        .from('shipment_details')
        .select('*')
        .eq('order_id', orderData.id)
        .maybeSingle();

      if (shipmentError && shipmentError.code !== 'PGRST116') {
        console.error('Error fetching shipment details:', shipmentError);
      }

      setShipmentDetails(shipmentData);

    } catch (error) {
      console.error('Error searching order:', error);
      toast({
        title: "Search failed",
        description: "There was an error searching for your order. Please try again.",
        variant: "destructive"
      });
      setSearchedOrder(null);
      setShipmentDetails(null);
    } finally {
      setSearching(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'in_transit':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'out_for_delivery':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'failed':
      case 'returned':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Package className="h-4 w-4" />;
      case 'shipped':
      case 'in_transit':
        return <Truck className="h-4 w-4" />;
      case 'out_for_delivery':
        return <MapPin className="h-4 w-4" />;
      case 'delivered':
        return <Package className="h-4 w-4" />;
      case 'failed':
      case 'returned':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Track Your Order</h1>
          <p className="text-muted-foreground">
            Enter your order number to track your order and view detailed shipping information
          </p>
        </div>

        {/* Order Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Order
            </CardTitle>
            <CardDescription>
              Enter your order number (e.g., MNG-ORD-182333) or order ID to track any order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="orderNumber">Order Number or ID</Label>
                  <Input
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Enter order number (e.g., MNG-ORD-182333) or order ID"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter either the order number (MNG-ORD-XXXXXX) or the complete order ID.
                  </p>
                </div>
                
                {!user && (
                  <div>
                    <Label htmlFor="customerEmail">Email Address</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      For security, we need both order number and email to track anonymous orders.
                    </p>
                  </div>
                )}
              </div>
              
              <Button type="submit" disabled={searching || !orderNumber.trim()} className="w-full">
                {searching ? 'Searching...' : 'Track Order'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Comprehensive Order Details */}
        {searchedOrder && (
          <div className="space-y-8">
            {/* Shipping Details */}
            {shipmentDetails && (
              <Card className="border border-border/60 shadow-sm">
                <CardHeader className="border-b border-border/40 bg-gradient-to-r from-primary/5 to-primary/10">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-primary/15 rounded-lg">
                      <Truck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-foreground">Shipping Information</span>
                      <p className="text-sm font-normal text-muted-foreground mt-1">
                        Track your order delivery status and details
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Status Banner */}
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-6 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-full shadow-sm">
                          {getStatusIcon(shipmentDetails.status)}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={`${getStatusColor(shipmentDetails.status)} px-3 py-1 text-sm font-semibold`}>
                              {shipmentDetails.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">
                            Your order is {shipmentDetails.status.replace('_', ' ').toLowerCase()}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            Order {searchedOrder.order_number} • {shipmentDetails.vendor_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                        <Calendar className="h-5 w-5 text-primary" />
                        Shipping Timeline
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border border-border/40">
                          <div className="p-2 bg-primary/15 rounded-lg mt-1">
                            <Truck className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <Label className="text-sm font-semibold text-foreground">Shipped</Label>
                            <p className="text-foreground font-medium mt-1">
                              {formatDate(shipmentDetails.shipped_at)}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Your order has been picked up by {shipmentDetails.vendor_name}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-muted/20 rounded-lg border border-border/30">
                          <div className="p-2 bg-muted rounded-lg mt-1">
                            <Package className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <Label className="text-sm font-semibold text-foreground">
                              {shipmentDetails.status === 'delivered' ? 'Delivered' : 'Expected Delivery'}
                            </Label>
                            <p className="text-foreground font-medium mt-1">
                              {shipmentDetails.status === 'delivered' && shipmentDetails.delivered_at
                                ? formatDate(shipmentDetails.delivered_at)
                                : (() => {
                                    // Calculate estimated delivery (3-5 business days from shipped date)
                                    const shippedDate = new Date(shipmentDetails.shipped_at);
                                    const estimatedDelivery = new Date(shippedDate);
                                    estimatedDelivery.setDate(shippedDate.getDate() + 4); // 4 days estimate
                                    return `${estimatedDelivery.toLocaleDateString('en-IN', {
                                      day: '2-digit',
                                      month: 'short',
                                      year: 'numeric'
                                    })} (Estimated)`;
                                  })()
                              }
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {shipmentDetails.status === 'delivered' 
                                ? 'Your order has been successfully delivered'
                                : 'Estimated delivery within 3-5 business days from shipping'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                        <MapPin className="h-5 w-5 text-primary" />
                        Carrier Details
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
                          <Label className="text-sm font-medium text-muted-foreground">Shipping Carrier</Label>
                          <p className="text-lg font-semibold text-foreground mt-1">{shipmentDetails.vendor_name}</p>
                        </div>

                        {shipmentDetails.tracking_number && (
                          <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
                            <Label className="text-sm font-medium text-muted-foreground">Tracking Number</Label>
                            <p className="font-mono text-sm bg-white p-3 rounded border mt-2 text-foreground font-medium">
                              {shipmentDetails.tracking_number}
                            </p>
                          </div>
                        )}

                        {shipmentDetails.pod_number && (
                          <div className="p-4 bg-muted/30 rounded-lg border border-border/40">
                            <Label className="text-sm font-medium text-muted-foreground">POD Number</Label>
                            <p className="font-mono text-sm bg-white p-3 rounded border mt-2 text-foreground font-medium">
                              {shipmentDetails.pod_number}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tracking Link */}
                  {shipmentDetails.tracking_link && (
                    <div className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground mb-2">Real-time Tracking</h4>
                          <p className="text-muted-foreground text-sm">
                            Get live updates on your package location and delivery status
                          </p>
                        </div>
                        <Button 
                          asChild 
                          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3"
                        >
                          <a 
                            href={shipmentDetails.tracking_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Track Live
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Last Updated */}
                  <div className="pt-6 border-t border-border/40 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Information last updated: {formatDate(shipmentDetails.updated_at)}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Live Data
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Order Information */}
            <Card className="border border-border/60 shadow-sm animate-fade-in">
              <CardHeader className="border-b border-border/40 bg-gradient-to-r from-muted/30 to-muted/10">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-primary/15 rounded-lg">
                    <Receipt className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-foreground">Order Details</span>
                    <p className="text-sm font-normal text-muted-foreground mt-1">
                      Your order summary and current status
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 hover-scale">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-full shadow-sm">
                          <Receipt className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Order Number
                          </Label>
                          <p className="text-2xl font-bold font-mono text-foreground mt-2 tracking-wide">
                            {searchedOrder.order_number}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Reference this number for any inquiries
                          </p>
                        </div>
                      </div>
                    </div>

                    {searchedOrder.customer_name && (
                      <div className="p-6 bg-muted/30 rounded-xl border border-border/40 hover-scale">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-white rounded-full shadow-sm">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                              Customer
                            </Label>
                            <p className="text-xl font-semibold text-foreground mt-2 capitalize">
                              {searchedOrder.customer_name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Order placed by this customer
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-success/5 to-success/10 rounded-xl border border-success/20 hover-scale">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-full shadow-sm">
                          {getStatusIcon(searchedOrder.status)}
                        </div>
                        <div className="flex-1">
                          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Current Status
                          </Label>
                          <div className="mt-3">
                            <Badge className={`${getStatusColor(searchedOrder.status)} px-4 py-2 text-sm font-bold`}>
                              {searchedOrder.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-3">
                            {searchedOrder.status === 'shipped' 
                              ? 'Your order is on its way'
                              : searchedOrder.status === 'delivered'
                              ? 'Successfully delivered'
                              : searchedOrder.status === 'pending'
                              ? 'Being processed by our team'
                              : 'Order confirmed and ready'
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-muted/30 rounded-xl border border-border/40 hover-scale">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-full shadow-sm">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Order Placed
                          </Label>
                          <p className="text-xl font-semibold text-foreground mt-2">
                            {formatDate(searchedOrder.created_at)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Thank you for choosing us
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary Footer */}
                <div className="mt-8 pt-6 border-t border-border/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
                      <span>Order tracking is live and updated in real-time</span>
                    </div>
                    <Badge variant="outline" className="text-xs font-medium">
                      Order #{searchedOrder.order_number.split('-').pop()}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* No Shipping Details Found */}
            {!shipmentDetails && (
              <Card>
                <CardContent className="text-center py-8">
                  <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Shipping Details Available</h3>
                  <p className="text-muted-foreground">
                    This order doesn't have shipping details yet. Shipping information will be available once your order has been processed and shipped.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Searched Order Result (Legacy) */}
        {searchedOrder && !shipmentDetails && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Order Tracking</h2>
            <OrderTrackingCard
              orderId={searchedOrder.id}
              orderNumber={searchedOrder.order_number}
              orderStatus={searchedOrder.status}
              totalAmount={searchedOrder.total_amount}
              createdAt={searchedOrder.created_at}
            />
          </div>
        )}

        {/* No Results Message */}
        {orderNumber && searchedOrder === null && !searching && (
          <Card>
            <CardContent className="text-center py-8">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Order Not Found</h3>
              <p className="text-muted-foreground">
                No order found with number "{orderNumber}". Please check the order number and try again.
              </p>
            </CardContent>
          </Card>
        )}

        {/* User Orders (if logged in) */}
        {user && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Recent Orders</h2>
            
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                        <div className="h-3 bg-muted rounded w-1/3"></div>
                        <div className="h-20 bg-muted rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : userOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Orders Found</h3>
                  <p className="text-muted-foreground">
                    You haven't placed any orders yet. Start shopping to see your orders here.
                  </p>
                  <Button className="mt-4" onClick={() => window.location.href = '/shop'}>
                    Start Shopping
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {userOrders.map((order) => (
                  <OrderTrackingCard
                    key={order.id}
                    orderId={order.id}
                    orderNumber={order.order_number}
                    orderStatus={order.status}
                    totalAmount={order.total_amount}
                    createdAt={order.created_at}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Guest User Message */}
        {!user && (
          <Card>
            <CardContent className="text-center py-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Sign in for Better Tracking</h3>
                  <p className="text-muted-foreground">
                    Sign in to your account to view all your orders and get detailed tracking information.
                  </p>
                </div>
                <Button onClick={() => window.location.href = '/auth'}>
                  Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;