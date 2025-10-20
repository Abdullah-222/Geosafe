# GeoSafe - Location-Based Secure File Access

GeoSafe is a secure file access system that uses location-based permissions to control file downloads. Files are only accessible when users are within designated "safe zones" defined by administrators.

## Features

### 🔐 Authentication & Authorization
- Simple role-based system (Admin/User)
- Secure password authentication with bcrypt
- Session management with NextAuth.js

### 🗺️ Location-Based Access Control
- Interactive maps with React Leaflet integration
- Define safe zones with visual map interface
- Real-time GPS location checking
- Automatic access denial outside safe zones
- Visual representation of safe zones and user location

### 🔒 File Encryption
- AES-256-GCM encryption for all uploaded files
- Automatic encryption before storage
- Decryption only when access is granted

### 👥 User Management
- Admin panel for user management
- Create, edit, and delete users
- Role assignment and permissions

### 📁 File Management
- Secure file upload with encryption
- Location-based file access
- Access logging and audit trail

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Encryption**: CryptoJS (AES-256-GCM)
- **Styling**: Tailwind CSS v4

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- PostgreSQL (for production) or SQLite (for development)

### Quick Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd geosafe
```

2. Run the setup script:
```bash
chmod +x scripts/dev-setup.sh
./scripts/dev-setup.sh
```

3. Start the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Manual Setup

If you prefer manual setup:

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
# For SQLite (development)
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="geosafe-secret-key-2024"
ENCRYPTION_KEY="geosafe-encryption-key-32-chars"
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Create an admin user:
```bash
npx tsx scripts/create-admin.ts
```

5. Start the development server:
```bash
pnpm dev
```

### Default Admin Credentials

- **Email**: admin@geosafe.com
- **Password**: admin123

## Usage

### For Administrators

1. **Sign in** with admin credentials
2. **Manage Users**: Create, edit, or delete user accounts
3. **Create Safe Zones**: Define geographical areas where files can be accessed
4. **Upload Files**: Upload files that will be encrypted and stored
5. **Monitor Access**: View access logs and user activity

### For Users

1. **Sign up** for a new account or **sign in** with existing credentials
2. **Enable Location**: Allow location access in your browser
3. **View Available Files**: Files will only appear when you're in a safe zone
4. **Download Files**: Access files when your location is verified

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/signin` - Sign in user
- `GET /api/auth/signout` - Sign out user

### Admin Management
- `GET /api/users` - Get all users (Admin only)
- `POST /api/users` - Create new user (Admin only)
- `PUT /api/users/[id]` - Update user (Admin only)
- `DELETE /api/users/[id]` - Delete user (Admin only)

### Safe Zones
- `GET /api/safe-zones` - Get all safe zones (Admin only)
- `POST /api/safe-zones` - Create safe zone (Admin only)
- `PUT /api/safe-zones/[id]` - Update safe zone (Admin only)
- `DELETE /api/safe-zones/[id]` - Delete safe zone (Admin only)

### File Management
- `GET /api/files` - Get all files (Admin only)
- `POST /api/files` - Upload file (Admin only)
- `POST /api/files/[id]/access` - Access file (requires location)
- `POST /api/user/files` - Get user's accessible files

## Security Features

- **File Encryption**: All files are encrypted using AES-256-GCM before storage
- **Location Verification**: Files are only accessible from designated safe zones
- **Access Logging**: All file access attempts are logged with location data
- **Role-Based Access**: Strict separation between admin and user permissions
- **Secure Authentication**: Password hashing with bcrypt

## Development

### Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (admin)/           # Admin routes
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── user/              # User dashboard
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── providers/        # Context providers
└── lib/                  # Utility libraries
    ├── auth.ts           # NextAuth configuration
    ├── prisma.ts         # Prisma client
    ├── encryption.ts     # File encryption utilities
    └── geo.ts            # Location utilities
```

### Database Schema

- **Users**: User accounts with roles
- **SafeZones**: Geographical areas for file access
- **Files**: Encrypted file storage
- **FileAccess**: Access logs with location data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
