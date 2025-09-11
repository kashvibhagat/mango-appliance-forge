import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import OrderTrackingCard from '@/components/ui/OrderTrackingCard';
import { Search, Package } from 'lucide-react';

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
  user_id: string;
}

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const { user } = useAuth();

  // Mock tracking data
  const mockTrackingData = {
    orderId: 'MNG123456789',
    status: 'in-transit',
    estimatedDelivery: 'Mar 15, 2024',
    currentLocation: 'Mumbai Distribution Center',
    timeline: [
      {
        id: 1,
        title: 'Order Placed',
        description: 'Your order has been confirmed',
        timestamp: 'Mar 10, 2024 - 2:30 PM',
        completed: true,
        icon: CheckCircle
      },
      {
        id: 2,
        title: 'Order Processed',
        description: 'Your items have been packed',
        timestamp: 'Mar 11, 2024 - 10:15 AM',
        completed: true,
        icon: Package
      },
      {
        id: 3,
        title: 'Shipped',
        description: 'Package handed over to courier',
        timestamp: 'Mar 12, 2024 - 4:20 PM',
        completed: true,
        icon: Truck
      },
      {
        id: 4,
        title: 'In Transit',
        description: 'Package is on the way to your location',
        timestamp: 'Mar 13, 2024 - 11:45 AM',
        completed: true,
        icon: MapPin,
        current: true
      },
      {
        id: 5,
        title: 'Out for Delivery',
        description: 'Package will be delivered today',
        timestamp: 'Expected: Mar 15, 2024',
        completed: false,
        icon: Truck
      },
      {
        id: 6,
        title: 'Delivered',
        description: 'Package delivered successfully',
        timestamp: 'Pending',
        completed: false,
        icon: CheckCircle
      }
    ],
    items: [
      {
        id: '1',
        name: 'Mango 55L Desert Air Cooler',
        image: '/src/assets/product-tower-cooler.jpg',
        quantity: 1,
        price: 8999
      }
    ],
    deliveryAddress: {
      name: 'Rajesh Kumar',
      address: '123, MG Road, Bangalore, Karnataka - 560001'
    }
  };

  const handleTrackOrder = () => {
    if (!orderId.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingData(mockTrackingData);
      setIsSearching(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-ok text-ok-foreground';
      case 'in-transit':
        return 'bg-accent text-accent-foreground';
      case 'processing':
        return 'bg-warn text-warn-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'in-transit':
        return 'In Transit';
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Track Your Order</h1>
          <p className="text-muted-foreground">
            Enter your order ID to get real-time updates on your package
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="orderId">Order ID</Label>
                <Input
                  id="orderId"
                  placeholder="Enter your order ID (e.g., MNG123456789)"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleTrackOrder}
                  disabled={isSearching || !orderId.trim()}
                  className="btn-hero"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {isSearching ? 'Tracking...' : 'Track Order'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-8">
            {/* Order Status Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order #{trackingData.orderId}
                  </CardTitle>
                  <Badge className={getStatusColor(trackingData.status)}>
                    {getStatusText(trackingData.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Location</p>
                    <p className="font-semibold">{trackingData.currentLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                    <p className="font-semibold text-accent">{trackingData.estimatedDelivery}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Delivery Address</p>
                    <p className="font-semibold">{trackingData.deliveryAddress.name}</p>
                    <p className="text-sm text-muted-foreground">{trackingData.deliveryAddress.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Tracking Timeline */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Tracking Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {trackingData.timeline.map((event: any, index: number) => {
                        const IconComponent = event.icon;
                        return (
                          <div key={event.id} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                event.completed 
                                  ? event.current 
                                    ? 'bg-accent text-accent-foreground' 
                                    : 'bg-ok text-ok-foreground'
                                  : 'bg-muted text-muted-foreground'
                              }`}>
                                <IconComponent className="h-5 w-5" />
                              </div>
                              {index < trackingData.timeline.length - 1 && (
                                <div className={`w-0.5 h-8 mt-2 ${
                                  event.completed ? 'bg-ok' : 'bg-muted'
                                }`} />
                              )}
                            </div>
                            <div className="flex-1 pb-8">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{event.title}</h3>
                                {event.current && (
                                  <Badge variant="secondary" className="text-xs">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Current
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                {event.description}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {event.timestamp}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Items */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trackingData.items.map((item: any) => (
                        <div key={item.id} className="flex gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded bg-muted"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            <p className="text-sm font-semibold">₹{item.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Support Card */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Having issues with your order? Our support team is here to help.
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Chat with Support
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Call: +91 80000 00000
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {!trackingData && orderId && !isSearching && (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Order Not Found</h3>
              <p className="text-muted-foreground mb-4">
                We couldn't find an order with ID "{orderId}". Please check your order ID and try again.
              </p>
              <Button variant="outline" onClick={() => setOrderId('')}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;