import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const shayaris = await prisma.shayari.findMany({
    where: {
      status: "Approved",
    },
    select: {
      id: true,
      description: true,
      author: true,
      tags: {
        select: {
          name: true,
        },
      },
    },
  });
  const formattedShayaris = shayaris.map((shayari) => ({
    ...shayari,
    tags: shayari.tags.map((tag) => tag.name),
  }));
  return NextResponse.json({
    formattedShayaris,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { description, author, tags } = body;
  if (!description || !author || !tags) {
    return NextResponse.json(
      {
        status: false,
        message: "missing required fields",
      },
      { status: 400 }
    );
  }
  try {
    // fetch the tags, create it do not exist
    const tagRecords = await Promise.all(
      tags.map(async (tagName: string) => {
        const capitalizedTagName =
          tagName.charAt(0).toUpperCase() + tagName.slice(1);

        let tag = await prisma.tag.findFirst({
          where: { name: capitalizedTagName },
        });
        if (!tag) {
          tag = await prisma.tag.create({ data: { name: capitalizedTagName } });
        }
        return { id: tag.id };
      })
    );
    // create a shayari
    const shayari = await prisma.shayari.create({
      data: {
        description,
        author,
        tags: { connect: tagRecords },
      },
    });
    return NextResponse.json(
      {
        status: true,
        message: "created a shayari",
        shayari,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json(
      {
        status: false,
        message: "failed to create a shayari",
      },
      { status: 500 }
    );
  }
}
