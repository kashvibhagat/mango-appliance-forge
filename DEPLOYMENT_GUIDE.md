# 🚀 Professional Subdomain Deployment Guide
## Mango Appliances E-Commerce & Admin Dashboard

This guide explains how to deploy the Mango Appliances e-commerce platform with a professional subdomain architecture where the admin dashboard is completely separated from the customer-facing website.

## 🌐 Architecture Overview

### Domain Structure
- **Customer Site**: `https://www.mangocoolers.com`
  - Public e-commerce website
  - Product catalog, shopping cart, checkout
  - Customer warranty registration & complaints
  - Customer authentication

- **Admin Dashboard**: `https://admin.mangocoolers.com`
  - Secure admin interface
  - Order management & analytics
  - Customer management
  - Product inventory management
  - Complaint & warranty management
  - System settings & email notifications

### Key Features
- ✅ **Shared Backend**: Both frontends use the same Supabase backend
- ✅ **Role-Based Access Control**: Admin routes only accessible to admin users
- ✅ **Domain-Based Routing**: Automatic routing based on subdomain
- ✅ **Enhanced Security**: Admin subdomain with additional security layers
- ✅ **Email Notifications**: Automated admin notifications for all activities
- ✅ **Professional UI**: Separate admin interface with dedicated layout

## 🔧 Deployment Steps

### Step 1: Domain Setup in Lovable

1. **Connect Main Domain**:
   - Go to Project Settings → **Domains**
   - Click **Connect Domain**
   - Enter: `mangocoolers.com`
   - Follow DNS setup instructions

2. **Add Admin Subdomain**:
   - In the same domain settings
   - Check "I want to add a subdomain"
   - Enter: `admin.mangocoolers.com`
   - Follow additional DNS instructions

### Step 2: DNS Configuration

Add these DNS records at your domain registrar:

```
# Main domain
Type: A
Name: @
Value: 185.158.133.1

# WWW subdomain
Type: A
Name: www
Value: 185.158.133.1

# Admin subdomain
Type: A
Name: admin
Value: 185.158.133.1
```

### Step 3: SSL Certificate

Lovable automatically provisions SSL certificates for:
- `https://mangocoolers.com`
- `https://www.mangocoolers.com`
- `https://admin.mangocoolers.com`

Wait 24-48 hours for DNS propagation and SSL provisioning.

## 🛡️ Security Features

### Admin Access Control
- **Domain Validation**: Admin routes only accessible from `admin.mangocoolers.com`
- **Role-Based Access**: Database-level admin role verification
- **Enhanced Authentication**: Separate admin authentication flow
- **Session Security**: Secure session management with timeouts

### API Security
- **RLS Policies**: Row-level security for all database operations
- **Admin-Only Endpoints**: Protected admin functions in Supabase Edge Functions
- **CORS Configuration**: Proper CORS headers for subdomain access
- **Input Validation**: Comprehensive input sanitization

## 📧 Email Notification System

### Automated Admin Notifications
- **New Orders**: Complete order details with customer info
- **Complaints**: Instant complaint submission alerts
- **Warranties**: Warranty registration notifications
- **System Events**: Critical system activity alerts

### Email Templates
Professional HTML email templates for:
- Order confirmations
- Complaint status updates
- Warranty approvals
- System notifications

## 🔍 Testing the Setup

### Development Testing
For local development, use query parameters:
- Customer site: `http://localhost:5173/`
- Admin dashboard: `http://localhost:5173/?admin=true`

### Production Testing
1. **Customer Site**: Visit `https://www.mangocoolers.com`
   - Should show the e-commerce interface
   - Admin routes should redirect to admin subdomain

2. **Admin Dashboard**: Visit `https://admin.mangocoolers.com`
   - Should show admin login page
   - Customer routes should redirect to main site
   - Requires admin user account

## 👥 User Management

### Creating Admin Users
1. Register a user account through the customer site
2. Connect to your Supabase dashboard
3. Run this SQL to grant admin privileges:

```sql
-- Replace 'admin@mangocoolers.com' with the actual admin email
SELECT assign_admin_role('admin@mangocoolers.com');
```

### Admin Features Access
Once logged in as admin on `admin.mangocoolers.com`:
- 📊 **Dashboard**: Real-time analytics and statistics
- 📦 **Orders**: Complete order management workflow
- 👥 **Customers**: Customer management and blocking
- 🛍️ **Products**: Full product CRUD with image management
- ⚠️ **Complaints**: Response system and status management
- 🛡️ **Warranties**: Approval workflow and serial number management
- 🚚 **Shipments**: Tracking number management and delivery updates
- ⚙️ **Settings**: System configuration and email templates

## 📱 Mobile Responsiveness

Both the customer site and admin dashboard are fully responsive:
- **Customer Site**: Optimized for mobile shopping experience
- **Admin Dashboard**: Touch-friendly admin interface for tablets

## 🔧 Maintenance & Monitoring

### System Health
- Built-in system status monitoring
- Automated error logging
- Performance metrics tracking

### Backup & Security
- Automated Supabase backups
- Security monitoring and alerts
- Regular security updates

## 🚀 Go Live Checklist

- [ ] DNS records configured and propagated
- [ ] SSL certificates active on all domains
- [ ] Admin user accounts created
- [ ] Email notifications tested
- [ ] All admin functions verified
- [ ] Customer site functionality confirmed
- [ ] Mobile responsiveness tested
- [ ] Security settings configured
- [ ] System monitoring active

## 📞 Support & Troubleshooting

### Common Issues

1. **Admin Subdomain Not Working**:
   - Check DNS propagation: [DNSChecker.org](https://dnschecker.org)
   - Verify A records point to `185.158.133.1`
   - Wait up to 48 hours for full propagation

2. **SSL Certificate Issues**:
   - Ensure DNS records are correct
   - Check for conflicting CAA records
   - Contact Lovable support if issues persist

3. **Admin Access Denied**:
   - Verify user has admin role in database
   - Check if accessing from correct subdomain
   - Clear browser cache and cookies

### Contact Support
For deployment issues or questions:
- Lovable Support: Contact through dashboard
- Include domain name and screenshots of DNS settings

---

**🎉 Your professional e-commerce platform with separated admin dashboard is now ready for production!**