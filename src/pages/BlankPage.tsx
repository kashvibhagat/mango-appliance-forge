import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { 
  Package, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  Eye, 
  Edit, 
  MoreHorizontal,
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
  MapPin,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  Calendar,
  Hash
} from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface Order {
  id: string
  order_number: string
  status: string
  total_amount: number
  customer_name?: string
  customer_email?: string
  created_at: string
  user_id?: string
  items?: any // Using any for now to handle Json from Supabase
}

interface Customer {
  id: string
  user_id: string
  email: string
  first_name: string
  last_name: string
  phone: string
  total_orders: number
  total_spent: number
  last_order_date: string
  is_blocked: boolean
  addresses?: Address[]
  orders?: Order[]
  profiles?: {
    first_name: string
    last_name: string
    phone: string
  } | null
}

interface Address {
  id: string
  title: string
  first_name: string
  last_name: string
  phone: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  postal_code: string
  country: string
  is_default: boolean
}

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface Stats {
  totalOrders: number
  totalRevenue: number
  totalCustomers: number
  pendingOrders: number
}

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [expandedCustomers, setExpandedCustomers] = useState<Set<string>>(new Set())
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    pendingOrders: 0
  })
  const [loading, setLoading] = useState(true)
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

      // Fetch customers with their profiles (handle optional profiles)
      const { data: customersData, error: customersError } = await supabase
        .from('customers')
        .select(`
          *,
          profiles(first_name, last_name, phone)
        `)
        .order('created_at', { ascending: false })

      if (customersError) throw customersError

      setOrders((ordersData || []).map(order => ({
        ...order,
        items: order.items || []
      })))
      setCustomers((customersData || []).map(customer => ({
        ...customer,
        profiles: Array.isArray(customer.profiles) && customer.profiles.length > 0 
          ? customer.profiles[0] 
          : null
      })))

      // Calculate stats
      if (ordersData) {
        const totalRevenue = ordersData.reduce((sum, order) => sum + Number(order.total_amount), 0)
        const pendingOrders = ordersData.filter(order => order.status === 'pending').length
        
        setStats({
          totalOrders: ordersData.length,
          totalRevenue,
          totalCustomers: customersData?.length || 0,
          pendingOrders
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

  const fetchCustomerDetails = async (customerId: string) => {
    try {
      // Fetch customer addresses
      const { data: addresses, error: addressError } = await supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', customerId)
        .order('is_default', { ascending: false })

      if (addressError) throw addressError

      // Fetch customer orders
      const { data: customerOrders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', customerId)
        .order('created_at', { ascending: false })

      if (ordersError) throw ordersError

      // Update customer data
      setCustomers(prev => prev.map(customer => 
        customer.user_id === customerId 
          ? { 
              ...customer, 
              addresses, 
              orders: (customerOrders || []).map(order => ({
                ...order,
                items: order.items || []
              }))
            }
          : customer
      ))

    } catch (error) {
      console.error('Error fetching customer details:', error)
      toast({
        title: 'Error',
        description: 'Failed to load customer details',
        variant: 'destructive',
      })
    }
  }

  const toggleCustomerExpansion = (customerId: string) => {
    const newExpanded = new Set(expandedCustomers)
    if (newExpanded.has(customerId)) {
      newExpanded.delete(customerId)
    } else {
      newExpanded.add(customerId)
      // Fetch customer details if not already loaded
      const customer = customers.find(c => c.user_id === customerId)
      if (customer && !customer.addresses) {
        fetchCustomerDetails(customerId)
      }
    }
    setExpandedCustomers(newExpanded)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning/10 text-warning border-warning/20'
      case 'confirmed': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'shipped': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'delivered': return 'bg-success/10 text-success border-success/20'
      case 'cancelled': return 'bg-destructive/10 text-destructive border-destructive/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const renderOrderItems = (items: any) => {
    if (!items || !Array.isArray(items)) return 'No items'
    
    return (
      <div className="space-y-2">
        {items.map((item: OrderItem, index: number) => (
          <div key={index} className="flex justify-between text-sm">
            <span>{item.name} x{item.quantity}</span>
            <span>₹{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="skeleton h-4 w-20 mb-2"></div>
                  <div className="skeleton h-8 w-16"></div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="skeleton h-96 w-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your business today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-success/10 rounded-lg">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Customers</p>
                  <p className="text-2xl font-bold">{stats.totalCustomers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Orders</p>
                  <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">Orders Management</TabsTrigger>
            <TabsTrigger value="customers">Customer Management</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Recent Orders
                </CardTitle>
                <CardDescription>
                  Manage and track all customer orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order Number</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.order_number}
                          </TableCell>
                          <TableCell>
                            {order.customer_name || 'N/A'}
                          </TableCell>
                          <TableCell>
                            {order.customer_email || 'N/A'}
                          </TableCell>
                          <TableCell>
                            ₹{Number(order.total_amount).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(order.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'confirmed')}>
                                  Mark as Confirmed
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'shipped')}>
                                  Mark as Shipped
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'delivered')}>
                                  Mark as Delivered
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'cancelled')}>
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Customer Database
                </CardTitle>
                <CardDescription>
                  View and manage all registered customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Total Orders</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead>Last Order</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.map((customer) => (
                        <>
                          <TableRow key={customer.id} className="hover:bg-muted/50">
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleCustomerExpansion(customer.user_id)}
                              >
                                {expandedCustomers.has(customer.user_id) ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </Button>
                            </TableCell>
                            <TableCell className="font-medium">
                              {customer.profiles?.first_name && customer.profiles?.last_name 
                                ? `${customer.profiles.first_name} ${customer.profiles.last_name}` 
                                : customer.first_name && customer.last_name
                                ? `${customer.first_name} ${customer.last_name}`
                                : 'N/A'}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                {customer.email}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                {customer.profiles?.phone || customer.phone || 'N/A'}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{customer.total_orders || 0}</Badge>
                            </TableCell>
                            <TableCell className="font-semibold">
                              ₹{Number(customer.total_spent || 0).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {customer.last_order_date ? (
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  {new Date(customer.last_order_date).toLocaleDateString()}
                                </div>
                              ) : (
                                'Never'
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant={customer.is_blocked ? 'destructive' : 'default'}>
                                {customer.is_blocked ? 'Blocked' : 'Active'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                      setSelectedCustomer(customer)
                                      if (!customer.addresses) {
                                        fetchCustomerDetails(customer.user_id)
                                      }
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                      <Users className="h-5 w-5" />
                                      Customer Details: {customer.profiles?.first_name} {customer.profiles?.last_name}
                                    </DialogTitle>
                                  </DialogHeader>
                                  {selectedCustomer && selectedCustomer.user_id === customer.user_id && (
                                    <div className="space-y-6">
                                      {/* Customer Info */}
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg">Contact Information</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-2 gap-4">
                                          <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p className="font-medium">{customer.email}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm text-muted-foreground">Phone</p>
                                            <p className="font-medium">{customer.profiles?.phone || 'N/A'}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm text-muted-foreground">Total Orders</p>
                                            <p className="font-medium">{customer.total_orders}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm text-muted-foreground">Total Spent</p>
                                            <p className="font-medium">₹{Number(customer.total_spent).toLocaleString()}</p>
                                          </div>
                                        </CardContent>
                                      </Card>

                                      {/* Addresses */}
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg flex items-center gap-2">
                                            <MapPin className="h-5 w-5" />
                                            Saved Addresses ({customer.addresses?.length || 0})
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          {customer.addresses && customer.addresses.length > 0 ? (
                                            <div className="space-y-4">
                                              {customer.addresses.map((address) => (
                                                <div key={address.id} className="border rounded-lg p-4">
                                                  <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-medium">{address.title}</h4>
                                                    {address.is_default && (
                                                      <Badge variant="outline">Default</Badge>
                                                    )}
                                                  </div>
                                                  <div className="text-sm text-muted-foreground space-y-1">
                                                    <p>{address.first_name} {address.last_name}</p>
                                                    <p>{address.phone}</p>
                                                    <p>{address.address_line_1}</p>
                                                    {address.address_line_2 && <p>{address.address_line_2}</p>}
                                                    <p>{address.city}, {address.state} {address.postal_code}</p>
                                                    <p>{address.country}</p>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          ) : (
                                            <p className="text-muted-foreground">No addresses saved</p>
                                          )}
                                        </CardContent>
                                      </Card>

                                      {/* Order History */}
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg flex items-center gap-2">
                                            <Package className="h-5 w-5" />
                                            Order History ({customer.orders?.length || 0})
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          {customer.orders && customer.orders.length > 0 ? (
                                            <div className="space-y-4">
                                              {customer.orders.map((order) => (
                                                <div key={order.id} className="border rounded-lg p-4">
                                                  <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-2">
                                                      <Hash className="h-4 w-4 text-muted-foreground" />
                                                      <span className="font-medium">{order.order_number}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                      <Badge className={getStatusColor(order.status)}>
                                                        {order.status}
                                                      </Badge>
                                                      <span className="text-sm text-muted-foreground">
                                                        {new Date(order.created_at).toLocaleDateString()}
                                                      </span>
                                                    </div>
                                                  </div>
                                                  
                                                  <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                      <p className="text-sm text-muted-foreground mb-2">Items Purchased:</p>
                                                      {renderOrderItems(order.items)}
                                                    </div>
                                                    <div>
                                                      <div className="text-right">
                                                        <p className="text-sm text-muted-foreground">Total Amount</p>
                                                        <p className="text-lg font-bold">₹{Number(order.total_amount).toLocaleString()}</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          ) : (
                                            <p className="text-muted-foreground">No orders found</p>
                                          )}
                                        </CardContent>
                                      </Card>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                          
                          {/* Expanded Row Content */}
                          {expandedCustomers.has(customer.user_id) && (
                            <TableRow>
                              <TableCell colSpan={9} className="p-0">
                                <div className="bg-muted/30 p-6 space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Quick Stats */}
                                    <Card>
                                      <CardHeader className="pb-3">
                                        <CardTitle className="text-base">Quick Overview</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-2">
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Total Orders:</span>
                                          <span className="font-medium">{customer.total_orders || 0}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Total Spent:</span>
                                          <span className="font-medium">₹{Number(customer.total_spent || 0).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Addresses Saved:</span>
                                          <span className="font-medium">{customer.addresses?.length || 0}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Account Status:</span>
                                          <Badge variant={customer.is_blocked ? 'destructive' : 'default'} className="text-xs">
                                            {customer.is_blocked ? 'Blocked' : 'Active'}
                                          </Badge>
                                        </div>
                                      </CardContent>
                                    </Card>

                                    {/* Recent Orders Preview */}
                                    <Card>
                                      <CardHeader className="pb-3">
                                        <CardTitle className="text-base">Recent Orders</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        {customer.orders && customer.orders.length > 0 ? (
                                          <div className="space-y-2">
                                            {customer.orders.slice(0, 3).map((order) => (
                                              <div key={order.id} className="flex justify-between items-center text-sm">
                                                <div className="flex items-center gap-2">
                                                  <span className="font-medium">{order.order_number}</span>
                                                  <Badge className={`${getStatusColor(order.status)} text-xs`}>
                                                    {order.status}
                                                  </Badge>
                                                </div>
                                                <span className="font-medium">₹{Number(order.total_amount).toLocaleString()}</span>
                                              </div>
                                            ))}
                                            {customer.orders.length > 3 && (
                                              <p className="text-xs text-muted-foreground mt-2">
                                                +{customer.orders.length - 3} more orders
                                              </p>
                                            )}
                                          </div>
                                        ) : (
                                          <p className="text-muted-foreground text-sm">No orders yet</p>
                                        )}
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AdminDashboard