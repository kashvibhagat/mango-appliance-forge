import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { 
  Bell, 
  Package, 
  Shield, 
  Truck, 
  MessageSquare, 
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
  Eye,
  Edit,
  User,
  MapPin,
  Package2,
  LogOut,
  Mail
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  data: any;
  is_read: boolean;
  priority: string;
  created_at: string;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
  user_id: string;
  items: any;
  shipping_address: any;
  profiles?: {
    first_name: string;
    last_name: string;
    phone: string;
  };
}

interface Customer {
  user_id: string;
  email: string;
  total_orders: number;
  first_order_date: string;
  first_name?: string;
  last_name?: string;
}

interface WarrantyRegistration {
  id: string;
  serial_number: string;
  product_model: string;
  customer_name: string;
  customer_mobile: string;
  status: string;
  created_at: string;
}

interface ShipmentDetail {
  id: string;
  order_id: string;
  vendor_name: string;
  tracking_number: string;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [warranties, setWarranties] = useState<WarrantyRegistration[]>([]);
  const [shipments, setShipments] = useState<ShipmentDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedWarranty, setSelectedWarranty] = useState<WarrantyRegistration | null>(null);
  const [shipmentForm, setShipmentForm] = useState({
    orderId: '',
    vendorName: '',
    trackingNumber: '',
    trackingLink: '',
    status: 'shipped'
  });

  useEffect(() => {
    fetchDashboardData();
    setupRealtimeSubscriptions();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [notificationsData, ordersData, warrantiesData, shipmentsData] = await Promise.all([
        supabase.from('notifications').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(50),
        supabase.from('warranty_registrations').select('*').order('created_at', { ascending: false }),
        supabase.from('shipment_details').select('*').order('created_at', { ascending: false })
      ]);

      setNotifications(notificationsData.data || []);
      setOrders((ordersData.data as any) || []);
      setWarranties(warrantiesData.data || []);
      setShipments(shipmentsData.data || []);

      // Get customer data by fetching user profiles for each order
      if (ordersData.data && ordersData.data.length > 0) {
        const userIds = [...new Set(ordersData.data.map((order: any) => order.user_id))];
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('user_id, first_name, last_name, phone')
          .in('user_id', userIds);
        
        // Create customer map with profile data
        const customerMap = new Map();
        ordersData.data.forEach((order: any) => {
          const profile = profilesData?.find(p => p.user_id === order.user_id);
          const userId = order.user_id;
          if (!customerMap.has(userId)) {
            customerMap.set(userId, {
              user_id: userId,
              email: profile ? `customer_${profile.first_name}@example.com` : 'customer@example.com',
              total_orders: 1,
              created_at: order.created_at,
              first_name: profile?.first_name || 'Customer',
              last_name: profile?.last_name || ''
            });
          } else {
            const existing = customerMap.get(userId);
            existing.total_orders += 1;
          }
        });
        setCustomers(Array.from(customerMap.values()));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    // Subscribe to new orders
    const ordersChannel = supabase
      .channel('admin-orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, async (payload) => {
        const newOrder = payload.new as Order;
        setOrders(prev => [newOrder, ...prev]);
        
        // Create notification for new order
        createNotification('new_order', 'New Order Received', `Order ${newOrder.order_number} placed`);
        
        // Send email notification
        try {
          await supabase.functions.invoke('send-order-notification', {
            body: { order: newOrder }
          });
        } catch (error) {
          console.error('Error sending email notification:', error);
        }
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (payload) => {
        setOrders(prev => 
          prev.map(order => 
            order.id === payload.new.id ? { ...order, ...payload.new } : order
          )
        );
      })
      .subscribe();

    // Subscribe to warranty registrations
    const warrantyChannel = supabase
      .channel('admin-warranties')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'warranty_registrations' }, (payload) => {
        setWarranties(prev => [payload.new as WarrantyRegistration, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(ordersChannel);
      supabase.removeChannel(warrantyChannel);
    };
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update order status',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Success',
        description: 'Order status updated successfully'
      });
      fetchDashboardData();
    }
  };

  const getCustomerType = (userId: string) => {
    const customer = customers.find(c => c.user_id === userId);
    if (!customer) return 'New';
    return customer.total_orders > 1 ? 'Returning' : 'New';
  };

  const getCustomerEmail = (userId: string) => {
    const customer = customers.find(c => c.user_id === userId);
    return customer?.email || 'customer@example.com';
  };

  const getCustomerName = (userId: string) => {
    const customer = customers.find(c => c.user_id === userId);
    return customer ? `${customer.first_name} ${customer.last_name}` : 'Customer';
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminLoginTime');
    navigate('/admin/login');
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully'
    });
  };

  const createNotification = async (type: string, title: string, message: string, data?: any) => {
    const { error } = await supabase
      .from('notifications')
      .insert({
        type,
        title,
        message,
        data,
        priority: 'normal'
      });

    if (!error) {
      fetchDashboardData();
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);
    
    fetchDashboardData();
  };

  const updateWarrantyStatus = async (warrantyId: string, status: string, adminNotes?: string) => {
    const { error } = await supabase
      .from('warranty_registrations')
      .update({ 
        status,
        admin_approved: status === 'approved',
        admin_notes: adminNotes 
      })
      .eq('id', warrantyId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update warranty status',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Success',
        description: 'Warranty status updated successfully'
      });
      fetchDashboardData();
      setSelectedWarranty(null);
    }
  };

  const createShipment = async () => {
    if (!shipmentForm.orderId || !shipmentForm.vendorName || !shipmentForm.trackingNumber) {
      toast({
        title: 'Error',
        description: 'Please fill all required fields',
        variant: 'destructive'
      });
      return;
    }

    const { error } = await supabase
      .from('shipment_details')
      .insert({
        order_id: shipmentForm.orderId,
        vendor_name: shipmentForm.vendorName,
        tracking_number: shipmentForm.trackingNumber,
        tracking_link: shipmentForm.trackingLink,
        status: shipmentForm.status,
        shipped_at: new Date().toISOString()
      });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to create shipment',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Success',
        description: 'Shipment created successfully'
      });
      setShipmentForm({
        orderId: '',
        vendorName: '',
        trackingNumber: '',
        trackingLink: '',
        status: 'shipped'
      });
      fetchDashboardData();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': case 'delivered': return 'bg-green-100 text-green-800';
      case 'rejected': case 'failed': return 'bg-red-100 text-red-800';
      case 'shipped': case 'in_transit': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'high': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default: return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Real-time order management and monitoring</p>
        </div>
        <Button onClick={handleLogout} variant="outline" size="sm">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">New Orders</p>
                <p className="text-2xl font-bold">{orders.filter(o => o.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Pending Warranties</p>
                <p className="text-2xl font-bold">{warranties.filter(w => w.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Active Shipments</p>
                <p className="text-2xl font-bold">{shipments.filter(s => s.status === 'in_transit').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Unread Notifications</p>
                <p className="text-2xl font-bold">{notifications.filter(n => !n.is_read).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="warranties">Warranties</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Stay updated with system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${
                      notification.is_read ? 'bg-muted/30' : 'bg-background'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getPriorityIcon(notification.priority)}
                        <div className="flex-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(notification.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {!notification.is_read && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Real-Time Orders Dashboard
              </CardTitle>
              <CardDescription>Monitor customer orders in real-time with instant updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Status</th>
                      <th className="text-left p-2 font-medium">Order Date</th>
                      <th className="text-left p-2 font-medium">Order ID</th>
                      <th className="text-left p-2 font-medium">Customer Name</th>
                      <th className="text-left p-2 font-medium">Customer Email</th>
                      <th className="text-left p-2 font-medium">Customer Type</th>
                      <th className="text-left p-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-muted/50">
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                            <Select onValueChange={(value) => updateOrderStatus(order.id, value)}>
                              <SelectTrigger className="w-32 h-8">
                                <SelectValue placeholder="Update" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </td>
                        <td className="p-2 text-sm">
                          {new Date(order.created_at).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td className="p-2 font-mono text-sm">{order.order_number}</td>
                        <td className="p-2 text-sm">{getCustomerName(order.user_id)}</td>
                        <td className="p-2 text-sm">{getCustomerEmail(order.user_id)}</td>
                        <td className="p-2">
                          <Badge variant={getCustomerType(order.user_id) === 'New' ? 'default' : 'secondary'}>
                            {getCustomerType(order.user_id)}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Order Details - {order.order_number}</DialogTitle>
                            </DialogHeader>
                            
                            <div className="space-y-6">
                              {/* Customer Information */}
                              <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                  <User className="h-4 w-4" />
                                  Customer Information
                                </h3>
                                <div className="bg-muted/50 p-3 rounded-lg">
                                  <p><strong>Name:</strong> {order.profiles ? `${order.profiles.first_name} ${order.profiles.last_name}` : 'N/A'}</p>
                                  <p><strong>Phone:</strong> {order.profiles?.phone || 'N/A'}</p>
                                  <p><strong>User ID:</strong> {order.user_id}</p>
                                </div>
                              </div>

                              {/* Shipping Address */}
                              {order.shipping_address && (
                                <div>
                                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    Shipping Address
                                  </h3>
                                  <div className="bg-muted/50 p-3 rounded-lg">
                                    {typeof order.shipping_address === 'object' ? (
                                      <>
                                        <p>{order.shipping_address.first_name} {order.shipping_address.last_name}</p>
                                        <p>{order.shipping_address.address_line_1}</p>
                                        {order.shipping_address.address_line_2 && <p>{order.shipping_address.address_line_2}</p>}
                                        <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}</p>
                                        <p>{order.shipping_address.country}</p>
                                        <p>Phone: {order.shipping_address.phone}</p>
                                      </>
                                    ) : (
                                      <p>{JSON.stringify(order.shipping_address)}</p>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Order Items */}
                              <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                  <Package2 className="h-4 w-4" />
                                  Items Ordered
                                </h3>
                                <div className="space-y-2">
                                  {Array.isArray(order.items) ? order.items.map((item: any, index: number) => (
                                    <div key={index} className="bg-muted/50 p-3 rounded-lg flex justify-between items-center">
                                      <div>
                                        <p className="font-medium">{item.name || item.title || 'Product'}</p>
                                        <p className="text-sm text-muted-foreground">
                                          Qty: {item.quantity} | Model: {item.model || 'N/A'}
                                        </p>
                                        {item.variant && <p className="text-sm text-muted-foreground">Variant: {item.variant}</p>}
                                      </div>
                                      <div className="text-right">
                                        <p className="font-medium">₹{item.price}</p>
                                        <p className="text-sm text-muted-foreground">Total: ₹{item.price * item.quantity}</p>
                                      </div>
                                    </div>
                                  )) : (
                                    <div className="bg-muted/50 p-3 rounded-lg">
                                      <p>Items: {JSON.stringify(order.items)}</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Order Summary */}
                              <div>
                                <h3 className="font-semibold mb-2">Order Summary</h3>
                                <div className="bg-muted/50 p-3 rounded-lg">
                                  <div className="flex justify-between">
                                    <span>Status:</span>
                                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                                  </div>
                                  <div className="flex justify-between mt-2">
                                    <span>Total Amount:</span>
                                    <span className="font-medium">₹{order.total_amount}</span>
                                  </div>
                                  <div className="flex justify-between mt-2">
                                    <span>Order Date:</span>
                                    <span>{new Date(order.created_at).toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {orders.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No orders found. New orders will appear here in real-time.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warranties">
          <Card>
            <CardHeader>
              <CardTitle>Warranty Registrations</CardTitle>
              <CardDescription>Review and approve warranty registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {warranties.map((warranty) => (
                  <div key={warranty.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{warranty.product_model}</h4>
                        <p className="text-sm text-muted-foreground">
                          {warranty.customer_name} • {warranty.serial_number}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(warranty.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(warranty.status)}>
                          {warranty.status}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedWarranty(warranty)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipments">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Shipment</CardTitle>
                <CardDescription>Add shipping details for orders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="orderId">Order</Label>
                  <Select value={shipmentForm.orderId} onValueChange={(value) => setShipmentForm(prev => ({ ...prev, orderId: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select order" />
                    </SelectTrigger>
                    <SelectContent>
                      {orders.filter(o => o.status === 'confirmed').map(order => (
                        <SelectItem key={order.id} value={order.id}>
                          Order {order.order_number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="vendorName">Vendor Name</Label>
                  <Input
                    id="vendorName"
                    value={shipmentForm.vendorName}
                    onChange={(e) => setShipmentForm(prev => ({ ...prev, vendorName: e.target.value }))}
                    placeholder="e.g., Blue Dart, DTDT"
                  />
                </div>
                
                <div>
                  <Label htmlFor="trackingNumber">Tracking Number</Label>
                  <Input
                    id="trackingNumber"
                    value={shipmentForm.trackingNumber}
                    onChange={(e) => setShipmentForm(prev => ({ ...prev, trackingNumber: e.target.value }))}
                    placeholder="Enter tracking number"
                  />
                </div>
                
                <div>
                  <Label htmlFor="trackingLink">Tracking Link</Label>
                  <Input
                    id="trackingLink"
                    value={shipmentForm.trackingLink}
                    onChange={(e) => setShipmentForm(prev => ({ ...prev, trackingLink: e.target.value }))}
                    placeholder="https://tracking.vendor.com/..."
                  />
                </div>
                
                <Button onClick={createShipment} className="w-full">
                  Create Shipment
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Active Shipments</CardTitle>
                <CardDescription>Track ongoing shipments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {shipments.map((shipment) => (
                    <div key={shipment.id} className="p-3 border rounded">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{shipment.vendor_name}</p>
                          <p className="text-sm text-muted-foreground">{shipment.tracking_number}</p>
                        </div>
                        <Badge className={getStatusColor(shipment.status)}>
                          {shipment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Warranty Review Modal */}
      {selectedWarranty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Review Warranty Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p><strong>Product:</strong> {selectedWarranty.product_model}</p>
                <p><strong>Serial:</strong> {selectedWarranty.serial_number}</p>
                <p><strong>Customer:</strong> {selectedWarranty.customer_name}</p>
                <p><strong>Mobile:</strong> {selectedWarranty.customer_mobile}</p>
              </div>
              
              <div>
                <Label htmlFor="adminNotes">Admin Notes</Label>
                <Textarea
                  id="adminNotes"
                  placeholder="Add notes about this registration..."
                  className="mt-1"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedWarranty(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => updateWarrantyStatus(selectedWarranty.id, 'rejected')}
                  className="flex-1"
                >
                  Reject
                </Button>
                <Button
                  onClick={() => updateWarrantyStatus(selectedWarranty.id, 'approved')}
                  className="flex-1"
                >
                  Approve
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;