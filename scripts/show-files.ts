import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function showFiles() {
  try {
    console.log('🔍 Checking file storage locations...\n');

    // Get all files with their details
    const files = await prisma.file.findMany({
      include: {
        safeZone: {
          select: {
            name: true,
            latitude: true,
            longitude: true,
            radius: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`📁 Found ${files.length} files in database\n`);

    if (files.length === 0) {
      console.log('❌ No files found in database');
      return;
    }

    // Show file details
    files.forEach((file, index) => {
      console.log(`📄 File ${index + 1}:`);
      console.log(`   ID: ${file.id}`);
      console.log(`   Name: ${file.originalName}`);
      console.log(`   Size: ${(file.size / 1024).toFixed(2)} KB`);
      console.log(`   Type: ${file.mimeType}`);
      console.log(`   Created: ${file.createdAt.toLocaleString()}`);
      console.log(`   Safe Zone: ${file.safeZone?.name || 'No Safe Zone'}`);
      console.log(`   Encrypted Data Length: ${file.encryptedData?.length || 0} characters`);
      console.log(`   Is Encrypted: ${!!file.encryptedData ? '✅ Yes' : '❌ No'}`);
      
      if (file.encryptedData) {
        console.log(`   Encrypted Preview: ${file.encryptedData.substring(0, 50)}...`);
      }
      console.log('');
    });

    // Show storage statistics
    const stats = {
      totalFiles: files.length,
      encryptedFiles: files.filter(f => f.encryptedData).length,
      unencryptedFiles: files.filter(f => !f.encryptedData).length,
      totalSize: files.reduce((sum, f) => sum + f.size, 0),
      averageFileSize: files.length > 0 ? files.reduce((sum, f) => sum + f.size, 0) / files.length : 0
    };

    console.log('📊 Storage Statistics:');
    console.log(`   Total Files: ${stats.totalFiles}`);
    console.log(`   Encrypted Files: ${stats.encryptedFiles}`);
    console.log(`   Unencrypted Files: ${stats.unencryptedFiles}`);
    console.log(`   Total Size: ${(stats.totalSize / 1024).toFixed(2)} KB`);
    console.log(`   Average File Size: ${(stats.averageFileSize / 1024).toFixed(2)} KB`);
    console.log('');

    // Show database storage method
    console.log('🗄️ Storage Method:');
    console.log('   Database: PostgreSQL');
    console.log('   Table: File');
    console.log('   Column: encryptedData (TEXT)');
    console.log('   Encryption: AES-256-CBC with CryptoJS');
    console.log('   Storage Location: Database server (not file system)');
    console.log('');

    // Show safe zones
    const safeZones = await prisma.safeZone.findMany({
      include: {
        _count: {
          select: {
            files: true
          }
        }
      }
    });

    console.log('🏢 Safe Zones:');
    safeZones.forEach((zone, index) => {
      console.log(`   ${index + 1}. ${zone.name}`);
      console.log(`      Location: ${zone.latitude}, ${zone.longitude}`);
      console.log(`      Radius: ${zone.radius}m`);
      console.log(`      Files: ${zone._count.files}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error checking files:', error);
  } finally {
    await prisma.$disconnect();
  }
}

showFiles();

