import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tags = await prisma.tag.findMany();
  return NextResponse.json({
    status: true,
    tags,
  });
}