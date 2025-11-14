import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error - getServerSession exists but types may not be properly exported
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if file exists
    const file = await prisma.file.findUnique({
      where: { id }
    });

    if (!file) {
      return NextResponse.json(
        { message: "File not found" },
        { status: 404 }
      );
    }

    // Delete the file (this will also cascade delete related FileAccess records)
    await prisma.file.delete({
      where: { id }
    });

    return NextResponse.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

