import { useState, useEffect } from 'react';
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
  Package2
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
  shipping_cost?: number;
  is_free_shipping?: boolean;
  profiles?: {
    first_name: string;
    last_name: string;
    phone: string;
  };
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
  tracking_link?: string;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
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

      // Fetch profiles for orders separately
      const userIds = ordersData.data?.map(order => order.user_id) || [];
      const profilesData = userIds.length > 0 
        ? await supabase.from('profiles').select('user_id, first_name, last_name, phone').in('user_id', userIds)
        : { data: [], error: null };

      // Map profiles to orders
      const ordersWithProfiles = ordersData.data?.map(order => ({
        ...order,
        profiles: profilesData.data?.find(profile => profile.user_id === order.user_id) || null
      })) || [];

      setNotifications(notificationsData.data || []);
      setOrders(ordersWithProfiles as any);
      setWarranties(warrantiesData.data || []);
      setShipments(shipmentsData.data || []);
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
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        setOrders(prev => [payload.new as Order, ...prev]);
        // Create notification for new order
        createNotification('new_order', 'New Order Received', `Order ${payload.new.order_number} placed`);
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

    try {
      // Create shipment record
      const { error: shipmentError } = await supabase
        .from('shipment_details')
        .insert({
          order_id: shipmentForm.orderId,
          vendor_name: shipmentForm.vendorName,
          tracking_number: shipmentForm.trackingNumber,
          tracking_link: shipmentForm.trackingLink,
          status: 'in_transit',
          shipped_at: new Date().toISOString()
        });

      if (shipmentError) throw shipmentError;

      // Update order status to shipped
      const { error: orderError } = await supabase
        .from('orders')
        .update({ status: 'shipped' })
        .eq('id', shipmentForm.orderId);

      if (orderError) throw orderError;

      toast({
        title: 'Success',
        description: 'Shipment created and order status updated successfully'
      });
      
      setShipmentForm({
        orderId: '',
        vendorName: '',
        trackingNumber: '',
        trackingLink: '',
        status: 'in_transit'
      });
      
      fetchDashboardData();

    } catch (error: any) {
      toast({
        title: 'Error',
        description: `Failed to create shipment: ${error.message}`,
        variant: 'destructive'
      });
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage orders, warranties, and shipments</p>
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
                {notifications.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No notifications found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Manage customer orders and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Package2 className="h-4 w-4 text-muted-foreground" />
                          <h4 className="font-medium">Order #{order.order_number}</h4>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>
                              {order.profiles ? 
                                `${order.profiles.first_name} ${order.profiles.last_name}` : 
                                'Customer'
                              }
                              {order.profiles?.phone && (
                                <span className="ml-1 text-xs">• {order.profiles.phone}</span>
                              )}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            <span>
                              {Array.isArray(order.items) ? 
                                `${order.items.length} items` : 
                                'Items ordered'
                              }
                            </span>
                          </div>
                        </div>

                        {/* Complete Shipping Address */}
                        {order.shipping_address && (
                          <div className="bg-muted/30 p-3 rounded text-sm mb-3">
                            <div className="flex items-start gap-1 mb-1">
                              <MapPin className="h-3 w-3 mt-0.5 text-muted-foreground" />
                              <div className="flex-1">
                                <strong>Delivery Address:</strong>
                              </div>
                            </div>
                            <div className="ml-4 space-y-1">
                              <div className="font-medium text-foreground">
                                {order.shipping_address.name}
                                {order.shipping_address.phone && (
                                  <span className="ml-2 text-muted-foreground font-normal">• {order.shipping_address.phone}</span>
                                )}
                              </div>
                              <div className="text-muted-foreground leading-relaxed">
                                {order.shipping_address.address}
                              </div>
                              <div className="text-muted-foreground">
                                <strong className="text-foreground">
                                  {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}
                                </strong>
                              </div>
                              {order.shipping_address.email && (
                                <div className="text-xs text-muted-foreground">
                                  Email: {order.shipping_address.email}
                                </div>
                              )}
                              {order.shipping_address.gst_details && (
                                <div className="text-xs text-muted-foreground">
                                  GST: {order.shipping_address.gst_details.gst_number} ({order.shipping_address.gst_details.company_name})
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>
                              Ordered: {new Date(order.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Truck className="h-3 w-3" />
                            <span>
                              {order.is_free_shipping ? 'FREE SHIPPING' : `Shipping: ₹${order.shipping_cost || 0}`}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="font-bold text-green-600">₹{order.total_amount}</span>
                            {order.is_free_shipping && (
                              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                FREE SHIPPING
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Order Details - #{order.order_number}</DialogTitle>
                                </DialogHeader>
                                
                                <div className="space-y-6">
                                  {/* Order Status & Actions */}
                                  <div className="bg-muted/30 p-4 rounded-lg">
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                      <Settings className="h-4 w-4" />
                                      Order Management
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                      <div>
                                        <Label>Current Status</Label>
                                        <div className="mt-1">
                                          <Badge className={getStatusColor(order.status)}>
                                            {order.status.toUpperCase()}
                                          </Badge>
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Order Date</Label>
                                        <div className="mt-1 text-sm">
                                          {new Date(order.created_at).toLocaleString()}
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Order ID</Label>
                                        <div className="mt-1 font-mono text-sm text-muted-foreground">
                                          {order.id}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Customer Information */}
                                  <div>
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                      <User className="h-4 w-4" />
                                      Customer Information
                                    </h3>
                                    <div className="bg-muted/50 p-3 rounded-lg">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <p><strong>Name:</strong> {order.profiles ? `${order.profiles.first_name} ${order.profiles.last_name}` : 'N/A'}</p>
                                          <p><strong>Phone:</strong> {order.profiles?.phone || 'N/A'}</p>
                                        </div>
                                        <div>
                                          <p><strong>User ID:</strong> {order.user_id}</p>
                                          <p><strong>Customer Type:</strong> {order.user_id ? 'Registered' : 'Guest'}</p>
                                        </div>
                                      </div>
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
                                          <div className="space-y-1">
                                            <p><strong>{order.shipping_address.first_name} {order.shipping_address.last_name}</strong></p>
                                            <p>{order.shipping_address.address_line_1}</p>
                                            {order.shipping_address.address_line_2 && <p>{order.shipping_address.address_line_2}</p>}
                                            <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}</p>
                                            <p>{order.shipping_address.country}</p>
                                            <p><strong>Phone:</strong> {order.shipping_address.phone}</p>
                                            {order.shipping_address.gst_details && (
                                              <div className="mt-2 pt-2 border-t">
                                                <p><strong>GST Details:</strong></p>
                                                <p>Company: {order.shipping_address.gst_details.company_name}</p>
                                                <p>GST Number: {order.shipping_address.gst_details.gst_number}</p>
                                              </div>
                                            )}
                                          </div>
                                        ) : (
                                          <p>{JSON.stringify(order.shipping_address)}</p>
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  {/* Order Items */}
                                  <div>
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                      <Package className="h-4 w-4" />
                                      Order Items
                                    </h3>
                                    <div className="bg-muted/50 p-3 rounded-lg">
                                      {Array.isArray(order.items) ? (
                                        <div className="space-y-3">
                                          {order.items.map((item: any, index: number) => (
                                            <div key={index} className="flex justify-between items-center p-3 bg-background rounded border">
                                              <div className="flex-1">
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                  Product ID: {item.product_id}
                                                </p>
                                              </div>
                                              <div className="text-right">
                                                <p className="font-medium">₹{item.price} × {item.quantity}</p>
                                                <p className="text-sm font-bold">₹{item.total}</p>
                                              </div>
                                            </div>
                                          ))}
                                          
                                          <div className="border-t pt-3 mt-3">
                                            <div className="flex justify-between items-center text-sm">
                                              <span>Shipping Cost:</span>
                                              <span>₹{order.shipping_cost || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center font-bold text-lg mt-2">
                                              <span>Total Amount:</span>
                                              <span className="text-green-600">₹{order.total_amount}</span>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <p>Order items information not available</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {orders.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No orders found</p>
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
              <CardDescription>Manage customer warranty requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {warranties.map((warranty) => (
                  <div key={warranty.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <h4 className="font-medium">Serial: {warranty.serial_number}</h4>
                          <Badge className={getStatusColor(warranty.status)}>
                            {warranty.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <strong>Customer:</strong> {warranty.customer_name}
                          </div>
                          <div>
                            <strong>Product:</strong> {warranty.product_model}
                          </div>
                          <div>
                            <strong>Mobile:</strong> {warranty.customer_mobile}
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          Registered: {new Date(warranty.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Warranty Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Status Update</Label>
                                <div className="flex gap-2 mt-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                                    onClick={() => updateWarrantyStatus(warranty.id, 'approved')}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                                    onClick={() => updateWarrantyStatus(warranty.id, 'rejected')}
                                  >
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
                {warranties.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No warranty registrations found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipments">
          <Card>
            <CardHeader>
              <CardTitle>Shipment Management</CardTitle>
              <CardDescription>Create and manage shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Create Shipment Form */}
                <div className="border p-4 rounded-lg">
                  <h3 className="font-semibold mb-4">Create New Shipment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="orderId">Order ID</Label>
                      <Select
                        value={shipmentForm.orderId}
                        onValueChange={(value) => setShipmentForm(prev => ({ ...prev, orderId: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select order" />
                        </SelectTrigger>
                        <SelectContent>
                          {orders.filter(o => o.status === 'pending' || o.status === 'confirmed').map((order) => (
                            <SelectItem key={order.id} value={order.id}>
                              {order.order_number} - ₹{order.total_amount} ({order.profiles?.first_name} {order.profiles?.last_name})
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
                        placeholder="e.g., Blue Dart, DTDC"
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
                      <Label htmlFor="trackingLink">Tracking Link (Optional)</Label>
                      <Input
                        id="trackingLink"
                        value={shipmentForm.trackingLink}
                        onChange={(e) => setShipmentForm(prev => ({ ...prev, trackingLink: e.target.value }))}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <Button onClick={createShipment} className="mt-4">
                    Create Shipment
                  </Button>
                </div>

                {/* Active Shipments */}
                <div>
                  <h3 className="font-semibold mb-4">Active Shipments</h3>
                  <div className="space-y-3">
                    {shipments.map((shipment) => (
                      <div key={shipment.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Truck className="h-4 w-4 text-muted-foreground" />
                              <h4 className="font-medium">Tracking: {shipment.tracking_number}</h4>
                              <Badge className={getStatusColor(shipment.status)}>
                                {shipment.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                              <div>
                                <strong>Vendor:</strong> {shipment.vendor_name}
                                <br />
                                <strong>Order:</strong> {orders.find(o => o.id === shipment.order_id)?.order_number || shipment.order_id}
                              </div>
                              <div>
                                <strong>Created:</strong> {new Date(shipment.created_at).toLocaleDateString()}
                                {shipment.tracking_link && (
                                  <div className="mt-1">
                                    <a 
                                      href={shipment.tracking_link} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline text-xs"
                                    >
                                      Track Package →
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {shipments.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No shipments found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;