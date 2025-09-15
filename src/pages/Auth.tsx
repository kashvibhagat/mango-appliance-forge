import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { LoginForm } from '@/components/auth/LoginForm'
import { RegisterForm } from '@/components/auth/RegisterForm'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && user) {
      // Special redirect for specific user
      if (user.email === 'DoNotReply@mangoappliances.com') {
        navigate('/blank', { replace: true })
        return
      }
      
      const from = (location.state as any)?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
  }, [user, loading, navigate, location])

  const handleSuccess = () => {
    // Special redirect for specific user
    if (user?.email === 'DoNotReply@mangoappliances.com') {
      navigate('/blank', { replace: true })
      return
    }
    
    const from = (location.state as any)?.from?.pathname || '/'
    navigate(from, { replace: true })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (user) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm
            onToggleMode={() => setIsLogin(false)}
            onSuccess={handleSuccess}
          />
        ) : (
          <RegisterForm
            onToggleMode={() => setIsLogin(true)}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  )
}

export default Auth