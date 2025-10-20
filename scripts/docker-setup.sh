#!/bin/bash

echo "🚀 Setting up GeoSafe with Docker..."

# Build and start containers
echo "📦 Building and starting containers..."
docker-compose up -d --build

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Create admin user
echo "👤 Creating admin user..."
docker-compose exec app npx tsx scripts/create-admin.ts

echo "✅ Setup complete!"
echo ""
echo "🌐 Access the application at: http://localhost:3000"
echo "👤 Admin credentials:"
echo "   Email: admin@geosafe.com"
echo "   Password: admin123"
echo ""
echo "📋 Features:"
echo "   • Interactive maps with React Leaflet"
echo "   • Location-based file access"
echo "   • AES-256 encryption"
echo "   • Safe zone management"
echo "   • Real-time location checking"
echo ""
echo "🔧 To stop the application: docker-compose down"
echo "🔧 To view logs: docker-compose logs -f"