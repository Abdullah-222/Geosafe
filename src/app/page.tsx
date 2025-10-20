import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, MapPin, Lock, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-[#1E3A8A]" />
            <h1 className="text-2xl font-bold text-[#1E3A8A]">GeoSafe</h1>
          </div>
          <div className="flex space-x-4">
            <Link href="/auth/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Secure File Access
          <span className="text-[#1E3A8A]"> Based on Location</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Protect your sensitive files with location-based access control. 
          Files are only accessible when you're in designated safe zones.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signup">
            <Button size="lg" className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90">
              Get Started
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <MapPin className="h-12 w-12 text-[#1E3A8A] mx-auto mb-4" />
              <CardTitle>Define Safe Zones</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Administrators can create safe zones by specifying latitude, longitude, and radius. 
                Files are only accessible within these designated areas.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Lock className="h-12 w-12 text-[#1E3A8A] mx-auto mb-4" />
              <CardTitle>Encrypted Storage</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                All files are encrypted using AES-256-GCM encryption before storage. 
                Files are automatically decrypted when accessed from safe zones.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-[#1E3A8A] mx-auto mb-4" />
              <CardTitle>Role-Based Access</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Simple role system with admin and user roles. Admins manage zones and files, 
                while users can only access files when in safe zones.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 GeoSafe. Secure file access based on location.</p>
        </div>
      </footer>
    </div>
  );
}
