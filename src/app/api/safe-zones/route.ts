import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error - getServerSession exists but types may not be properly exported
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const safeZones = await prisma.safeZone.findMany({
      include: {
        creator: {
          select: {
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            files: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(safeZones);
  } catch (error) {
    console.error("Error fetching safe zones:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, latitude, longitude, radius, description } = await request.json();

    if (!name || !latitude || !longitude || !radius) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const safeZone = await prisma.safeZone.create({
      data: {
        name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        radius: parseFloat(radius),
        description,
        createdBy: (session.user as { id?: string })?.id || ""
      }
    });

    return NextResponse.json(safeZone, { status: 201 });
  } catch (error) {
    console.error("Error creating safe zone:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

