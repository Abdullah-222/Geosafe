#!/bin/bash

echo "🚀 Setting up GeoSafe for development..."

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Push database schema
echo "🗄️ Setting up database..."
npx prisma db push

# Create admin user
echo "👤 Creating admin user..."
npx tsx scripts/create-admin.ts

echo "✅ Setup complete!"
echo ""
echo "🌐 Start the development server:"
echo "   pnpm dev"
echo ""
echo "👤 Admin credentials:"
echo "   Email: admin@geosafe.com"
echo "   Password: admin123"
echo ""
echo "📋 Features implemented:"
echo "   ✅ React Leaflet maps integration"
echo "   ✅ Location-based file access"
echo "   ✅ AES-256 encryption"
echo "   ✅ Safe zone management"
echo "   ✅ Real-time location checking"
echo "   ✅ Admin and user dashboards"
