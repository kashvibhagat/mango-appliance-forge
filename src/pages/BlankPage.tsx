import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
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
  Search,
  Eye,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  RefreshCw,
  Download,
  Bell
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

// Mock data for demonstration
const mockOrders = [
  {
    id: '1',
    order_number: 'ORD-2024-001',
    status: 'pending',
    total_amount: 2599,
    customer_name: 'Rajesh Kumar',
    customer_email: 'rajesh@example.com',
    created_at: '2024-01-15T10:30:00Z',
    items: [
      { name: 'Organic Basmati Rice', quantity: 2 },
      { name: 'Pure Ghee', quantity: 1 }
    ],
    shipping_address: {
      title: 'Mr.',
      first_name: 'Rajesh',
      last_name: 'Kumar',
      address: '123, MG Road, Sector 14',
      city: 'Gurgaon',
      state: 'Haryana',
      postal_code: '122001',
      country: 'India',
      phone: '+91 98765 43210'
    }
  },
  {
    id: '2',
    order_number: 'ORD-2024-002',
    status: 'delivered',
    total_amount: 1850,
    customer_name: 'Priya Sharma',
    customer_email: 'priya.s@example.com',
    created_at: '2024-01-14T14:20:00Z',
    items: [
      { name: 'Organic Honey', quantity: 3 }
    ],
    shipping_address: {
      title: 'Ms.',
      first_name: 'Priya',
      last_name: 'Sharma',
      address: '456, Park Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      postal_code: '400001',
      country: 'India',
      phone: '+91 87654 32109'
    }
  },
  {
    id: '3',
    order_number: 'ORD-2024-003',
    status: 'shipped',
    total_amount: 4200,
    customer_name: 'Amit Patel',
    customer_email: 'amit.patel@example.com',
    created_at: '2024-01-13T09:15:00Z',
    items: [
      { name: 'Premium Tea Set', quantity: 1 },
      { name: 'Organic Spices Kit', quantity: 2 }
    ],
    shipping_address: {
      title: 'Mr.',
      first_name: 'Amit',
      last_name: 'Patel',
      address: '789, Gandhi Nagar',
      city: 'Ahmedabad',
      state: 'Gujarat',
      postal_code: '380001',
      country: 'India',
      phone: '+91 76543 21098'
    }
  }
]

const AdminDashboard = () => {
  const [orders, setOrders] = useState(mockOrders)
  const [loading, setLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Calculate stats
  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + Number(order.total_amount), 0),
    pendingOrders: orders.filter(order => order.status === 'pending').length,
    completedOrders: orders.filter(order => order.status === 'delivered').length
  }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const getStatusConfig = (status) => {
    const configs = {
      pending: { 
        color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100', 
        icon: Clock,
        dot: 'bg-amber-400'
      },
      confirmed: { 
        color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100', 
        icon: CheckCircle,
        dot: 'bg-blue-400'
      },
      shipped: { 
        color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100', 
        icon: Package,
        dot: 'bg-purple-400'
      },
      delivered: { 
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100', 
        icon: CheckCircle,
        dot: 'bg-emerald-400'
      },
      cancelled: { 
        color: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100', 
        icon: AlertCircle,
        dot: 'bg-red-400'
      }
    }
    return configs[status] || configs.pending
  }

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesSearch = searchQuery === '' || 
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesStatus && matchesSearch
  })

  // Stats cards configuration
  const statsCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      change: '+12%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      change: '+8.2%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      change: '-3%',
      changeType: 'negative',
      icon: Clock,
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Completed Orders',
      value: stats.completedOrders,
      change: '+15%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'from-violet-500 to-purple-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto max-w-7xl p-6 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Welcome back! Here's what's happening with your business today.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <div className="relative">
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      stat.changeType === 'positive' 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {stat.changeType === 'positive' ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5`}></div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">New Customers</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">24 this week</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Growth Rate</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">+12% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">This Month</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">156 orders processed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Management Section */}
        <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
          <CardHeader className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-blue-50/50 dark:from-slate-800 dark:to-slate-700/50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900 dark:text-white">Orders Management</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Track and manage all customer orders efficiently
                  </CardDescription>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 min-w-[120px]">
                      <Filter className="w-4 h-4" />
                      {statusFilter === 'all' ? 'All Status' : statusFilter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                      All Status
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        Pending
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('confirmed')}>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        Confirmed
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('shipped')}>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        Shipped
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('delivered')}>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        Delivered
                      </div>
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
                  <TableRow className="bg-slate-50/50 dark:bg-slate-800/50">
                    <TableHead className="font-semibold">Order</TableHead>
                    <TableHead className="font-semibold">Customer</TableHead>
                    <TableHead className="font-semibold">Items</TableHead>
                    <TableHead className="font-semibold">Address</TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const statusConfig = getStatusConfig(order.status)
                    const StatusIcon = statusConfig.icon
                    
                    return (
                      <TableRow key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-mono text-sm font-medium text-slate-900 dark:text-white">
                              {order.order_number}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              ID: {order.id}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium text-slate-900 dark:text-white text-sm">
                              {order.customer_name}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">
                              {order.customer_email}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <span className="text-slate-900 dark:text-white truncate max-w-[120px]">
                                  {item.name}
                                </span>
                                <span className="text-slate-500 dark:text-slate-400 ml-2 flex-shrink-0">
                                  ×{item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="max-w-xs">
                            {order.shipping_address ? (
                              <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
                                <div className="font-medium text-slate-900 dark:text-white text-sm">
                                  {order.shipping_address.title} {order.shipping_address.first_name} {order.shipping_address.last_name}
                                </div>
                                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                                  <div>{order.shipping_address.address}</div>
                                  <div>{order.shipping_address.city}, {order.shipping_address.state}</div>
                                  <div>{order.shipping_address.postal_code}, {order.shipping_address.country}</div>
                                  <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                                    📞 {order.shipping_address.phone}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-2 px-3 bg-slate-100 dark:bg-slate-700 rounded border border-dashed border-slate-300 dark:border-slate-600">
                                <span className="text-xs text-slate-500 dark:text-slate-400">No address</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <span className="font-bold text-lg text-slate-900 dark:text-white">
                            ₹{Number(order.total_amount).toLocaleString()}
                          </span>
                        </TableCell>
                        
                        <TableCell>
                          <Badge className={`${statusConfig.color} gap-2 capitalize font-medium px-3 py-1 transition-colors`}>
                            <div className={`w-2 h-2 ${statusConfig.dot} rounded-full`}></div>
                            {order.status}
                          </Badge>
                        </TableCell>
                        
                        <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                          {new Date(order.created_at).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                              <Eye className="w-3 h-3" />
                              View
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'confirmed')} className="gap-2">
                                  <CheckCircle className="w-4 h-4" />
                                  Mark as Confirmed
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'shipped')} className="gap-2">
                                  <Package className="w-4 h-4" />
                                  Mark as Shipped
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'delivered')} className="gap-2">
                                  <CheckCircle className="w-4 h-4" />
                                  Mark as Delivered
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'cancelled')} className="gap-2 text-red-600 focus:text-red-600">
                                  <AlertCircle className="w-4 h-4" />
                                  Cancel Order
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
            
            {filteredOrders.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No orders found</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  {statusFilter === 'all' 
                    ? searchQuery 
                      ? `No orders match your search for "${searchQuery}"`
                      : 'No orders have been placed yet.' 
                    : `No ${statusFilter} orders found.`}
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