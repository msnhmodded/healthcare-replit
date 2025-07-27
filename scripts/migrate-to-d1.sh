#!/bin/bash

# Cloudflare D1 Migration Script for SHEC Website
# This script helps automate the migration process to Cloudflare D1

set -e

echo "🚀 Starting Cloudflare D1 Migration for SHEC Website"
echo "=================================================="

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI is not installed. Installing..."
    npm install -g wrangler
fi

# Login to Cloudflare (if not already logged in)
echo "🔐 Checking Cloudflare authentication..."
if ! wrangler whoami &> /dev/null; then
    echo "Please log in to Cloudflare:"
    wrangler login
fi

# Create databases
echo "📊 Creating D1 databases..."

echo "Creating development database..."
DEV_OUTPUT=$(wrangler d1 create shec-development)
DEV_DB_ID=$(echo "$DEV_OUTPUT" | grep "database_id" | cut -d'"' -f4)

echo "Creating production database..."
PROD_OUTPUT=$(wrangler d1 create shec-production)
PROD_DB_ID=$(echo "$PROD_OUTPUT" | grep "database_id" | cut -d'"' -f4)

# Create wrangler.toml from example
echo "⚙️  Creating wrangler.toml configuration..."
cp wrangler.toml.example wrangler.toml

# Update database IDs in wrangler.toml
sed -i "s/your-development-database-id-here/$DEV_DB_ID/g" wrangler.toml
sed -i "s/your-production-database-id-here/$PROD_DB_ID/g" wrangler.toml

echo "✅ Updated wrangler.toml with database IDs:"
echo "   Development DB ID: $DEV_DB_ID"
echo "   Production DB ID: $PROD_DB_ID"

# Apply database schema
echo "🗄️  Applying database schema..."
echo "Applying schema to development database..."
wrangler d1 execute shec-development --file=./migrations/001_initial_schema.sql

echo "Applying schema to production database..."
wrangler d1 execute shec-production --file=./migrations/001_initial_schema.sql

# Seed development database with sample data
echo "🌱 Seeding development database with sample data..."
wrangler d1 execute shec-development --file=./seeds/initial_data.sql

echo ""
echo "🎉 Migration completed successfully!"
echo ""
echo "Next steps:"
echo "1. Install Cloudflare dependencies: npm install @cloudflare/workers-types"
echo "2. Update your server code to use D1 (see CLOUDFLARE_MIGRATION.md)"
echo "3. Test locally with: npm run dev"
echo "4. Deploy to Cloudflare: wrangler deploy"
echo ""
echo "Database Information:"
echo "- Development DB ID: $DEV_DB_ID"
echo "- Production DB ID: $PROD_DB_ID"
echo ""
echo "These IDs have been saved to wrangler.toml"
echo "Keep this information secure and do not share the production database ID publicly."