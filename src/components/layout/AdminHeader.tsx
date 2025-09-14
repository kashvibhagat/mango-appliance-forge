import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Shield } from 'lucide-react'

export const AdminHeader = () => {
  return (
    <header className="bg-primary text-primary-foreground py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          <span className="text-sm font-medium">Mango Appliances Admin Portal</span>
        </div>
        <div className="text-xs">
          Secure Administrative Access
        </div>
      </div>
    </header>
  )
}

export default AdminHeader