import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, Download, Search, ShoppingBag, AlertCircle, Mail, Phone, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Customer {
  id: string;
  user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  total_orders: number;
  total_spent: number;
  last_order_date: string | null;
  is_blocked: boolean;
  created_at: string;
}

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface Complaint {
  id: string;
  complaint_number: string;
  subject: string;
  status: string;
  priority: string;
  created_at: string;
}

export const CustomerManagementTab = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);
  const [customerComplaints, setCustomerComplaints] = useState<Complaint[]>([]);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchQuery]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: 'Error',
        description: 'Failed to load customer data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterCustomers = () => {
    if (!searchQuery) {
      setFilteredCustomers(customers);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = customers.filter(c =>
      c.email?.toLowerCase().includes(query) ||
      c.first_name?.toLowerCase().includes(query) ||
      c.last_name?.toLowerCase().includes(query) ||
      c.phone?.toLowerCase().includes(query)
    );
    setFilteredCustomers(filtered);
  };

  const fetchCustomerDetails = async (customer: Customer) => {
    try {
      // Fetch customer orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('id, order_number, total_amount, status, created_at')
        .eq('user_id', customer.user_id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      setCustomerOrders(ordersData || []);

      // Fetch customer complaints
      const { data: complaintsData, error: complaintsError } = await supabase
        .from('complaints')
        .select('id, complaint_number, subject, status, priority, created_at')
        .eq('user_id', customer.user_id)
        .order('created_at', { ascending: false });

      if (complaintsError) throw complaintsError;
      setCustomerComplaints(complaintsData || []);

      setSelectedCustomer(customer);
      setDetailsDialogOpen(true);
    } catch (error) {
      console.error('Error fetching customer details:', error);
      toast({
        title: 'Error',
        description: 'Failed to load customer details',
        variant: 'destructive',
      });
    }
  };

  const exportToCSV = () => {
    const headers = ['Email', 'First Name', 'Last Name', 'Phone', 'Total Orders', 'Total Spent', 'Last Order Date', 'Joined Date', 'Status'];
    const rows = filteredCustomers.map(c => [
      c.email,
      c.first_name || '',
      c.last_name || '',
      c.phone || '',
      c.total_orders || 0,
      c.total_spent || 0,
      c.last_order_date ? new Date(c.last_order_date).toLocaleDateString() : 'Never',
      new Date(c.created_at).toLocaleDateString(),
      c.is_blocked ? 'Blocked' : 'Active',
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: 'Success',
      description: 'Customer data exported successfully',
    });
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: 'bg-yellow-500',
      confirmed: 'bg-blue-500',
      processing: 'bg-purple-500',
      shipped: 'bg-indigo-500',
      delivered: 'bg-green-600',
      cancelled: 'bg-red-600',
    };

    return (
      <Badge className={`${statusColors[status] || 'bg-gray-500'} text-white`}>
        {status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityColors: Record<string, string> = {
      low: 'bg-gray-500',
      medium: 'bg-yellow-500',
      high: 'bg-red-600',
    };

    return (
      <Badge className={`${priorityColors[priority] || 'bg-gray-500'} text-white`}>
        {priority}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>Loading customer data...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum, c) => sum + (c.total_spent || 0), 0);
  const totalOrders = customers.reduce((sum, c) => sum + (c.total_orders || 0), 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <>
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{averageOrderValue.toFixed(0)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Customer Table Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Customer Directory</CardTitle>
                <CardDescription>View and manage customer accounts</CardDescription>
              </div>
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="mb-6">
              <Label htmlFor="search">Search Customers</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No customers found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">
                          {customer.first_name || customer.last_name
                            ? `${customer.first_name || ''} ${customer.last_name || ''}`
                            : 'N/A'}
                        </TableCell>
                        <TableCell className="text-sm">{customer.email}</TableCell>
                        <TableCell className="text-sm">{customer.phone || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{customer.total_orders || 0}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold">
                          ₹{(customer.total_spent || 0).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-sm">
                          {customer.last_order_date
                            ? new Date(customer.last_order_date).toLocaleDateString()
                            : 'Never'}
                        </TableCell>
                        <TableCell>
                          {customer.is_blocked ? (
                            <Badge className="bg-red-600 text-white">Blocked</Badge>
                          ) : (
                            <Badge className="bg-green-600 text-white">Active</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => fetchCustomerDetails(customer)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              Complete information for {selectedCustomer?.email}
            </DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-6">
              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Full Name</Label>
                      <p className="font-medium">
                        {selectedCustomer.first_name || selectedCustomer.last_name
                          ? `${selectedCustomer.first_name || ''} ${selectedCustomer.last_name || ''}`
                          : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Email</Label>
                      <p className="font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {selectedCustomer.email}
                      </p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Phone</Label>
                      <p className="font-medium flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {selectedCustomer.phone || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Customer Since</Label>
                      <p className="font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(selectedCustomer.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Total Orders</Label>
                      <p className="font-medium">{selectedCustomer.total_orders || 0}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Total Spent</Label>
                      <p className="font-medium">₹{(selectedCustomer.total_spent || 0).toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs for Orders and Complaints */}
              <Tabs defaultValue="orders">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="orders">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Orders ({customerOrders.length})
                  </TabsTrigger>
                  <TabsTrigger value="complaints">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Complaints ({customerComplaints.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="orders" className="space-y-4">
                  {customerOrders.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No orders found</p>
                  ) : (
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order Number</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {customerOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.order_number}</TableCell>
                              <TableCell>₹{Number(order.total_amount).toLocaleString()}</TableCell>
                              <TableCell>{getStatusBadge(order.status)}</TableCell>
                              <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="complaints" className="space-y-4">
                  {customerComplaints.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No complaints found</p>
                  ) : (
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Complaint #</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {customerComplaints.map((complaint) => (
                            <TableRow key={complaint.id}>
                              <TableCell className="font-medium">{complaint.complaint_number}</TableCell>
                              <TableCell>{complaint.subject}</TableCell>
                              <TableCell>{getPriorityBadge(complaint.priority)}</TableCell>
                              <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                              <TableCell>{new Date(complaint.created_at).toLocaleDateString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
