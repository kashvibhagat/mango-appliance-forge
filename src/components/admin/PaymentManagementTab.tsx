import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, CheckCircle, Clock, XCircle, Search, Download, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PaymentOrder {
  id: string;
  order_number: string;
  customer_name: string | null;
  customer_email: string | null;
  payment_method: string | null;
  payment_status: string | null;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  payment_details: any;
  total_amount: number;
  created_at: string;
}

interface PaymentStats {
  totalRevenue: number;
  totalTransactions: number;
  successfulTransactions: number;
  pendingTransactions: number;
}

export const PaymentManagementTab = () => {
  const [payments, setPayments] = useState<PaymentOrder[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<PaymentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<PaymentOrder | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [stats, setStats] = useState<PaymentStats>({
    totalRevenue: 0,
    totalTransactions: 0,
    successfulTransactions: 0,
    pendingTransactions: 0,
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    filterPayments();
  }, [payments, searchQuery, statusFilter, methodFilter]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('id, order_number, customer_name, customer_email, payment_method, payment_status, razorpay_order_id, razorpay_payment_id, payment_details, total_amount, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPayments(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast({
        title: 'Error',
        description: 'Failed to load payment data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (paymentsData: PaymentOrder[]) => {
    const razorpayPayments = paymentsData.filter(p => p.payment_method === 'razorpay');
    const totalRevenue = razorpayPayments
      .filter(p => p.payment_status === 'completed')
      .reduce((sum, p) => sum + Number(p.total_amount), 0);
    const successfulTransactions = razorpayPayments.filter(p => p.payment_status === 'completed').length;
    const pendingTransactions = razorpayPayments.filter(p => p.payment_status === 'pending').length;

    setStats({
      totalRevenue,
      totalTransactions: razorpayPayments.length,
      successfulTransactions,
      pendingTransactions,
    });
  };

  const filterPayments = () => {
    let filtered = [...payments];

    // Filter by payment method
    if (methodFilter !== 'all') {
      filtered = filtered.filter(p => p.payment_method === methodFilter);
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.payment_status === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.order_number?.toLowerCase().includes(query) ||
        p.customer_name?.toLowerCase().includes(query) ||
        p.customer_email?.toLowerCase().includes(query) ||
        p.razorpay_order_id?.toLowerCase().includes(query) ||
        p.razorpay_payment_id?.toLowerCase().includes(query)
      );
    }

    setFilteredPayments(filtered);
  };

  const handleViewDetails = (payment: PaymentOrder) => {
    setSelectedPayment(payment);
    setDetailsDialogOpen(true);
  };

  const exportToCSV = () => {
    const headers = ['Order Number', 'Customer Name', 'Customer Email', 'Payment Method', 'Status', 'Razorpay Order ID', 'Razorpay Payment ID', 'Amount', 'Date'];
    const rows = filteredPayments.map(p => [
      p.order_number,
      p.customer_name || '',
      p.customer_email || '',
      p.payment_method || '',
      p.payment_status || '',
      p.razorpay_order_id || '',
      p.razorpay_payment_id || '',
      p.total_amount,
      new Date(p.created_at).toLocaleString(),
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: 'Success',
      description: 'Payment data exported successfully',
    });
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="secondary">{status || 'Unknown'}</Badge>;
    }
  };

  const getMethodBadge = (method: string | null) => {
    if (method === 'razorpay') {
      return <Badge className="bg-primary"><CreditCard className="w-3 h-3 mr-1" />Razorpay</Badge>;
    }
    return <Badge variant="outline">{method || 'COD'}</Badge>;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment Management</CardTitle>
          <CardDescription>Loading payment data...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Razorpay Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTransactions}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Successful</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.successfulTransactions}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingTransactions}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Payment Table Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Payment Transactions</CardTitle>
                <CardDescription>View and manage customer payments via Razorpay</CardDescription>
              </div>
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Order number, customer, Razorpay ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="w-[180px]">
                <Label htmlFor="method">Payment Method</Label>
                <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger id="method">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="razorpay">Razorpay</SelectItem>
                    <SelectItem value="cod">COD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[180px]">
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Number</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Razorpay Order ID</TableHead>
                    <TableHead>Razorpay Payment ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        No payments found matching your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.order_number}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{payment.customer_name || 'N/A'}</span>
                            <span className="text-sm text-muted-foreground">{payment.customer_email || 'N/A'}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getMethodBadge(payment.payment_method)}</TableCell>
                        <TableCell>{getStatusBadge(payment.payment_status)}</TableCell>
                        <TableCell>
                          <span className="text-xs font-mono">{payment.razorpay_order_id || 'N/A'}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs font-mono">{payment.razorpay_payment_id || 'N/A'}</span>
                        </TableCell>
                        <TableCell className="font-semibold">₹{Number(payment.total_amount).toLocaleString()}</TableCell>
                        <TableCell className="text-sm">{new Date(payment.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(payment)}
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

      {/* Payment Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              Complete payment information for order {selectedPayment?.order_number}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Order Number</Label>
                  <p className="font-medium">{selectedPayment.order_number}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Amount</Label>
                  <p className="font-medium text-lg">₹{Number(selectedPayment.total_amount).toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Customer Name</Label>
                  <p className="font-medium">{selectedPayment.customer_name || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Customer Email</Label>
                  <p className="font-medium">{selectedPayment.customer_email || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Payment Method</Label>
                  <div className="mt-1">{getMethodBadge(selectedPayment.payment_method)}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Payment Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedPayment.payment_status)}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Razorpay Order ID</Label>
                  <p className="font-mono text-sm">{selectedPayment.razorpay_order_id || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Razorpay Payment ID</Label>
                  <p className="font-mono text-sm">{selectedPayment.razorpay_payment_id || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Date</Label>
                  <p className="font-medium">{new Date(selectedPayment.created_at).toLocaleString()}</p>
                </div>
              </div>

              {selectedPayment.payment_details && Object.keys(selectedPayment.payment_details).length > 0 && (
                <div>
                  <Label className="text-muted-foreground">Payment Details (JSON)</Label>
                  <pre className="mt-2 p-4 bg-muted rounded-lg text-xs overflow-auto max-h-48">
                    {JSON.stringify(selectedPayment.payment_details, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
