import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import ProductCard from '@/components/ui/ProductCard'
import { User, Package, Heart, MapPin, Settings, LogOut, ShoppingBag, Phone, Mail, Edit, Trash2, Plus, Eye } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { featuredProducts } from '@/data/products'
import { spareProducts } from '@/data/spareProducts'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [addresses, setAddresses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  
  // Profile editing state
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    phone: ''
  })
  
  // Address management state
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<any>(null)
  const [addressForm, setAddressForm] = useState({
    title: '',
    first_name: '',
    last_name: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India',
    is_default: false
  })
  
  // Password change state
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  
  // Order details state
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  
  const { user, signOut } = useAuth()
  const { wishlistItems } = useWishlist()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      fetchUserProfile()
      fetchUserOrders()
      fetchUserAddresses()
    }
  }, [user])

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      setProfile(data)
      if (data) {
        setProfileData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone: data.phone || ''
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      toast({
        title: 'Error',
        description: 'Failed to load profile data',
        variant: 'destructive',
      })
    }
  }

  const fetchUserOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const fetchUserAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', user?.id)
        .order('is_default', { ascending: false })

      if (error) throw error

      setAddresses(data || [])
    } catch (error) {
      console.error('Error fetching addresses:', error)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user?.id,
          ...profileData,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' })

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })

      fetchUserProfile()
      setShowEditProfile(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    setUpdating(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      })

      if (error) throw error

      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      })

      setPasswordData({ newPassword: '', confirmPassword: '' })
      setShowPasswordForm(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  const saveAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)

    try {
      if (editingAddress) {
        const { error } = await supabase
          .from('user_addresses')
          .update({ ...addressForm, updated_at: new Date().toISOString() })
          .eq('id', editingAddress.id)

        if (error) throw error
        
        toast({
          title: "Address updated",
          description: "Your address has been updated successfully.",
        })
      } else {
        const { error } = await supabase
          .from('user_addresses')
          .insert({ 
            ...addressForm, 
            user_id: user?.id,
          })

        if (error) throw error
        
        toast({
          title: "Address added",
          description: "Your address has been added successfully.",
        })
      }

      fetchUserAddresses()
      setShowAddressForm(false)
      setEditingAddress(null)
      resetAddressForm()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  const deleteAddress = async (addressId: string) => {
    try {
      const { error } = await supabase
        .from('user_addresses')
        .delete()
        .eq('id', addressId)

      if (error) throw error

      toast({
        title: "Address deleted",
        description: "Your address has been deleted successfully.",
      })

      fetchUserAddresses()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const editAddress = (address: any) => {
    setAddressForm({
      ...address,
      address_line_2: address.address_line_2 || ''
    })
    setEditingAddress(address)
    setShowAddressForm(true)
  }

  const resetAddressForm = () => {
    setAddressForm({
      title: '',
      first_name: '',
      last_name: '',
      phone: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'India',
      is_default: false
    })
  }

  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {profile?.first_name && profile?.last_name 
                          ? `${profile.first_name} ${profile.last_name}` 
                          : user?.email}
                      </h3>
                      <p className="text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <p className="text-sm text-muted-foreground">
                        {profile?.first_name || 'Not set'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <p className="text-sm text-muted-foreground">
                        {profile?.last_name || 'Not set'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <p className="text-sm text-muted-foreground">
                        {profile?.phone || 'Not set'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <Button onClick={() => setShowEditProfile(true)} className="mb-4">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    
                    <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={updateProfile} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="first_name">First Name</Label>
                              <Input
                                id="first_name"
                                value={profileData.first_name}
                                onChange={(e) => setProfileData({...profileData, first_name: e.target.value})}
                                placeholder="Enter first name"
                              />
                            </div>
                            <div>
                              <Label htmlFor="last_name">Last Name</Label>
                              <Input
                                id="last_name"
                                value={profileData.last_name}
                                onChange={(e) => setProfileData({...profileData, last_name: e.target.value})}
                                placeholder="Enter last name"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                              placeholder="Enter phone number"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setShowEditProfile(false)}>
                              Cancel
                            </Button>
                            <Button type="submit" disabled={updating}>
                              {updating ? 'Updating...' : 'Update Profile'}
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )

      case 'orders':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your past orders and their status</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <div className="animate-pulse border rounded-lg p-4">
                    <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/3"></div>
                  </div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No orders yet</h3>
                  <p className="text-muted-foreground">When you place orders, they'll appear here.</p>
                  <Button className="mt-4" onClick={() => navigate('/shop')}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <ShoppingBag className="w-4 h-4" />
                          <span className="font-medium">Order {order.order_number}</span>
                        </div>
                        <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">₹{order.total_amount}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewOrderDetails(order)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
               )}
              
              {/* Order Details Dialog */}
              <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Order Details - {selectedOrder?.order_number}</DialogTitle>
                  </DialogHeader>
                  {selectedOrder && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Order Status</Label>
                          <Badge className="mt-1">{selectedOrder.status}</Badge>
                        </div>
                        <div>
                          <Label>Order Date</Label>
                          <p className="mt-1 text-sm">{new Date(selectedOrder.created_at).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <Label>Total Amount</Label>
                          <p className="mt-1 text-lg font-semibold">₹{selectedOrder.total_amount}</p>
                        </div>
                        <div>
                          <Label>Payment Status</Label>
                          <p className="mt-1 text-sm">Completed</p>
                        </div>
                      </div>
                      
                      {selectedOrder.items && (
                        <div>
                          <Label>Items</Label>
                          <div className="mt-2 space-y-2">
                            {selectedOrder.items.map((item: any, index: number) => (
                              <div key={index} className="flex justify-between items-center p-2 border rounded">
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-semibold">₹{item.price * item.quantity}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {selectedOrder.shipping_address && (
                        <div>
                          <Label>Shipping Address</Label>
                          <div className="mt-2 p-3 bg-muted rounded">
                            <p className="font-medium">{selectedOrder.shipping_address.first_name} {selectedOrder.shipping_address.last_name}</p>
                            <p>{selectedOrder.shipping_address.address_line_1}</p>
                            {selectedOrder.shipping_address.address_line_2 && <p>{selectedOrder.shipping_address.address_line_2}</p>}
                            <p>{selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state} {selectedOrder.shipping_address.postal_code}</p>
                            <p>{selectedOrder.shipping_address.country}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </DialogContent>
              </Dialog>
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
              {wishlistItems.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Your wishlist is empty</h3>
                  <p className="text-muted-foreground">Save items you love to view them later.</p>
                  <Button className="mt-4" onClick={() => navigate('/shop')}>
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((productId: string) => {
                    // Find product in featured products or spare products
                    const product = [...featuredProducts, ...spareProducts].find(p => p.id === productId)
                    return product ? (
                      <ProductCard key={product.id} product={product} />
                    ) : null
                  })}
                </div>
              )}
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
              <div className="mb-4">
                <Button onClick={() => setShowAddressForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Address
                </Button>
              </div>
              
              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No addresses saved</h3>
                  <p className="text-muted-foreground">Add delivery addresses for faster checkout.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address: any) => (
                    <div key={address.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{address.title}</h4>
                            {address.is_default && <Badge variant="secondary">Default</Badge>}
                          </div>
                          <p className="text-sm">{address.first_name} {address.last_name}</p>
                          <p className="text-sm text-muted-foreground">{address.phone}</p>
                          <p className="text-sm text-muted-foreground">
                            {address.address_line_1}
                            {address.address_line_2 && `, ${address.address_line_2}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {address.city}, {address.state} {address.postal_code}
                          </p>
                          <p className="text-sm text-muted-foreground">{address.country}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => editAddress(address)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => deleteAddress(address.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Address Form Dialog */}
              <Dialog open={showAddressForm} onOpenChange={setShowAddressForm}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={saveAddress} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Address Title</Label>
                        <Input
                          id="title"
                          value={addressForm.title}
                          onChange={(e) => setAddressForm({...addressForm, title: e.target.value})}
                          placeholder="Home, Office, etc."
                          required
                        />
                      </div>
                      <div></div>
                      <div>
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                          id="first_name"
                          value={addressForm.first_name}
                          onChange={(e) => setAddressForm({...addressForm, first_name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                          id="last_name"
                          value={addressForm.last_name}
                          onChange={(e) => setAddressForm({...addressForm, last_name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="address_line_1">Address Line 1</Label>
                        <Input
                          id="address_line_1"
                          value={addressForm.address_line_1}
                          onChange={(e) => setAddressForm({...addressForm, address_line_1: e.target.value})}
                          placeholder="Street, house/flat number"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="address_line_2">Address Line 2 (Optional)</Label>
                        <Input
                          id="address_line_2"
                          value={addressForm.address_line_2}
                          onChange={(e) => setAddressForm({...addressForm, address_line_2: e.target.value})}
                          placeholder="Landmark, area"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={addressForm.state}
                          onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="postal_code">Postal Code</Label>
                        <Input
                          id="postal_code"
                          value={addressForm.postal_code}
                          onChange={(e) => setAddressForm({...addressForm, postal_code: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={addressForm.country}
                          onChange={(e) => setAddressForm({...addressForm, country: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setShowAddressForm(false)
                          setEditingAddress(null)
                          resetAddressForm()
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={updating}>
                        {updating ? 'Saving...' : editingAddress ? 'Update Address' : 'Save Address'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
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
                <h4 className="font-medium">Security</h4>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowPasswordForm(true)}
                >
                  Change Password
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
              
              {/* Password Change Dialog */}
              <Dialog open={showPasswordForm} onOpenChange={setShowPasswordForm}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={changePassword} className="space-y-4">
                    <div>
                      <Label htmlFor="new_password">New Password</Label>
                      <Input
                        id="new_password"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        placeholder="Enter new password"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm_password">Confirm Password</Label>
                      <Input
                        id="confirm_password"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        placeholder="Confirm new password"
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setShowPasswordForm(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={updating}>
                        {updating ? 'Updating...' : 'Change Password'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
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