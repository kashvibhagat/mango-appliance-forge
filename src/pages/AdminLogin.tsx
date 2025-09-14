import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { AdminLoginForm } from '@/components/auth/AdminLoginForm'

const AdminLogin = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // If user is already logged in with admin credentials, redirect to admin dashboard
    if (!loading && user && user.email === 'DoNotReply@mangoappliances.com') {
      navigate('/admin', { replace: true })
    }
  }, [user, loading, navigate])

  const handleSuccess = () => {
    navigate('/admin', { replace: true })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If already logged in as admin, redirect
  if (user && user.email === 'DoNotReply@mangoappliances.com') {
    return null // Will redirect via useEffect
  }

  return <AdminLoginForm onSuccess={handleSuccess} />
}

export default AdminLogin