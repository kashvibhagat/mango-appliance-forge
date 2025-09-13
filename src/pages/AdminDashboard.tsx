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
  Package2,
  Users,
  ShoppingCart,
  Download,
  Plus,
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  Mail,
  Phone,
  Calendar,
  BarChart3,
  PieChart,
  FileText,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { AdminStats } from '@/components/admin/AdminStats';
import { AdminCharts } from '@/components/admin/AdminCharts';
import { RecentActivity } from '@/components/admin/RecentActivity';

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

interface Customer {
  id: string;
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_blocked: boolean;
  total_orders: number;
  total_spent: number;
  last_order_date: string;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
  brand: string;
  model: string;
  images: string[];
  specifications: any;
  warranty_period: number;
  is_active: boolean;
  created_at: string;
}

interface Complaint {
  id: string;
  complaint_number: string;
  category: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  product_model: string;
  order_number?: string;
  attachment_url?: string;
  admin_response?: string;
  resolution_notes?: string;
  created_at: string;
  updated_at: string;
}

interface WarrantyRegistration {
  id: string;
  serial_number: string;
  product_model: string;
  customer_name: string;
  customer_mobile: string;
  status: string;
  admin_approved: boolean;
  admin_notes?: string;
  created_at: string;
}

interface ShipmentDetail {
  id: string;
  order_id: string;
  vendor_name: string;
  tracking_number: string;
  tracking_link?: string;
  status: string;
  shipped_at?: string;
  delivered_at?: string;
  created_at: string;
}

interface SystemSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  description: string;
  category: string;
}

