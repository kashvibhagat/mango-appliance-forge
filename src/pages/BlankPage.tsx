import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Package, 
  TrendingUp, 
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Filter
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
  const { user } = useAuth()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch all orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (ordersError) throw ordersError

      setOrders(ordersData || [])

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
      case 'cancelled': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter)

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
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Monitor and manage your business operations
          </p>
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

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-accent/5 to-accent/10 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Completed Orders</p>
                  <p className="text-3xl font-bold text-foreground">{stats.completedOrders}</p>
                </div>
                <div className="p-3 bg-accent/10 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-50"></div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Management Section */}
        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl text-foreground">Orders Management</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Track and manage all customer orders
                  </CardDescription>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filter: {statusFilter === 'all' ? 'All Orders' : statusFilter}
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
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="font-semibold">Order #</TableHead>
                    <TableHead className="font-semibold">Customer</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold">Products</TableHead>
                    <TableHead className="font-semibold">Shipping Address</TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order, index) => (
                    <TableRow key={order.id} className="hover:bg-muted/20 transition-colors">
                      <TableCell className="font-mono text-sm font-medium">
                        {order.order_number}
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.customer_name || 'N/A'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {order.customer_email || 'N/A'}
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem 
                              onClick={() => updateOrderStatus(order.id, 'confirmed')}
                              className="gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Mark as Confirmed
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => updateOrderStatus(order.id, 'shipped')}
                              className="gap-2"
                            >
                              <Package className="w-4 h-4" />
                              Mark as Shipped
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => updateOrderStatus(order.id, 'delivered')}
                              className="gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Mark as Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => updateOrderStatus(order.id, 'cancelled')}
                              className="gap-2 text-destructive focus:text-destructive"
                            >
                              <AlertCircle className="w-4 h-4" />
                              Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground">No orders found</h3>
                <p className="text-sm text-muted-foreground">
                  {statusFilter === 'all' ? 'No orders have been placed yet.' : `No ${statusFilter} orders found.`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard