import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  Package, 
  TrendingUp, 
  TrendingDown,
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Filter,
  Search,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Users,
  XCircle
} from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface Order {
  id: string
  order_number: string
  status: string
  total_amount: number
  customer_name: string
  customer_email: string
  created_at: string
  user_id?: string
  items: any
  shipping_address: any
  profiles?: {
    first_name: string
    last_name: string
    phone?: string
  } | null
}

interface Stats {
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  completedOrders: number
}

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0
  })
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async (showRefreshing = false) => {
    try {
      if (showRefreshing) setRefreshing(true)
      else setLoading(true)
      
      // Fetch orders with profiles data
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          profiles:user_id (
            first_name,
            last_name,
            phone
          )
        `)
        .order('created_at', { ascending: false })

      if (ordersError) throw ordersError

      setOrders((ordersData || []) as unknown as Order[])

      // Calculate stats
      if (ordersData) {
        const totalRevenue = ordersData.reduce((sum, order) => sum + Number(order.total_amount), 0)
        const pendingOrders = ordersData.filter(order => order.status === 'pending').length
        const completedOrders = ordersData.filter(order => order.status === 'delivered').length
        
        setStats({
          totalOrders: ordersData.length,
          totalRevenue,
          pendingOrders,
          completedOrders
        })
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) throw error

      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))

      toast({
        title: 'Success',
        description: 'Order status updated successfully',
      })
    } catch (error) {
      console.error('Error updating order status:', error)
      toast({
        title: 'Error',
        description: 'Failed to update order status',
        variant: 'destructive',
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning/10 text-warning border-warning/20'
      case 'confirmed': return 'bg-blue-500/10 text-blue-600 border-blue-200'
      case 'shipped': return 'bg-purple-500/10 text-purple-600 border-purple-200'
      case 'delivered': return 'bg-success/10 text-success border-success/20'
      case 'cancelled': return 'bg-destructive/10 text-destructive border-destructive/20'
      default: return 'bg-muted/50 text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'confirmed': return <CheckCircle className="w-4 h-4" />
      case 'shipped': return <Package className="w-4 h-4" />
      case 'delivered': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  // Enhanced filtering with search and status
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      const matchesSearch = !searchQuery || 
        order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer_email?.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesStatus && matchesSearch
    })
  }, [orders, statusFilter, searchQuery])

  // Export orders as CSV
  const exportOrders = () => {
    const csvContent = [
      ['Order Number', 'Customer', 'Email', 'Status', 'Amount', 'Date'].join(','),
      ...filteredOrders.map(order => [
        order.order_number,
        order.customer_name || 'N/A',
        order.customer_email || 'N/A', 
        order.status,
        `₹${order.total_amount}`,
        new Date(order.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `orders-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: 'Success',
      description: 'Orders exported successfully',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded w-20 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-16"></div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="animate-pulse">
            <CardContent className="h-96 p-6">
              <div className="h-full bg-muted rounded"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto max-w-7xl p-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-lg mt-1">
              Monitor and manage your business operations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchDashboardData(true)}
              disabled={refreshing}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportOrders}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalOrders}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-success/5 to-success/10 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-3xl font-bold text-foreground">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-success/10 rounded-xl">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-success/5 to-transparent opacity-50"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-warning/5 to-warning/10 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                  <p className="text-3xl font-bold text-foreground">{stats.pendingOrders}</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-xl">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-warning/5 to-transparent opacity-50"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-500/5 to-green-500/10 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Completed Orders</p>
                  <p className="text-3xl font-bold text-foreground">{stats.completedOrders}</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span>Successfully delivered</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-50"></div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Management Section */}
        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl text-foreground">Orders Management</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {filteredOrders.length} of {orders.length} orders
                  </CardDescription>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full sm:w-[250px]"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="w-4 h-4" />
                      {statusFilter === 'all' ? 'All Orders' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                      All Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                      Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('confirmed')}>
                      Confirmed
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('shipped')}>
                      Shipped
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('delivered')}>
                      Delivered
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('cancelled')}>
                      Cancelled
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="font-semibold">Order Details</TableHead>
                    <TableHead className="font-semibold">Customer</TableHead>
                    <TableHead className="font-semibold">Products</TableHead>
                    <TableHead className="font-semibold">Shipping Address</TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order, index) => (
                    <TableRow key={order.id} className="hover:bg-muted/20 transition-colors">
                      <TableCell>
                        <div>
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="font-mono text-sm font-medium text-primary hover:underline cursor-pointer"
                          >
                            {order.order_number}
                          </button>
                          <div className="text-xs text-muted-foreground mt-1">
                            {Array.isArray(order.items) && order.items.length > 0 
                              ? `${order.items.length} item${order.items.length > 1 ? 's' : ''}`
                              : 'No items'
                            }
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">
                            {order.customer_name || 'Unknown Customer'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {order.customer_email || 'No email'}
                          </div>
                          {order.profiles && (order.profiles.first_name || order.profiles.last_name) && (
                            <div className="text-xs text-muted-foreground">
                              Profile: {order.profiles.first_name} {order.profiles.last_name}
                            </div>
                          )}
                          {order.profiles?.phone && (
                            <div className="text-xs text-muted-foreground">
                              Phone: {order.profiles.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs space-y-1">
                          {Array.isArray(order.items) ? order.items.map((item: any, idx: number) => (
                            <div key={idx} className="text-sm bg-muted/50 px-2 py-1 rounded text-foreground">
                              <span className="font-medium">{item.name}</span>
                              <span className="text-muted-foreground"> × {item.quantity}</span>
                            </div>
                          )) : (
                            <span className="text-muted-foreground text-sm">No items</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs text-sm text-muted-foreground">
                          {order.shipping_address ? (
                            <div className="space-y-1 p-2 bg-muted/30 rounded-lg border">
                              {/* Customer Name with Title */}
                              <div className="font-medium text-foreground border-b border-muted pb-1">
                                {order.shipping_address.title && (
                                  <span className="text-xs bg-primary/10 px-1 rounded mr-1">{order.shipping_address.title}</span>
                                )}
                                {order.shipping_address.first_name} {order.shipping_address.last_name}
                              </div>
                              
                               {/* Complete Address */}
                               <div className="space-y-0.5">
                                 {/* Check both address field formats */}
                                 {(order.shipping_address.address || order.shipping_address.address_line_1) && (
                                   <div className="text-xs">
                                     <span className="font-medium text-foreground">Address:</span> {order.shipping_address.address || order.shipping_address.address_line_1}
                                   </div>
                                 )}
                                 {order.shipping_address.address_line_2 && (
                                   <div className="text-xs">
                                     <span className="font-medium text-foreground">Address 2:</span> {order.shipping_address.address_line_2}
                                   </div>
                                 )}
                                {order.shipping_address.city && (
                                  <div className="text-xs">
                                    <span className="font-medium text-foreground">City:</span> {order.shipping_address.city}
                                  </div>
                                )}
                                {order.shipping_address.state && (
                                  <div className="text-xs">
                                    <span className="font-medium text-foreground">State:</span> {order.shipping_address.state}
                                  </div>
                                )}
                                {order.shipping_address.postal_code && (
                                  <div className="text-xs">
                                    <span className="font-medium text-foreground">PIN Code:</span> {order.shipping_address.postal_code}
                                  </div>
                                )}
                                <div className="text-xs">
                                  <span className="font-medium text-foreground">Country:</span> {order.shipping_address.country || 'India'}
                                </div>
                                {order.shipping_address.phone && (
                                  <div className="text-xs font-medium text-primary border-t border-muted pt-1">
                                    <span className="font-medium text-foreground">📞 Phone:</span> {order.shipping_address.phone}
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-2 px-3 bg-muted/20 rounded border border-dashed">
                              <span className="text-xs text-muted-foreground">No address provided</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-lg text-foreground">
                          ₹{Number(order.total_amount).toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(order.status)} gap-1 capitalize`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                            className="hover:bg-primary/10"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem 
                                onClick={() => updateOrderStatus(order.id, 'pending')}
                                disabled={order.status === 'pending'}
                                className="gap-2"
                              >
                                <Clock className="w-4 h-4" />
                                Mark as Pending
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => updateOrderStatus(order.id, 'confirmed')}
                                disabled={order.status === 'confirmed'}
                                className="gap-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Mark as Confirmed
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => updateOrderStatus(order.id, 'shipped')}
                                disabled={order.status === 'shipped'}
                                className="gap-2"
                              >
                                <Package className="w-4 h-4" />
                                Mark as Shipped
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => updateOrderStatus(order.id, 'delivered')}
                                disabled={order.status === 'delivered'}
                                className="gap-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Mark as Delivered
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                disabled={order.status === 'cancelled'}
                                className="gap-2 text-destructive focus:text-destructive"
                              >
                                <XCircle className="w-4 h-4" />
                                Cancel Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
                <h3 className="text-lg font-semibold text-foreground">No orders found</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {searchQuery ? `No orders match "${searchQuery}"` : 
                   statusFilter === 'all' ? 'No orders have been placed yet.' : `No ${statusFilter} orders found.`}
                </p>
                {searchQuery && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery('')}
                    className="mt-4"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Details Modal */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Details - {selectedOrder?.order_number}
              </DialogTitle>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="grid gap-6 py-4">
                {/* Order Info */}
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Order Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Order Number:</span>
                        <span className="font-mono font-medium">{selectedOrder.order_number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge className={`${getStatusColor(selectedOrder.status)} gap-1`}>
                          {getStatusIcon(selectedOrder.status)}
                          {selectedOrder.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Amount:</span>
                        <span className="font-semibold text-lg">₹{Number(selectedOrder.total_amount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Order Date:</span>
                        <span>{new Date(selectedOrder.created_at).toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{selectedOrder.customer_name || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{selectedOrder.customer_email || 'N/A'}</span>
                      </div>
                      {selectedOrder.profiles && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Profile Name:</span>
                            <span>{selectedOrder.profiles.first_name} {selectedOrder.profiles.last_name}</span>
                          </div>
                          {selectedOrder.profiles.phone && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Phone:</span>
                              <span className="font-medium">{selectedOrder.profiles.phone}</span>
                            </div>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Shipping Address */}
                {selectedOrder.shipping_address && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm space-y-2 p-4 bg-muted/30 rounded-lg border">
                        <div className="font-medium text-base border-b border-muted pb-2">
                          {selectedOrder.shipping_address.title && (
                            <span className="text-xs bg-primary/10 px-2 py-1 rounded mr-2">{selectedOrder.shipping_address.title}</span>
                          )}
                          {selectedOrder.shipping_address.first_name} {selectedOrder.shipping_address.last_name}
                        </div>
                        
                        <div className="space-y-1">
                          {(selectedOrder.shipping_address.address || selectedOrder.shipping_address.address_line_1) && (
                            <div><strong>Address:</strong> {selectedOrder.shipping_address.address || selectedOrder.shipping_address.address_line_1}</div>
                          )}
                          {selectedOrder.shipping_address.address_line_2 && (
                            <div><strong>Address 2:</strong> {selectedOrder.shipping_address.address_line_2}</div>
                          )}
                          {selectedOrder.shipping_address.city && (
                            <div><strong>City:</strong> {selectedOrder.shipping_address.city}</div>
                          )}
                          {selectedOrder.shipping_address.state && (
                            <div><strong>State:</strong> {selectedOrder.shipping_address.state}</div>
                          )}
                          {selectedOrder.shipping_address.postal_code && (
                            <div><strong>PIN Code:</strong> {selectedOrder.shipping_address.postal_code}</div>
                          )}
                          <div><strong>Country:</strong> {selectedOrder.shipping_address.country || 'India'}</div>
                          {selectedOrder.shipping_address.phone && (
                            <div className="border-t border-muted pt-2 mt-2">
                              <strong>📞 Phone:</strong> {selectedOrder.shipping_address.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Order Items */}
                {Array.isArray(selectedOrder.items) && selectedOrder.items.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Order Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedOrder.items.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-4 border rounded-lg bg-muted/20">
                            <div>
                              <div className="font-medium">{item.name || 'Product'}</div>
                              <div className="text-sm text-muted-foreground">
                                Quantity: {item.quantity || 1}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">₹{(item.price || 0).toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">
                                Total: ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default AdminDashboard