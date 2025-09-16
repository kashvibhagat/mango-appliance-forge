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
      case 'pending': return 'bg-gradient-to-r from-warning/15 to-warning/10 text-warning border-warning/30 shadow-lg shadow-warning/20'
      case 'confirmed': return 'bg-gradient-to-r from-blue-500/15 to-blue-500/10 text-blue-600 border-blue-500/30 shadow-lg shadow-blue-500/20'
      case 'shipped': return 'bg-gradient-to-r from-purple-500/15 to-purple-500/10 text-purple-600 border-purple-500/30 shadow-lg shadow-purple-500/20'
      case 'delivered': return 'bg-gradient-to-r from-success/15 to-success/10 text-success border-success/30 shadow-lg shadow-success/20'
      case 'cancelled': return 'bg-gradient-to-r from-destructive/15 to-destructive/10 text-destructive border-destructive/30 shadow-lg shadow-destructive/20'
      default: return 'bg-gradient-to-r from-muted/50 to-muted/30 text-muted-foreground border-muted/50'
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
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Loading Header */}
          <div className="text-center space-y-4 py-8 mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-full border border-primary/20">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <div className="h-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold text-3xl">
                Loading Dashboard...
              </div>
            </div>
            <p className="text-muted-foreground animate-pulse">Fetching real-time business data</p>
          </div>

          {/* Loading Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="relative overflow-hidden border-0 shadow-lg animate-pulse">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded-full w-24"></div>
                      <div className="h-10 bg-gradient-to-r from-muted to-muted/50 rounded-full w-20"></div>
                      <div className="h-3 bg-gradient-to-r from-muted to-muted/50 rounded-full w-16"></div>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-muted to-muted/50 rounded-2xl"></div>
                  </div>
                  <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-muted/20 rounded-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Loading Table */}
          <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-lg animate-pulse">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="h-8 bg-gradient-to-r from-muted to-muted/50 rounded-full w-64"></div>
                <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded-full w-96"></div>
                <div className="space-y-3 mt-8">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 bg-gradient-to-r from-muted/50 to-muted/20 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <div className="container mx-auto max-w-7xl p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 py-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-full border border-primary/20">
            <Package className="w-6 h-6 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive business intelligence and order management system
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Real-time data updates</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-primary/5 via-primary/3 to-primary/10 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Orders</p>
                  <p className="text-4xl font-bold text-foreground tabular-nums">{stats.totalOrders}</p>
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <TrendingUp className="w-3 h-3" />
                    <span>All time</span>
                  </div>
                </div>
                <div className="p-4 bg-primary/15 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <ShoppingCart className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-success/5 via-success/3 to-success/10 hover:shadow-2xl hover:shadow-success/10 transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Revenue</p>
                  <p className="text-4xl font-bold text-foreground tabular-nums">₹{stats.totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center gap-2 text-xs text-success">
                    <TrendingUp className="w-3 h-3" />
                    <span>Net revenue</span>
                  </div>
                </div>
                <div className="p-4 bg-success/15 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="w-8 h-8 text-success" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-success/5 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-success/5 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-warning/5 via-warning/3 to-warning/10 hover:shadow-2xl hover:shadow-warning/10 transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pending Orders</p>
                  <p className="text-4xl font-bold text-foreground tabular-nums">{stats.pendingOrders}</p>
                  <div className="flex items-center gap-2 text-xs text-warning">
                    <Clock className="w-3 h-3" />
                    <span>Awaiting action</span>
                  </div>
                </div>
                <div className="p-4 bg-warning/15 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-warning" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-warning/5 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-warning/5 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-accent/5 via-accent/3 to-accent/10 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Completed Orders</p>
                  <p className="text-4xl font-bold text-foreground tabular-nums">{stats.completedOrders}</p>
                  <div className="flex items-center gap-2 text-xs text-accent">
                    <CheckCircle className="w-3 h-3" />
                    <span>Successfully delivered</span>
                  </div>
                </div>
                <div className="p-4 bg-accent/15 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-accent/5 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Management Section */}
        <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-lg">
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 via-primary/3 to-accent/5 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/15 rounded-2xl">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-foreground font-bold">Orders Management</CardTitle>
                  <CardDescription className="text-muted-foreground text-base mt-1">
                    Track and manage all customer orders with real-time updates
                  </CardDescription>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="lg" className="gap-3 px-6 py-3 bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300">
                    <Filter className="w-4 h-4" />
                    <span className="font-medium">Filter: {statusFilter === 'all' ? 'All Orders' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}</span>
                    <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                      {filteredOrders.length}
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2">
                  <DropdownMenuItem onClick={() => setStatusFilter('all')} className="gap-2 p-3 cursor-pointer">
                    <div className="w-2 h-2 bg-muted rounded-full"></div>
                    All Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('pending')} className="gap-2 p-3 cursor-pointer">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('confirmed')} className="gap-2 p-3 cursor-pointer">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Confirmed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('shipped')} className="gap-2 p-3 cursor-pointer">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Shipped
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('delivered')} className="gap-2 p-3 cursor-pointer">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
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
                  <TableRow className="bg-gradient-to-r from-muted/50 to-muted/30 border-b-2 border-primary/10">
                    <TableHead className="font-bold text-foreground px-6 py-4">Order #</TableHead>
                    <TableHead className="font-bold text-foreground px-6 py-4">Customer</TableHead>
                    <TableHead className="font-bold text-foreground px-6 py-4">Contact</TableHead>
                    <TableHead className="font-bold text-foreground px-6 py-4">Products</TableHead>
                    <TableHead className="font-bold text-foreground px-6 py-4">Shipping Address</TableHead>
                    <TableHead className="font-bold text-foreground px-6 py-4">Amount</TableHead>
                    <TableHead className="font-bold text-foreground px-6 py-4">Status</TableHead>
                    <TableHead className="font-bold text-foreground px-6 py-4">Date</TableHead>
                    <TableHead className="font-bold text-foreground text-center px-6 py-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order, index) => (
                    <TableRow key={order.id} className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-300 border-b border-muted/30">
                      <TableCell className="font-mono text-sm font-bold px-6 py-6">
                        <div className="px-3 py-1 bg-primary/10 rounded-full text-primary text-center">
                          {order.order_number}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold px-6 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">
                              {(order.customer_name || 'N/A').charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-foreground">{order.customer_name || 'N/A'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground px-6 py-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-success rounded-full"></div>
                            <span>{order.customer_email || 'N/A'}</span>
                          </div>
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