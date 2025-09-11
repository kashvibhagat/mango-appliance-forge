import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Package, Truck, MapPin, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface ShipmentDetail {
  id: string;
  vendor_name: string;
  pod_number: string;
  tracking_number: string;
  tracking_link: string;
  status: string;
  shipped_at: string;
  delivered_at: string;
  created_at: string;
}

interface OrderTrackingCardProps {
  orderId: string;
  orderNumber: string;
  orderStatus: string;
  totalAmount: number;
  createdAt: string;
}

const OrderTrackingCard = ({ 
  orderId, 
  orderNumber, 
  orderStatus, 
  totalAmount, 
  createdAt 
}: OrderTrackingCardProps) => {
  const [shipment, setShipment] = useState<ShipmentDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShipmentDetails();
  }, [orderId]);

  const fetchShipmentDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('shipment_details')
        .select('*')
        .eq('order_id', orderId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setShipment(data);
    } catch (error) {
      console.error('Error fetching shipment details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-purple-600" />;
      case 'in_transit':
        return <MapPin className="h-4 w-4 text-orange-600" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'in_transit':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const trackingSteps = [
    { status: 'confirmed', label: 'Order Confirmed', description: 'Your order has been confirmed' },
    { status: 'shipped', label: 'Shipped', description: 'Package has been dispatched' },
    { status: 'in_transit', label: 'In Transit', description: 'Package is on the way' },
    { status: 'delivered', label: 'Delivered', description: 'Package has been delivered' }
  ];

  const getCurrentStepIndex = () => {
    if (!shipment) return orderStatus === 'confirmed' ? 0 : -1;
    
    switch (shipment.status) {
      case 'shipped': return 1;
      case 'in_transit': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order {orderNumber}
            </CardTitle>
            <CardDescription>
              Placed on {new Date(createdAt).toLocaleDateString()} • ₹{totalAmount.toLocaleString()}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(shipment?.status || orderStatus)}>
            {getStatusIcon(shipment?.status || orderStatus)}
            <span className="ml-1 capitalize">{shipment?.status || orderStatus}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Tracking Timeline */}
        <div className="space-y-4">
          <h3 className="font-medium">Order Progress</h3>
          <div className="space-y-3">
            {trackingSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step.status} className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-current" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium text-sm ${
                      isCurrent ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                    {step.status === 'shipped' && shipment?.shipped_at && (
                      <p className="text-xs text-muted-foreground">
                        {new Date(shipment.shipped_at).toLocaleDateString()}
                      </p>
                    )}
                    {step.status === 'delivered' && shipment?.delivered_at && (
                      <p className="text-xs text-muted-foreground">
                        {new Date(shipment.delivered_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shipment Details */}
        {shipment && (
          <>
            <Separator />
            <div className="space-y-4">
              <h3 className="font-medium">Shipment Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">Shipping Partner</p>
                    <p className="text-sm text-muted-foreground">{shipment.vendor_name}</p>
                  </div>
                  {shipment.tracking_number && (
                    <div>
                      <p className="text-sm font-medium">Tracking Number</p>
                      <p className="text-sm text-muted-foreground font-mono">{shipment.tracking_number}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {shipment.pod_number && (
                    <div>
                      <p className="text-sm font-medium">POD Number</p>
                      <p className="text-sm text-muted-foreground">{shipment.pod_number}</p>
                    </div>
                  )}
                  {shipment.shipped_at && (
                    <div>
                      <p className="text-sm font-medium">Shipped Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(shipment.shipped_at).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {shipment.tracking_link && (
                <Button variant="outline" className="w-full" asChild>
                  <a 
                    href={shipment.tracking_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Track on {shipment.vendor_name} Website
                  </a>
                </Button>
              )}
            </div>
          </>
        )}

        {/* Loading State */}
        {loading && (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        )}

        {/* No Shipment Info */}
        {!loading && !shipment && orderStatus === 'confirmed' && (
          <div className="text-center py-4 text-muted-foreground">
            <Truck className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Shipment details will be updated once your order is dispatched</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderTrackingCard;