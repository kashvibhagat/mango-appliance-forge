import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Rate limiting - max 5 attempts
    if (attempts >= 5) {
      setError('Too many failed attempts. Please wait 15 minutes before trying again.');
      setLoading(false);
      return;
    }

    // Validate exact credentials
    const validEmail = 'DoNotReply@mangoappliances.com';
    const validPassword = 'Mango@123';

    if (credentials.email !== validEmail || credentials.password !== validPassword) {
      setAttempts(prev => prev + 1);
      setError('Invalid credentials – Access Denied');
      setLoading(false);
      
      // Clear form after failed attempt
      setTimeout(() => {
        setCredentials({ email: '', password: '' });
      }, 1000);
      
      return;
    }

    // Success - store admin session
    sessionStorage.setItem('adminAuth', 'authenticated');
    sessionStorage.setItem('adminLoginTime', Date.now().toString());
    
    toast({
      title: 'Admin Access Granted',
      description: 'Welcome to the Admin Dashboard',
    });

    navigate('/admin');
    setLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
    setError(''); // Clear error when user starts typing
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <CardDescription>
            Enter your administrative credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {attempts >= 3 && attempts < 5 && (
              <Alert>
                <AlertDescription>
                  Warning: {5 - attempts} attempts remaining before lockout
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={credentials.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter admin email"
                required
                disabled={loading}
                className="transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter admin password"
                  required
                  disabled={loading}
                  className="pr-10 transition-colors"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={loading || attempts >= 5}
            >
              {loading ? 'Authenticating...' : 'Access Dashboard'}
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>This is a secure administrative area.</p>
              <p>Unauthorized access is prohibited.</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;