import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Search, Truck, Package, MapPin, Calendar, ExternalLink, AlertCircle } from 'lucide-react';

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

interface Order {
  id: string;
  order_number: string;
  status: string;
  customer_name: string | null;
  customer_email: string | null;
  created_at: string;
}

const ShippingDetails = () => {
  const [orderId, setOrderId] = useState('');
  const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetail | null>(null);
  const [orderInfo, setOrderInfo] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const searchValue = orderId.trim();
      
      // Determine if searching by order number or order ID
      const isOrderNumber = searchValue.startsWith('MNG-ORD-');
      
      // First, get the order information
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('id, order_number, status, customer_name, customer_email, created_at')
        .eq(isOrderNumber ? 'order_number' : 'id', searchValue)
        .maybeSingle();

      if (orderError && orderError.code !== 'PGRST116') {
        throw orderError;
      }

      if (!orderData) {
        toast({
          title: "Order not found",
          description: isOrderNumber 
            ? "No order found with the provided order number. Please check the order number and try again."
            : "No order found with the provided ID. Please check the order ID and try again.",
          variant: "destructive"
        });
        setOrderInfo(null);
        setShipmentDetails(null);
        return;
      }

      setOrderInfo(orderData);

      // Then get the shipment details using the actual order ID
      const { data: shipmentData, error: shipmentError } = await supabase
        .from('shipment_details')
        .select('*')
        .eq('order_id', orderData.id)
        .maybeSingle();

      if (shipmentError && shipmentError.code !== 'PGRST116') {
        throw shipmentError;
      }

      setShipmentDetails(shipmentData);

      if (!shipmentData) {
        toast({
          title: "No shipping details found",
          description: "This order doesn't have shipping details yet. Please check back later.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error fetching shipping details:', error);
      toast({
        title: "Search failed",
        description: "There was an error searching for shipping details. Please try again.",
        variant: "destructive"
      });
      setOrderInfo(null);
      setShipmentDetails(null);
    } finally {
      setLoading(false);
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
          <h1 className="text-3xl font-bold">Shipping Details</h1>
          <p className="text-muted-foreground">
            Enter an order ID to view detailed shipping information
          </p>
        </div>

        {/* Order ID Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search by Order ID
            </CardTitle>
            <CardDescription>
              Enter the complete order ID to view shipping details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <Label htmlFor="orderId">Order ID</Label>
                <Input
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter order number (e.g., MNG-ORD-182333) or order ID"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter either the order number (MNG-ORD-XXXXXX) or the complete order ID.
                </p>
              </div>
              
              <Button type="submit" disabled={loading || !orderId.trim()} className="w-full">
                {loading ? 'Searching...' : 'Get Shipping Details'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Order Information */}
        {searched && orderInfo && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Order Number</Label>
                  <p className="font-mono">{orderInfo.order_number}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Order Status</Label>
                  <Badge className={getStatusColor(orderInfo.status)}>
                    {orderInfo.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                {orderInfo.customer_name && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Customer Name</Label>
                    <p>{orderInfo.customer_name}</p>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Order Date</Label>
                  <p className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(orderInfo.created_at)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Shipping Details */}
        {searched && orderInfo && shipmentDetails && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status and Vendor */}
              <div className="flex flex-wrap items-center gap-4">
                <Badge className={getStatusColor(shipmentDetails.status)}>
                  {getStatusIcon(shipmentDetails.status)}
                  {shipmentDetails.status.replace('_', ' ').toUpperCase()}
                </Badge>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Shipping Vendor</Label>
                  <p className="font-medium">{shipmentDetails.vendor_name}</p>
                </div>
              </div>

              {/* Tracking Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shipmentDetails.tracking_number && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Tracking Number</Label>
                    <p className="font-mono text-sm bg-muted p-2 rounded">
                      {shipmentDetails.tracking_number}
                    </p>
                  </div>
                )}
                {shipmentDetails.pod_number && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">POD Number</Label>
                    <p className="font-mono text-sm bg-muted p-2 rounded">
                      {shipmentDetails.pod_number}
                    </p>
                  </div>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Shipped At</Label>
                  <p className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(shipmentDetails.shipped_at)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Delivered At</Label>
                  <p className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(shipmentDetails.delivered_at)}
                  </p>
                </div>
              </div>

              {/* Tracking Link */}
              {shipmentDetails.tracking_link && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Track Your Package</Label>
                  <div className="mt-2">
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full md:w-auto"
                    >
                      <a 
                        href={shipmentDetails.tracking_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Track on {shipmentDetails.vendor_name} Website
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              {/* Last Updated */}
              <div className="pt-4 border-t">
                <Label className="text-sm font-medium text-muted-foreground">Last Updated</Label>
                <p className="text-sm">{formatDate(shipmentDetails.updated_at)}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Shipping Details Found */}
        {searched && orderInfo && !shipmentDetails && (
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

        {/* No Order Found */}
        {searched && !orderInfo && !loading && (
          <Card>
            <CardContent className="text-center py-8">
              <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Order Not Found</h3>
              <p className="text-muted-foreground">
                No order found with the provided ID. Please check the order ID and try again, or contact support if you need assistance.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ShippingDetails;