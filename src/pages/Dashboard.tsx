import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { User, Package, Heart, Settings, LogOut, ShoppingBag, MapPin, Phone, Mail } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 12999,
      items: ['Mango Personal Air Cooler MC-3050']
    },
    {
      id: 'ORD-002', 
      date: '2024-01-20',
      status: 'Processing',
      total: 8999,
      items: ['Cooler Spare Parts Set']
    }
  ]

  const mockWishlist = [
    { id: 1, name: 'Mango Tower Cooler TC-5000', price: 18999, image: '/src/assets/product-tower-cooler.jpg' },
    { id: 2, name: 'Desert Cooler Pro DC-7500', price: 24999, image: '/src/assets/product-personal-cooler.jpg' }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {user?.user_metadata?.full_name || user?.email}
                  </h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <p className="text-sm text-muted-foreground">
                    {user?.user_metadata?.first_name || 'Not provided'}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <p className="text-sm text-muted-foreground">
                    {user?.user_metadata?.last_name || 'Not provided'}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <p className="text-sm text-muted-foreground">
                    {user?.user_metadata?.phone || 'Not provided'}
                  </p>
                </div>
              </div>
              
              <Button>Edit Profile</Button>
            </CardContent>
          </Card>
        )

      case 'orders':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Track your orders and view purchase history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <ShoppingBag className="w-4 h-4" />
                        <span className="font-medium">{order.id}</span>
                      </div>
                      <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Ordered on {new Date(order.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm mb-2">
                      {order.items.map((item, index) => (
                        <div key={index}>{item}</div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">₹{order.total.toLocaleString()}</span>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case 'wishlist':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
              <CardDescription>Items you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockWishlist.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                    <h4 className="font-medium mb-2">{item.name}</h4>
                    <p className="text-lg font-semibold text-primary mb-3">
                      ₹{item.price.toLocaleString()}
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm">Add to Cart</Button>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case 'addresses':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Saved Addresses</CardTitle>
              <CardDescription>Manage your delivery addresses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge>Home</Badge>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="font-medium">John Doe</div>
                    <div>123 Main Street, Apt 4B</div>
                    <div>New York, NY 10001</div>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Add New Address
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Notifications</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Order updates</span>
                    <Button variant="outline" size="sm">On</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Promotional emails</span>
                    <Button variant="outline" size="sm">Off</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="font-medium">Security</h4>
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Two-Factor Authentication
                </Button>
              </div>
              
              <Separator />
              
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 shrink-0">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">My Account</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-none hover:bg-muted transition-colors ${
                        activeTab === item.id ? 'bg-muted text-primary font-medium' : ''
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default Dashboard