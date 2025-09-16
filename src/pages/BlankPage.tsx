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
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto max-w-7xl p-6 space-y-8 animate-fade-in">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-slide-up">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-brand rounded-full shadow-brand mb-4">
            <Package className="w-6 h-6 text-white" />
            <span className="text-white font-semibold">Admin Portal</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-brand bg-clip-text text-transparent float-animation">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Monitor and manage your business operations with comprehensive insights
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-animation">
          <Card className="card-hover card-glass relative overflow-hidden border-0 shadow-card bg-gradient-to-br from-mango-orange/5 to-mango-orange/10 group">
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">Total Orders</p>
                  <p className="text-4xl font-bold text-foreground animate-pulse-glow">{stats.totalOrders}</p>
                  <div className="flex items-center gap-2 text-xs text-success">
                    <TrendingUp className="w-3 h-3" />
                    <span>Active</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-brand rounded-2xl shadow-brand group-hover:scale-110 transition-transform duration-300">
                  <ShoppingCart className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-mango-orange/10 via-transparent to-mango-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </CardContent>
          </Card>

          <Card className="card-hover card-glass relative overflow-hidden border-0 shadow-card bg-gradient-to-br from-success/5 to-success/10 group">
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">Total Revenue</p>
                  <p className="text-4xl font-bold text-foreground">₹{stats.totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center gap-2 text-xs text-success">
                    <TrendingUp className="w-3 h-3" />
                    <span>Growing</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-success to-success/80 rounded-2xl shadow-accent group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-success/10 via-transparent to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </CardContent>
          </Card>

          <Card className="card-hover card-glass relative overflow-hidden border-0 shadow-card bg-gradient-to-br from-warning/5 to-warning/10 group">
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">Pending Orders</p>
                  <p className="text-4xl font-bold text-foreground animate-bounce-gentle">{stats.pendingOrders}</p>
                  <div className="flex items-center gap-2 text-xs text-warning">
                    <Clock className="w-3 h-3" />
                    <span>Requires Action</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-warning to-warning/80 rounded-2xl shadow-brand group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-warning/10 via-transparent to-warning/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </CardContent>
          </Card>

          <Card className="card-hover card-glass relative overflow-hidden border-0 shadow-card bg-gradient-to-br from-accent/5 to-accent/10 group">
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">Completed Orders</p>
                  <p className="text-4xl font-bold text-foreground">{stats.completedOrders}</p>
                  <div className="flex items-center gap-2 text-xs text-accent">
                    <CheckCircle className="w-3 h-3" />
                    <span>Delivered</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-accent to-accent/80 rounded-2xl shadow-accent group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Management Section */}
        <Card className="card-glass border-0 shadow-brand bg-gradient-card backdrop-blur-lg animate-scale-in">
          <CardHeader className="border-b border-border/50 bg-gradient-to-r from-mango-orange/5 via-primary/5 to-transparent backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-brand rounded-2xl shadow-brand">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                    Orders Management
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                      Live
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-base">
                    Track and manage all customer orders in real-time
                  </CardDescription>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-300 hover:shadow-brand btn-micro">
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
                  <TableRow className="bg-gradient-to-r from-muted/50 to-muted/30 border-b-2 border-primary/10">
                    <TableHead className="font-bold text-foreground">Order #</TableHead>
                    <TableHead className="font-bold text-foreground">Customer</TableHead>
                    <TableHead className="font-bold text-foreground">Contact</TableHead>
                    <TableHead className="font-bold text-foreground">Products</TableHead>
                    <TableHead className="font-bold text-foreground">Shipping Address</TableHead>
                    <TableHead className="font-bold text-foreground">Amount</TableHead>
                    <TableHead className="font-bold text-foreground">Status</TableHead>
                    <TableHead className="font-bold text-foreground">Date</TableHead>
                    <TableHead className="font-bold text-foreground text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order, index) => (
                    <TableRow key={order.id} className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all duration-300 hover:shadow-sm border-b border-border/50">
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
                        <div className="max-w-xs space-y-2">
                          {Array.isArray(order.items) ? order.items.map((item: any, idx: number) => (
                            <div key={idx} className="text-sm bg-gradient-to-r from-primary/5 to-primary/10 px-3 py-2 rounded-lg border border-primary/20 text-foreground hover:shadow-brand/20 hover:shadow-sm transition-all duration-200">
                              <span className="font-semibold">{item.name}</span>
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
                            <div className="space-y-1 p-3 bg-gradient-to-br from-muted/20 to-muted/10 rounded-xl border border-border/50 hover:shadow-card hover:border-primary/20 transition-all duration-300">
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
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xl text-foreground bg-gradient-to-r from-success to-success/80 bg-clip-text text-transparent">
                            ₹{Number(order.total_amount).toLocaleString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(order.status)} gap-2 capitalize px-3 py-1 font-semibold hover:scale-105 transition-transform duration-200`}>
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
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110 btn-micro">
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
              <div className="text-center py-16 animate-fade-in">
                <div className="inline-flex p-6 bg-gradient-to-br from-muted/30 to-muted/10 rounded-3xl mb-6">
                  <Package className="w-16 h-16 text-muted-foreground animate-bounce-gentle" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">No orders found</h3>
                <p className="text-muted-foreground text-lg">
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