const AdminDashboard = () => {
  // State variables
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [warranties, setWarranties] = useState<WarrantyRegistration[]>([]);
  const [shipments, setShipments] = useState<ShipmentDetail[]>([]);
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Dialog states
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [selectedWarranty, setSelectedWarranty] = useState<WarrantyRegistration | null>(null);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  
  // Form states
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    category: '',
    brand: '',
    model: '',
    warranty_period: 12,
    is_active: true
  });
  
  const [complaintResponse, setComplaintResponse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  
  // Shipment form state
  const [shipmentForm, setShipmentForm] = useState({
    orderId: '',
    vendorName: '',
    trackingNumber: '',
    trackingLink: '',
    status: 'in_transit'
  });

  useEffect(() => {
    fetchAllData();
    setupRealtimeSubscriptions();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        notificationsData,
        ordersData,
        customersData,
        productsData,
        complaintsData,
        warrantiesData,
        shipmentsData,
        settingsData
      ] = await Promise.all([
        supabase.from('notifications').select('*').order('created_at', { ascending: false }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        (supabase as any).from('customers').select('*').order('created_at', { ascending: false }),
        (supabase as any).from('products').select('*').order('created_at', { ascending: false }),
        (supabase as any).from('complaints').select('*').order('created_at', { ascending: false }),
        supabase.from('warranty_registrations').select('*').order('created_at', { ascending: false }),
        supabase.from('shipment_details').select('*').order('created_at', { ascending: false }),
        (supabase as any).from('system_settings').select('*')
      ]);

      // Get user profiles for orders
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
      setCustomers(customersData.data || []);
      setProducts(productsData.data || []);
      setComplaints(complaintsData.data || []);
      setWarranties(warrantiesData.data || []);
      setShipments(shipmentsData.data || []);
      setSettings(settingsData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch dashboard data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    // Subscribe to orders
    const ordersChannel = supabase
      .channel('admin-orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        setOrders(prev => [payload.new as Order, ...prev]);
        createNotification('new_order', 'New Order Received', `Order ${payload.new.order_number} placed`);
        // Send admin email notification
        sendAdminNotificationEmail('order', payload.new);
      })
      .subscribe();

    // Subscribe to complaints
    const complaintsChannel = supabase
      .channel('admin-complaints')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'complaints' }, (payload) => {
        setComplaints(prev => [payload.new as Complaint, ...prev]);
        createNotification('new_complaint', 'New Complaint Submitted', `Complaint ${payload.new.complaint_number} received`);
        sendAdminNotificationEmail('complaint', payload.new);
      })
      .subscribe();

    // Subscribe to warranty registrations
    const warrantyChannel = supabase
      .channel('admin-warranties')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'warranty_registrations' }, (payload) => {
        setWarranties(prev => [payload.new as WarrantyRegistration, ...prev]);
        createNotification('new_warranty', 'New Warranty Registration', `Warranty for ${payload.new.product_model} registered`);
        sendAdminNotificationEmail('warranty', payload.new);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(ordersChannel);
      supabase.removeChannel(complaintsChannel);
      supabase.removeChannel(warrantyChannel);
    };
  };

  const sendAdminNotificationEmail = async (type: string, data: any) => {
    try {
      let functionName = '';
      let payload = {};

      switch (type) {
        case 'order':
          functionName = 'send-admin-order-notification';
          payload = { orderId: data.id, orderNumber: data.order_number };
          break;
        case 'complaint':
          functionName = 'send-complaint-confirmation';
          payload = { complaintId: data.id };
          break;
        case 'warranty':
          // You can create a warranty notification function similar to others
          break;
      }

      if (functionName) {
        await supabase.functions.invoke(functionName, { body: payload });
      }
    } catch (error) {
      console.error('Error sending admin notification email:', error);
    }
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
      fetchAllData();
    }
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
      fetchAllData();
    }
  };

  const updateComplaintStatus = async (complaintId: string, status: string, adminResponse?: string) => {
    const { error } = await (supabase as any)
      .from('complaints')
      .update({ 
        status, 
        admin_response: adminResponse,
        updated_at: new Date().toISOString()
      })
      .eq('id', complaintId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update complaint status',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Success',
        description: 'Complaint updated successfully'
      });
      setSelectedComplaint(null);
      setComplaintResponse('');
      fetchAllData();
    }
  };

  const saveProduct = async () => {
    try {
      if (isEditingProduct && selectedProduct) {
        const { error } = await (supabase as any)
          .from('products')
          .update(productForm)
          .eq('id', selectedProduct.id);
        
        if (error) throw error;
        toast({ title: 'Success', description: 'Product updated successfully' });
      } else {
        const { error } = await (supabase as any)
          .from('products')
          .insert(productForm);
        
        if (error) throw error;
        toast({ title: 'Success', description: 'Product created successfully' });
      }
      
      setSelectedProduct(null);
      setIsEditingProduct(false);
      setProductForm({
        name: '',
        description: '',
        price: 0,
        stock_quantity: 0,
        category: '',
        brand: '',
        model: '',
        warranty_period: 12,
        is_active: true
      });
      fetchAllData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: `Failed to save product: ${error.message}`,
        variant: 'destructive'
      });
    }
  };

  const blockCustomer = async (customerId: string, block: boolean) => {
    const { error } = await (supabase as any)
      .from('customers')
      .update({ is_blocked: block })
      .eq('id', customerId);

    if (error) {
      toast({
        title: 'Error',
        description: `Failed to ${block ? 'block' : 'unblock'} customer`,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Success',
        description: `Customer ${block ? 'blocked' : 'unblocked'} successfully`
      });
      fetchAllData();
    }
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
      fetchAllData();
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
      
      fetchAllData();

    } catch (error: any) {
      toast({
        title: 'Error',
        description: `Failed to create shipment: ${error.message}`,
        variant: 'destructive'
      });
    }
  };

  const exportData = async (type: string) => {
    try {
      let data: any[] = [];
      let filename = '';
      
      switch (type) {
        case 'orders':
          data = orders;
          filename = 'orders_export.csv';
          break;
        case 'customers':
          data = customers;
          filename = 'customers_export.csv';
          break;
        case 'products':
          data = products;
          filename = 'products_export.csv';
          break;
        case 'complaints':
          data = complaints;
          filename = 'complaints_export.csv';
          break;
      }

      if (data.length === 0) {
        toast({
          title: 'No Data',
          description: 'No data available to export',
          variant: 'destructive'
        });
        return;
      }

      // Convert to CSV
      const headers = Object.keys(data[0]).join(',');
      const csvData = data.map(row => 
        Object.values(row).map(val => 
          typeof val === 'object' ? JSON.stringify(val) : val
        ).join(',')
      ).join('\n');
      
      const csv = `${headers}\n${csvData}`;
      
      // Download
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: 'Success',
        description: 'Data exported successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to export data',
        variant: 'destructive'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'approved': 
      case 'delivered': 
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected': 
      case 'failed': 
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'shipped': 
      case 'in_transit': 
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.profiles && `${order.profiles.first_name} ${order.profiles.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = orderStatusFilter === 'all' || order.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

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
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive management system for Mango Appliances</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="warranties">Warranties</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Dashboard Overview */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Import and use AdminStats component */}
          <AdminStats 
            orders={orders}
            customers={customers}
            complaints={complaints}
            warranties={warranties}
            shipments={shipments}
          />

          {/* Import and use AdminCharts component */}
          <AdminCharts 
            orders={orders}
            customers={customers}
            complaints={complaints}
            warranties={warranties}
          />

          {/* Import and use RecentActivity component */}
          <RecentActivity 
            orders={orders}
            complaints={complaints}
            warranties={warranties}
            customers={customers}
            onViewOrder={setSelectedOrder}
            onViewComplaint={setSelectedComplaint}
          />
        </TabsContent>

        {/* Orders Management */}
        <TabsContent value="orders" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Select value={orderStatusFilter} onValueChange={setOrderStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => exportData('orders')} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Orders
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.order_number}</TableCell>
                      <TableCell>
                        {order.profiles ? `${order.profiles.first_name} ${order.profiles.last_name}` : 'Customer'}
                      </TableCell>
                      <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>₹{order.total_amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'processing')}>
                              <Edit className="h-4 w-4 mr-2" />
                              Mark Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'shipped')}>
                              <Truck className="h-4 w-4 mr-2" />
                              Mark Shipped
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'delivered')}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark Delivered
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Customer Management</h2>
            <Button onClick={() => exportData('customers')} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Customers
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.first_name} {customer.last_name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.total_orders}</TableCell>
                      <TableCell>₹{customer.total_spent.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={customer.is_blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                          {customer.is_blocked ? 'Blocked' : 'Active'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setSelectedCustomer(customer)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => blockCustomer(customer.id, !customer.is_blocked)}>
                              {customer.is_blocked ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Unblock Customer
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Block Customer
                                </>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Product Management</h2>
            <div className="flex gap-2">
              <Button onClick={() => exportData('products')} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Products
              </Button>
              <Button onClick={() => {
                setSelectedProduct(null);
                setIsEditingProduct(false);
                setProductForm({
                  name: '',
                  description: '',
                  price: 0,
                  stock_quantity: 0,
                  category: '',
                  brand: '',
                  model: '',
                  warranty_period: 12,
                  is_active: true
                });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.brand} - {product.model}</p>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>₹{product.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={product.stock_quantity > 10 ? 'bg-green-100 text-green-800' : 
                                        product.stock_quantity > 0 ? 'bg-yellow-100 text-yellow-800' : 
                                        'bg-red-100 text-red-800'}>
                          {product.stock_quantity} units
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={product.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {product.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => {
                              setSelectedProduct(product);
                              setIsEditingProduct(true);
                              setProductForm(product);
                            }}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Product
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              // Toggle active status
                              (supabase as any).from('products').update({ is_active: !product.is_active }).eq('id', product.id);
                              fetchAllData();
                            }}>
                              {product.is_active ? (
                                <>
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Complaints Tab */}
        <TabsContent value="complaints" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Complaint Management</h2>
            <Button onClick={() => exportData('complaints')} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Complaints
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Complaint #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complaints.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell className="font-medium">#{complaint.complaint_number}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{complaint.customer_name}</p>
                          <p className="text-sm text-muted-foreground">{complaint.customer_email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{complaint.subject}</TableCell>
                      <TableCell>
                        <Badge className={
                          complaint.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                          complaint.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }>
                          {complaint.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(complaint.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedComplaint(complaint)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View & Respond
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Warranties Management */}
        <TabsContent value="warranties" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Warranty Management</h2>
            <div className="flex gap-2">
              <Button onClick={() => exportData('warranties')} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Warranties
              </Button>
              <Button onClick={() => {
                // Add new warranty functionality
                toast({
                  title: 'Feature',
                  description: 'Add warranty functionality can be implemented'
                });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Warranty
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Serial Number</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {warranties.slice(0, 10).map((warranty) => (
                    <TableRow key={warranty.id}>
                      <TableCell className="font-medium">{warranty.serial_number}</TableCell>
                      <TableCell>{warranty.product_model}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{warranty.customer_name}</p>
                          <p className="text-sm text-muted-foreground">{warranty.customer_mobile}</p>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(warranty.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(warranty.status)}>
                          {warranty.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => updateWarrantyStatus(warranty.id, 'approved')}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateWarrantyStatus(warranty.id, 'rejected')}>
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedWarranty(warranty)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipments Management */}
        <TabsContent value="shipments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Shipment Management</h2>
            <Button onClick={() => exportData('shipments')} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Shipments
            </Button>
          </div>

          {/* Create Shipment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Shipment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label>Order ID</Label>
                  <Select value={shipmentForm.orderId} onValueChange={(value) => setShipmentForm(prev => ({...prev, orderId: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select order" />
                    </SelectTrigger>
                    <SelectContent>
                      {orders.filter(o => o.status === 'processing').map(order => (
                        <SelectItem key={order.id} value={order.id}>
                          #{order.order_number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Vendor Name</Label>
                  <Input
                    value={shipmentForm.vendorName}
                    onChange={(e) => setShipmentForm(prev => ({...prev, vendorName: e.target.value}))}
                    placeholder="Enter vendor name"
                  />
                </div>
                <div>
                  <Label>Tracking Number</Label>
                  <Input
                    value={shipmentForm.trackingNumber}
                    onChange={(e) => setShipmentForm(prev => ({...prev, trackingNumber: e.target.value}))}
                    placeholder="Enter tracking number"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={createShipment} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Shipment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipments List */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking #</TableHead>
                    <TableHead>Order #</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Shipped Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.tracking_number}</TableCell>
                      <TableCell>
                        {orders.find(o => o.id === shipment.order_id)?.order_number || 'N/A'}
                      </TableCell>
                      <TableCell>{shipment.vendor_name}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(shipment.status)}>
                          {shipment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {shipment.shipped_at ? new Date(shipment.shipped_at).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => {
                              // Update shipment status to delivered
                              supabase.from('shipment_details')
                                .update({ status: 'delivered', delivered_at: new Date().toISOString() })
                                .eq('id', shipment.id)
                                .then(() => fetchAllData());
                            }}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark Delivered
                            </DropdownMenuItem>
                            {shipment.tracking_link && (
                              <DropdownMenuItem onClick={() => window.open(shipment.tracking_link, '_blank')}>
                                <Eye className="h-4 w-4 mr-2" />
                                Track Package
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="settings" className="space-y-6">
          <h2 className="text-2xl font-bold">System Settings</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic site configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Site Title</Label>
                  <Input 
                    defaultValue="Mango Appliances" 
                    placeholder="Enter site title"
                  />
                </div>
                <div>
                  <Label>Admin Email</Label>
                  <Input 
                    defaultValue="admin@mango-appliances.com" 
                    placeholder="Enter admin email"
                    type="email"
                  />
                </div>
                <div>
                  <Label>Currency</Label>
                  <Select defaultValue="INR">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tax Rate (%)</Label>
                  <Input 
                    type="number" 
                    defaultValue="18" 
                    placeholder="Enter tax rate"
                  />
                </div>
                <Button className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Update General Settings
                </Button>
              </CardContent>
            </Card>

            {/* Email Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure email notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>SMTP Host</Label>
                  <Input placeholder="smtp.example.com" />
                </div>
                <div>
                  <Label>SMTP Port</Label>
                  <Input type="number" defaultValue="587" />
                </div>
                <div>
                  <Label>SMTP Username</Label>
                  <Input placeholder="your-email@example.com" />
                </div>
                <div>
                  <Label>SMTP Password</Label>
                  <Input type="password" placeholder="Your SMTP password" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="email-notifications" defaultChecked />
                  <Label htmlFor="email-notifications">Enable email notifications</Label>
                </div>
                <Button className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Update Email Settings
                </Button>
              </CardContent>
            </Card>

            {/* Shipping Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Settings</CardTitle>
                <CardDescription>Configure shipping zones and costs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Local Shipping Cost (₹)</Label>
                  <Input type="number" defaultValue="50" />
                </div>
                <div>
                  <Label>National Shipping Cost (₹)</Label>
                  <Input type="number" defaultValue="100" />
                </div>
                <div>
                  <Label>Free Shipping Minimum (₹)</Label>
                  <Input type="number" defaultValue="1000" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="free-shipping" defaultChecked />
                  <Label htmlFor="free-shipping">Enable free shipping</Label>
                </div>
                <Button className="w-full">
                  <Truck className="h-4 w-4 mr-2" />
                  Update Shipping Settings
                </Button>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage security and access control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="two-factor" />
                  <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="login-attempts" defaultChecked />
                  <Label htmlFor="login-attempts">Limit failed login attempts</Label>
                </div>
                <div>
                  <Label>Session Timeout (minutes)</Label>
                  <Input type="number" defaultValue="60" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="activity-logs" defaultChecked />
                  <Label htmlFor="activity-logs">Enable activity logging</Label>
                </div>
                <Button className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Update Security Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current system health and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{customers.length}</div>
                  <div className="text-sm text-muted-foreground">Total Customers</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Order Details - #{selectedOrder.order_number}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Order Status</Label>
                  <Select 
                    defaultValue={selectedOrder.status}
                    onValueChange={(value) => updateOrderStatus(selectedOrder.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
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
                <div>
                  <Label>Total Amount</Label>
                  <p className="text-lg font-bold">₹{selectedOrder.total_amount.toLocaleString()}</p>
                </div>
              </div>
              {/* Add more order details here */}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Product Form Dialog */}
      {(selectedProduct || !isEditingProduct) && (
        <Dialog open={selectedProduct !== null || !isEditingProduct} onOpenChange={() => {
          setSelectedProduct(null);
          setIsEditingProduct(false);
        }}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isEditingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Product Name</Label>
                  <Input
                    value={productForm.name}
                    onChange={(e) => setProductForm(prev => ({...prev, name: e.target.value}))}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input
                    value={productForm.category}
                    onChange={(e) => setProductForm(prev => ({...prev, category: e.target.value}))}
                    placeholder="Enter category"
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm(prev => ({...prev, price: parseFloat(e.target.value) || 0}))}
                    placeholder="Enter price"
                  />
                </div>
                <div>
                  <Label>Stock Quantity</Label>
                  <Input
                    type="number"
                    value={productForm.stock_quantity}
                    onChange={(e) => setProductForm(prev => ({...prev, stock_quantity: parseInt(e.target.value) || 0}))}
                    placeholder="Enter stock quantity"
                  />
                </div>
              </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm(prev => ({...prev, description: e.target.value}))}
                    placeholder="Enter product description"
                  />
                </div>
                <div>
                  <Label>Brand & Model</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={productForm.brand}
                      onChange={(e) => setProductForm(prev => ({...prev, brand: e.target.value}))}
                      placeholder="Brand"
                    />
                    <Input
                      value={productForm.model}
                      onChange={(e) => setProductForm(prev => ({...prev, model: e.target.value}))}
                      placeholder="Model"
                    />
                  </div>
                </div>
                <div>
                  <Label>Warranty Period (months)</Label>
                  <Input
                    type="number"
                    value={productForm.warranty_period}
                    onChange={(e) => setProductForm(prev => ({...prev, warranty_period: parseInt(e.target.value) || 12}))}
                    placeholder="Enter warranty period"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="is-active"
                    checked={productForm.is_active}
                    onCheckedChange={(checked) => setProductForm(prev => ({...prev, is_active: checked as boolean}))}
                  />
                  <Label htmlFor="is-active">Product is active</Label>
                </div>
            </div>
            <DialogFooter>
              <Button onClick={saveProduct}>
                {isEditingProduct ? 'Update Product' : 'Create Product'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Complaint Response Dialog */}
      {selectedComplaint && (
        <Dialog open={!!selectedComplaint} onOpenChange={() => setSelectedComplaint(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Complaint Details - #{selectedComplaint.complaint_number}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Customer</Label>
                  <p>{selectedComplaint.customer_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedComplaint.customer_email}</p>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Badge className={
                    selectedComplaint.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    selectedComplaint.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }>
                    {selectedComplaint.priority}
                  </Badge>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <p className="p-3 bg-muted rounded">{selectedComplaint.description}</p>
              </div>
              <div>
                <Label>Admin Response</Label>
                <Textarea
                  value={complaintResponse}
                  onChange={(e) => setComplaintResponse(e.target.value)}
                  placeholder="Enter your response to the customer..."
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => updateComplaintStatus(selectedComplaint.id, 'resolved', complaintResponse)}>
                  Resolve Complaint
                </Button>
                <Button variant="outline" onClick={() => updateComplaintStatus(selectedComplaint.id, 'in_progress', complaintResponse)}>
                  Mark In Progress
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminDashboard;
