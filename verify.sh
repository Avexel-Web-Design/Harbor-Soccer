#!/bin/bash

# Harbor Soccer - Quick Verification Script
echo "🏆 Harbor Soccer Admin Console - File Verification"
echo "=================================================="

# Check if all required files exist
files=(
    "index.html"
    "admin.html" 
    "wrangler.toml"
    "schema.sql"
    "functions/api/contact.js"
    "functions/api/auth/login.js"
    "functions/api/submissions.js"
    "functions/api/submissions/[id].js"
    "functions/api/status.js"
)

echo "📁 Checking required files..."
missing_files=0

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (MISSING)"
        missing_files=$((missing_files + 1))
    fi
done

echo ""

if [ $missing_files -eq 0 ]; then
    echo "🎉 All required files are present!"
    echo ""
    echo "Next steps:"
    echo "1. Run: npm install -g wrangler (if not already installed)"
    echo "2. Run: wrangler login"
    echo "3. Run: ./setup.sh (or follow manual setup in README-ADMIN.md)"
    echo "4. Push to your git repository to trigger Cloudflare Pages deployment"
    echo ""
    echo "🔗 After deployment, access:"
    echo "   • Main site: https://your-domain.com/"
    echo "   • Admin console: https://your-domain.com/admin.html"
    echo "   • API tests: https://your-domain.com/test.html"
else
    echo "❌ $missing_files file(s) missing. Please check the setup."
fi
