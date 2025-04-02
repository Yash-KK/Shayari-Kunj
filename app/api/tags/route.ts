import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const tags = await prisma.tag.findMany({
    select: {
      name: true,
    },
  });

  const tagNames = tags.map((tag) => tag.name);
  return NextResponse.json({
    tagNames,
  });
}
