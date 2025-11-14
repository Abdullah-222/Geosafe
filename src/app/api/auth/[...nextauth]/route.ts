import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"
import type { NextRequest } from "next/server"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = (NextAuth as any)(authOptions)

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  return handler(req, context)
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  return handler(req, context)
}

