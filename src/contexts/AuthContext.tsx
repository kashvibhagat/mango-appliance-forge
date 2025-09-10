import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { toast } from '@/components/ui/use-toast'
import { securityLogger, authRateLimiter } from '@/utils/securityUtils'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, userData?: any) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, userData?: any) => {
    // Check rate limiting
    if (!authRateLimiter.isAllowed(`signup:${email}`, 3, 60 * 60 * 1000)) {
      const message = 'Too many signup attempts. Please try again later.'
      toast({
        title: 'Rate limited',
        description: message,
        variant: 'destructive',
      })
      securityLogger.logEvent({
        type: 'failed_signup',
        email
      })
      throw new Error(message)
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/`,
        },
      })

      if (error) throw error

      // Reset rate limiter on success
      authRateLimiter.reset(`signup:${email}`)
      
      toast({
        title: 'Account created successfully!',
        description: 'Please check your email to verify your account.',
      })
    } catch (error) {
      const authError = error as AuthError
      
      securityLogger.logEvent({
        type: 'failed_signup',
        email
      })
      
      toast({
        title: 'Error creating account',
        description: authError.message,
        variant: 'destructive',
      })
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    // Check rate limiting
    if (!authRateLimiter.isAllowed(`login:${email}`, 5, 15 * 60 * 1000)) {
      const remaining = authRateLimiter.getRemainingAttempts(`login:${email}`, 5)
      const message = `Too many failed login attempts. Please try again in 15 minutes. (${remaining} attempts remaining)`
      
      toast({
        title: 'Rate limited',
        description: message,
        variant: 'destructive',
      })
      
      securityLogger.logEvent({
        type: 'failed_login',
        email
      })
      
      throw new Error(message)
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Reset rate limiter on success
      authRateLimiter.reset(`login:${email}`)
      
      securityLogger.logEvent({
        type: 'successful_login',
        email
      })

      toast({
        title: 'Welcome back!',
        description: 'You have been signed in successfully.',
      })
    } catch (error) {
      const authError = error as AuthError
      
      securityLogger.logEvent({
        type: 'failed_login',
        email
      })
      
      const message = authError.message?.toLowerCase().includes('email not confirmed')
        ? 'Please confirm your email via the verification link we sent. For testing, you can disable email confirmation in Supabase Auth settings.'
        : authError.message
      
      toast({
        title: 'Error signing in',
        description: message,
        variant: 'destructive',
      })
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
      })
    } catch (error) {
      const authError = error as AuthError
      toast({
        title: 'Error signing out',
        description: authError.message,
        variant: 'destructive',
      })
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      securityLogger.logEvent({
        type: 'password_reset',
        email
      })

      toast({
        title: 'Password reset email sent',
        description: 'Please check your email for password reset instructions.',
      })
    } catch (error) {
      const authError = error as AuthError
      toast({
        title: 'Error sending reset email',
        description: authError.message,
        variant: 'destructive',
      })
      throw error
    }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}