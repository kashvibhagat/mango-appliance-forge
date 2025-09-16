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

    setSearching(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNumber.trim())
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setSearchedOrder(data);
    } catch (error) {
      console.error('Error searching order:', error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Track Your Order</h1>
          <p className="text-muted-foreground">
            Enter your order number or view your recent orders below
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
              Enter your order number to track any order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="orderNumber" className="sr-only">Order Number</Label>
                <Input
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter order number (e.g., MNG-ORD-ABLAUOURL)"
                  className="w-full"
                />
              </div>
              <Button type="submit" disabled={searching || !orderNumber.trim()}>
                {searching ? 'Searching...' : 'Track Order'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Searched Order Result */}
        {searchedOrder && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Search Results</h2>
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