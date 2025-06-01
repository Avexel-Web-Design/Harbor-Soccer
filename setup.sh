#!/bin/bash

# Harbor Soccer Admin Console Setup Script
# This script helps set up the Cloudflare D1 database and deploy the admin console

set -e  # Exit on any error

echo "🏆 Harbor Soccer Admin Console Setup"
echo "====================================="

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI is not installed. Please run: npm install -g wrangler"
    exit 1
fi

# Check if user is logged in
if ! wrangler whoami &> /dev/null; then
    echo "🔐 Please login to Cloudflare first:"
    wrangler login
fi

echo "✅ Wrangler CLI is ready"

# Create D1 database if it doesn't exist
echo "📊 Setting up D1 database..."

# Check if database already exists
if wrangler d1 list | grep -q "harbor-soccer-db"; then
    echo "✅ Database 'harbor-soccer-db' already exists"
else
    echo "Creating new D1 database..."
    wrangler d1 create harbor-soccer-db
    echo "⚠️  Please copy the database ID from above and update it in wrangler.toml"
    echo "Press Enter to continue after updating wrangler.toml..."
    read
fi

# Run database migrations
echo "🗄️  Running database migrations..."
if wrangler d1 execute harbor-soccer-db --file=./schema.sql; then
    echo "✅ Database tables created successfully"
else
    echo "⚠️  Migrations may have already run (this is okay)"
fi

# Set up secrets
echo "🔑 Setting up authentication secrets..."
echo "You'll be prompted to enter secure values for:"
echo "1. Admin password (for logging into the admin console)"
echo "2. JWT secret (for secure sessions - use a long random string)"
echo ""

read -p "Set admin password now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    wrangler secret put ADMIN_PASSWORD
fi

read -p "Set JWT secret now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    wrangler secret put JWT_SECRET
fi

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Push your code to trigger a Cloudflare Pages deployment"
echo "2. Access your admin console at: https://your-domain.com/admin.html"
echo "3. Test the contact form at: https://your-domain.com"
echo ""
echo "Useful commands:"
echo "• Test locally: npm run dev"
echo "• View logs: npm run logs"
echo "• Query database: npm run db:query 'SELECT * FROM submissions'"
echo ""
echo "📚 See README-ADMIN.md for detailed documentation"
