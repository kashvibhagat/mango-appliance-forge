interface SecurityEvent {
  type: 'failed_login' | 'successful_login' | 'failed_signup' | 'password_reset'
  email?: string
  timestamp: number
  ip?: string
  userAgent?: string
}

class SecurityLogger {
  private events: SecurityEvent[] = []
  private maxEvents = 100

  logEvent(event: Omit<SecurityEvent, 'timestamp'>) {
    const securityEvent: SecurityEvent = {
      ...event,
      timestamp: Date.now(),
      ip: this.getClientIP(),
      userAgent: navigator.userAgent
    }

    this.events.unshift(securityEvent)
    
    // Keep only the most recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(0, this.maxEvents)
    }

    // Store in localStorage for persistence
    localStorage.setItem('security_events', JSON.stringify(this.events))

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Security Event:', securityEvent)
    }
  }

  private getClientIP(): string {
    // This is a placeholder - in a real app you'd get this from the server
    return 'unknown'
  }

  getRecentEvents(type?: SecurityEvent['type']): SecurityEvent[] {
    return type 
      ? this.events.filter(event => event.type === type)
      : this.events
  }

  getFailedLoginAttempts(email: string, timeWindowMs: number = 15 * 60 * 1000): number {
    const cutoff = Date.now() - timeWindowMs
    return this.events.filter(
      event => 
        event.type === 'failed_login' &&
        event.email === email &&
        event.timestamp > cutoff
    ).length
  }

  isRateLimited(email: string, maxAttempts: number = 5): boolean {
    return this.getFailedLoginAttempts(email) >= maxAttempts
  }
}

export const securityLogger = new SecurityLogger()

// Rate limiting utility
export class RateLimiter {
  private attempts = new Map<string, { count: number; lastAttempt: number }>()

  isAllowed(key: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
    const now = Date.now()
    const record = this.attempts.get(key)

    if (!record || now - record.lastAttempt > windowMs) {
      this.attempts.set(key, { count: 1, lastAttempt: now })
      return true
    }

    if (record.count >= maxAttempts) {
      return false
    }

    record.count++
    record.lastAttempt = now
    return true
  }

  reset(key: string): void {
    this.attempts.delete(key)
  }

  getRemainingAttempts(key: string, maxAttempts: number = 5): number {
    const record = this.attempts.get(key)
    if (!record) return maxAttempts
    return Math.max(0, maxAttempts - record.count)
  }
}

export const authRateLimiter = new RateLimiter()
