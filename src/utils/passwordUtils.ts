export interface PasswordStrength {
  score: number
  feedback: string[]
  isStrong: boolean
}

export const checkPasswordStrength = (password: string): PasswordStrength => {
  const feedback: string[] = []
  let score = 0

  // Length check
  if (password.length >= 8) {
    score += 1
  } else {
    feedback.push('Use at least 8 characters')
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Include uppercase letters')
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Include lowercase letters')
  }

  // Number check
  if (/\d/.test(password)) {
    score += 1
  } else {
    feedback.push('Include numbers')
  }

  // Special character check
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 1
  } else {
    feedback.push('Include special characters')
  }

  // Common patterns check
  if (password.toLowerCase().includes('password') || 
      password.toLowerCase().includes('123456') ||
      /(.)\1{2,}/.test(password)) {
    score -= 1
    feedback.push('Avoid common patterns')
  }

  const isStrong = score >= 4 && feedback.length === 0

  return {
    score: Math.max(0, Math.min(5, score)),
    feedback,
    isStrong
  }
}

export const getStrengthColor = (score: number): string => {
  switch (score) {
    case 0:
    case 1:
      return 'bg-destructive'
    case 2:
      return 'bg-orange-500'
    case 3:
      return 'bg-yellow-500'
    case 4:
      return 'bg-blue-500'
    case 5:
      return 'bg-green-500'
    default:
      return 'bg-muted'
  }
}

export const getStrengthText = (score: number): string => {
  switch (score) {
    case 0:
    case 1:
      return 'Very Weak'
    case 2:
      return 'Weak'
    case 3:
      return 'Fair'
    case 4:
      return 'Strong'
    case 5:
      return 'Very Strong'
    default:
      return 'Unknown'
  }
}