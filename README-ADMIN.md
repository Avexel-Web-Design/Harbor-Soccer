# Harbor Soccer Admin Console

This project includes an admin console for managing contact form submissions using Cloudflare Pages, Functions, and D1 database.

## 🚀 Features

- **Contact Form**: Secure form submission with validation
- **Admin Dashboard**: View and manage all form submissions
- **Database**: Cloudflare D1 for storing submissions
- **Real-time Stats**: Dashboard showing submission statistics
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Setup Instructions

### 1. Prerequisites
- Cloudflare account
- Node.js and npm installed
- Git repository connected to Cloudflare Pages

### 2. Install Dependencies
```bash
npm install -g wrangler
npm install
```

### 3. Login to Cloudflare
```bash
wrangler login
```

### 4. Create D1 Database
```bash
npm run db:create
```

Copy the database ID from the output and update it in `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "harbor-soccer-db"
database_id = "YOUR_ACTUAL_DATABASE_ID"
```

### 5. Create Database Tables
```bash
npm run db:migrate
```

### 6. Deploy
Since this is already set up with Cloudflare Pages, push to your repository and the functions will be automatically deployed.

## 🔐 Admin Console

Access the admin console directly at: `https://your-domain.com/admin.html`

No authentication is required - the admin console is directly accessible.

## 📡 API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/submissions` - Get all submissions
- `DELETE /api/submissions/{id}` - Delete submission

## 🗄️ Database Schema

### Submissions Table
- `id` - Auto-incrementing primary key
- `name` - Submitter's name
- `email` - Submitter's email
- `subject` - Message subject/category
- `message` - Message content
- `submitted_at` - Timestamp
- `ip_address` - Client IP (for spam prevention)
- `user_agent` - Client browser info

## 🛠️ Development Commands

```bash
# Database management
npm run db:create          # Create new D1 database
npm run db:migrate         # Run migrations on production DB
npm run db:migrate-local   # Run migrations on local DB
npm run db:query "SELECT * FROM submissions"  # Query production DB
npm run db:query-local "SELECT * FROM submissions"  # Query local DB

# Development
npm run dev               # Start local development server
npm run deploy            # Deploy to Cloudflare Pages

# Monitoring
npm run logs              # View deployment logs
```

## 🔒 Security Features

- **Input Validation**: All form inputs are validated
- **CORS Protection**: Proper CORS headers configured
- **Rate Limiting**: Cloudflare's built-in protection
- **SQL Injection Protection**: Prepared statements used
- **XSS Protection**: HTML escaping in dashboard

## 📱 Mobile Support

The admin console is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔧 Customization

### Styling
- Modify `styles.css` for the main website
- Admin dashboard styles are inline in `admin.html`

### Form Fields
- Update the form in `index.html`
- Modify the API handler in `functions/api/contact.js`
- Update database schema if needed

### Authentication
- Change credentials via Wrangler secrets
- Modify JWT expiration in `functions/api/auth/login.js`

## 🚨 Troubleshooting

### Common Issues

1. **Database ID not found**
   - Ensure you've updated `wrangler.toml` with the correct database ID
   - Run `wrangler d1 list` to see your databases

2. **Authentication errors**
   - Check that secrets are set: `wrangler secret list`
   - Verify JWT_SECRET is set in production

3. **CORS errors**
   - Ensure your domain is deployed on Cloudflare Pages
   - Check that functions are in the correct directory structure

4. **Form not submitting**
   - Check browser console for errors
   - Verify the `/api/contact` endpoint is accessible

### Debug Commands
```bash
# List secrets
wrangler secret list

# View database info
wrangler d1 info harbor-soccer-db

# Check deployment status
wrangler pages deployment list

# View function logs
wrangler pages deployment tail
```

## 📞 Support

For issues related to Harbor Soccer, Inc., contact the organization directly.
For technical issues with this implementation, check the troubleshooting section above.
