import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Package, 
  TrendingUp, 
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Filter,
  Plus,
  Edit
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
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
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [addressForm, setAddressForm] = useState({
    first_name: '',
    last_name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India',
    phone: ''
  })
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

  const updateShippingAddress = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ shipping_address: addressForm })
        .eq('id', orderId)

      if (error) throw error

      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, shipping_address: addressForm } : order
      ))

      setIsAddressDialogOpen(false)
      setEditingOrder(null)
      setAddressForm({
        first_name: '',
        last_name: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'India',
        phone: ''
      })

      toast({
        title: 'Success',
        description: 'Shipping address updated successfully',
      })
    } catch (error) {
      console.error('Error updating shipping address:', error)
      toast({
        title: 'Error',
        description: 'Failed to update shipping address',
        variant: 'destructive',
      })
    }
  }

  const openEditAddress = (order: Order) => {
    setEditingOrder(order)
    if (order.shipping_address) {
      setAddressForm({
        first_name: order.shipping_address.first_name || '',
        last_name: order.shipping_address.last_name || '',
        address_line_1: order.shipping_address.address_line_1 || order.shipping_address.address || '',
        address_line_2: order.shipping_address.address_line_2 || '',
        city: order.shipping_address.city || '',
        state: order.shipping_address.state || '',
        postal_code: order.shipping_address.postal_code || '',
        country: order.shipping_address.country || 'India',
        phone: order.shipping_address.phone || ''
      })
    }
    setIsAddressDialogOpen(true)
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Professional Header Bar */}
      <div className="border-b border-border/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-brand rounded-lg shadow-sm">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Business Operations Center</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-success/20 text-success bg-success/5">
                <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
                Live
              </Badge>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{new Date().toLocaleDateString()}</p>
                <p className="text-xs text-muted-foreground">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-8">

        {/* Professional Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card className="bg-white border border-border/60 shadow-sm hover:shadow-md transition-all duration-200 group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Orders</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalOrders}</p>
                  <div className="flex items-center gap-1 text-xs text-success font-medium">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12% from last month</span>
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/15 transition-colors duration-200">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-border/60 shadow-sm hover:shadow-md transition-all duration-200 group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Revenue</p>
                  <p className="text-3xl font-bold text-foreground">₹{stats.totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center gap-1 text-xs text-success font-medium">
                    <TrendingUp className="w-3 h-3" />
                    <span>+8.5% from last month</span>
                  </div>
                </div>
                <div className="p-3 bg-success/10 rounded-xl group-hover:bg-success/15 transition-colors duration-200">
                  <DollarSign className="w-5 h-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-border/60 shadow-sm hover:shadow-md transition-all duration-200 group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pending Orders</p>
                  <p className="text-3xl font-bold text-foreground">{stats.pendingOrders}</p>
                  <div className="flex items-center gap-1 text-xs text-warning font-medium">
                    <Clock className="w-3 h-3" />
                    <span>Requires attention</span>
                  </div>
                </div>
                <div className="p-3 bg-warning/10 rounded-xl group-hover:bg-warning/15 transition-colors duration-200">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-border/60 shadow-sm hover:shadow-md transition-all duration-200 group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Completed Orders</p>
                  <p className="text-3xl font-bold text-foreground">{stats.completedOrders}</p>
                  <div className="flex items-center gap-1 text-xs text-success font-medium">
                    <CheckCircle className="w-3 h-3" />
                    <span>Successfully delivered</span>
                  </div>
                </div>
                <div className="p-3 bg-success/10 rounded-xl group-hover:bg-success/15 transition-colors duration-200">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Professional Orders Management Section */}
        <Card className="bg-white border border-border/60 shadow-sm">
          <CardHeader className="border-b border-border/40 bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    Orders Management
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Monitor and manage all customer orders
                  </CardDescription>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 border-border/60 hover:border-primary/30 hover:bg-primary/5">
                    <Filter className="w-4 h-4" />
                    {statusFilter === 'all' ? 'All Orders' : statusFilter.replace(/^\w/, c => c.toUpperCase())}
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
                  <TableRow className="bg-muted/30 border-b">
                    <TableHead className="font-semibold text-foreground py-4">Order #</TableHead>
                    <TableHead className="font-semibold text-foreground py-4">Customer</TableHead>
                    <TableHead className="font-semibold text-foreground py-4">Contact</TableHead>
                    <TableHead className="font-semibold text-foreground py-4">Products</TableHead>
                    <TableHead className="font-semibold text-foreground py-4">Shipping Address</TableHead>
                    <TableHead className="font-semibold text-foreground py-4">Amount</TableHead>
                    <TableHead className="font-semibold text-foreground py-4">Status</TableHead>
                    <TableHead className="font-semibold text-foreground py-4">Date</TableHead>
                    <TableHead className="font-semibold text-foreground py-4 text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order, index) => (
                    <TableRow key={order.id} className="hover:bg-muted/20 border-b border-border/30 transition-colors duration-150">
                      <TableCell className="py-4">
                        <code className="bg-muted/50 px-2 py-1 rounded text-sm font-mono">
                          {order.order_number}
                        </code>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="font-medium text-foreground">
                          {order.customer_name || 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-sm text-muted-foreground">
                          {order.customer_email || 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="max-w-xs space-y-1">
                          {Array.isArray(order.items) ? order.items.map((item: any, idx: number) => (
                            <div key={idx} className="text-sm bg-muted/40 px-2 py-1 rounded border text-foreground">
                              <span className="font-medium">{item.name}</span>
                              <span className="text-muted-foreground"> × {item.quantity}</span>
                            </div>
                          )) : (
                            <span className="text-muted-foreground text-sm">No items</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                         <div className="max-w-xs text-sm text-muted-foreground">
                           {order.shipping_address ? (
                             <div className="space-y-1 p-2 bg-muted/30 rounded border border-border/40 relative group">
                               <Button 
                                 variant="ghost" 
                                 size="sm" 
                                 onClick={() => openEditAddress(order)}
                                 className="absolute -top-1 -right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-primary/10 hover:bg-primary/20"
                               >
                                 <Edit className="w-3 h-3" />
                               </Button>
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
                               <Button 
                                 variant="ghost" 
                                 size="sm" 
                                 onClick={() => openEditAddress(order)}
                                 className="ml-2 h-6 w-6 p-0"
                               >
                                 <Plus className="w-3 h-3" />
                               </Button>
                             </div>
                           )}
                         </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="font-semibold text-lg text-foreground">
                          ₹{Number(order.total_amount).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge className={`${getStatusColor(order.status)} gap-1 capitalize font-medium`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
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
                <div className="inline-flex p-4 bg-muted/30 rounded-lg mb-4">
                  <Package className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
                <p className="text-sm text-muted-foreground">
                  {statusFilter === 'all' ? 'No orders have been placed yet.' : `No ${statusFilter} orders found.`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Address Edit Dialog */}
        <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Shipping Address</DialogTitle>
              <DialogDescription>
                Update the shipping address with separate fields for each component.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={addressForm.first_name}
                    onChange={(e) => setAddressForm(prev => ({ ...prev, first_name: e.target.value }))}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={addressForm.last_name}
                    onChange={(e) => setAddressForm(prev => ({ ...prev, last_name: e.target.value }))}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address_line_1">Address Line 1</Label>
                <Input
                  id="address_line_1"
                  value={addressForm.address_line_1}
                  onChange={(e) => setAddressForm(prev => ({ ...prev, address_line_1: e.target.value }))}
                  placeholder="House number, street name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address_line_2">Address Line 2 (Optional)</Label>
                <Input
                  id="address_line_2"
                  value={addressForm.address_line_2}
                  onChange={(e) => setAddressForm(prev => ({ ...prev, address_line_2: e.target.value }))}
                  placeholder="Apartment, suite, building"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Enter city"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="Enter state"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postal_code">PIN Code</Label>
                  <Input
                    id="postal_code"
                    value={addressForm.postal_code}
                    onChange={(e) => setAddressForm(prev => ({ ...prev, postal_code: e.target.value }))}
                    placeholder="6-digit PIN code"
                    maxLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={addressForm.country}
                    onChange={(e) => setAddressForm(prev => ({ ...prev, country: e.target.value }))}
                    placeholder="Enter country"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={addressForm.phone}
                  onChange={(e) => setAddressForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="10-digit phone number"
                  maxLength={10}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddressDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => editingOrder && updateShippingAddress(editingOrder.id)}>
                Update Address
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default AdminDashboard