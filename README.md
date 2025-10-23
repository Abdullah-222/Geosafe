# GeoSafe - Location-Based Secure File Access System

A Next.js application that provides secure file access based on user location. Users can only access files when they are within designated safe zones.

## Features

### 🔐 Authentication & Authorization
- **Role-based access control** (Admin/User)
- **Secure authentication** with NextAuth.js
- **Password hashing** with bcryptjs
- **JWT session management**

### 🗺️ Location-Based Security
- **Interactive maps** with React Leaflet
- **Safe zone management** for admins
- **Real-time location detection**
- **Geofencing** for file access control

### 📁 File Management
- **AES-256 encryption** for file security
- **Location-based access control**
- **File upload/download** with encryption
- **Secure file storage**

### 👥 User Management
- **Admin panel** for user management
- **User CRUD operations**
- **Role assignment** (Admin/User)
- **User activity tracking**

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: shadcn/ui, Tailwind CSS v4
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Maps**: React Leaflet
- **Encryption**: CryptoJS (AES-256-CBC)
- **Styling**: Tailwind CSS with custom design system

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- pnpm (recommended) or npm

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd geosafe
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update the following variables in `.env.local`:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/geosafe?schema=public"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Encryption
   ENCRYPTION_KEY="your-32-character-encryption-key-here"
   
   # Admin User
   ADMIN_EMAIL="admin@geosafe.com"
   ADMIN_PASSWORD="admin123"
   ```

4. **Set up the database**
   ```bash
   npx prisma db push
   npx tsx scripts/create-admin.ts
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Secret key for JWT tokens | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `ENCRYPTION_KEY` | 32-character encryption key | Yes |
| `ADMIN_EMAIL` | Default admin email | Yes |
| `ADMIN_PASSWORD` | Default admin password | Yes |
| `NODE_ENV` | Environment (development/production) | No |

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (admin)/           # Admin routes
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── files/         # File management
│   │   ├── safe-zones/    # Safe zone management
│   │   └── users/         # User management
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   └── user/              # User dashboard
├── components/            # React components
│   ├── admin/             # Admin-specific components
│   ├── map/               # Map components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility libraries
│   ├── auth.ts            # NextAuth configuration
│   ├── prisma.ts          # Prisma client
│   ├── encryption.ts      # File encryption
│   └── geo.ts             # Geolocation utilities
└── types/                 # TypeScript type definitions
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/signin` - User sign in
- `GET /api/auth/signout` - User sign out

### Admin Endpoints
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user
- `GET /api/safe-zones` - List safe zones
- `POST /api/safe-zones` - Create safe zone
- `PUT /api/safe-zones/[id]` - Update safe zone
- `DELETE /api/safe-zones/[id]` - Delete safe zone
- `GET /api/files` - List all files

### User Endpoints
- `POST /api/user/files` - Get accessible files based on location
- `POST /api/files/[id]/access` - Access file (with location check)

## Usage

### Admin Panel
1. **Sign in** with admin credentials
2. **Manage users** - View, edit, delete users
3. **Create safe zones** - Define areas where files can be accessed
4. **Upload files** - Upload encrypted files to safe zones
5. **Monitor activity** - Track user access and file usage

### User Dashboard
1. **Sign in** with user credentials
2. **View accessible files** - See files available in your current location
3. **Request file access** - Download files when in safe zones
4. **Location tracking** - Real-time location detection

## Security Features

- **File Encryption**: All files are encrypted with AES-256-CBC before storage
- **Location Verification**: Files can only be accessed within designated safe zones
- **Role-based Access**: Admins and users have different permission levels
- **Secure Authentication**: JWT-based session management
- **Password Hashing**: bcryptjs for secure password storage

## Development

### Database Management
```bash
# Push schema changes
npx prisma db push

# Generate Prisma client
npx prisma generate

# View database
npx prisma studio
```

### Code Quality
```bash
# Run linting
pnpm lint

# Type checking
pnpm build
```

## Deployment

1. **Set up production database**
2. **Configure environment variables**
3. **Build the application**
   ```bash
   pnpm build
   ```
4. **Start production server**
   ```bash
   pnpm start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.