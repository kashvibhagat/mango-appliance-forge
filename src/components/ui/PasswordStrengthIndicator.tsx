import { Progress } from '@/components/ui/progress'
import { checkPasswordStrength, getStrengthColor, getStrengthText } from '@/utils/passwordUtils'

interface PasswordStrengthIndicatorProps {
  password: string
  className?: string
}

export const PasswordStrengthIndicator = ({ password, className }: PasswordStrengthIndicatorProps) => {
  const strength = checkPasswordStrength(password)
  
  if (!password) return null

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Password strength:</span>
        <span className={`text-xs font-medium ${strength.isStrong ? 'text-green-600' : 'text-muted-foreground'}`}>
          {getStrengthText(strength.score)}
        </span>
      </div>
      
      <div className="relative">
        <Progress value={(strength.score / 5) * 100} className="h-2" />
        <div 
          className={`absolute inset-0 h-2 rounded-full transition-all ${getStrengthColor(strength.score)}`}
          style={{ width: `${(strength.score / 5) * 100}%` }}
        />
      </div>
      
      {strength.feedback.length > 0 && (
        <ul className="text-xs text-muted-foreground space-y-1">
          {strength.feedback.map((item, index) => (
            <li key={index} className="flex items-center gap-1">
              <span className="w-1 h-1 bg-muted-foreground rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}