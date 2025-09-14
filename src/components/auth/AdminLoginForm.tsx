import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Shield } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

const adminLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type AdminLoginData = z.infer<typeof adminLoginSchema>

interface AdminLoginFormProps {
  onSuccess?: () => void
}

export const AdminLoginForm = ({ onSuccess }: AdminLoginFormProps) => {
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()

  const form = useForm<AdminLoginData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: AdminLoginData) => {
    // Check exact credentials
    if (data.email !== 'DoNotReply@mangoappliances.com' || data.password !== 'Mango@123') {
      toast({
        title: 'Invalid credentials – Access Denied',
        description: 'The username or password you entered is incorrect.',
        variant: 'destructive'
      })
      return
    }

    setLoading(true)
    try {
      await signIn(data.email, data.password)
      toast({
        title: 'Admin Access Granted',
        description: 'Welcome to Mango Appliances Admin Dashboard',
      })
      onSuccess?.()
    } catch (error) {
      toast({
        title: 'Invalid credentials – Access Denied',
        description: 'Authentication failed. Please check your credentials.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-secondary/10">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Admin Access
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Mango Appliances Administrative Portal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Username</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter admin username" 
                        type="email"
                        className="h-11"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter admin password" 
                        className="h-11"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full h-11 text-base font-medium"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Access Admin Dashboard
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}