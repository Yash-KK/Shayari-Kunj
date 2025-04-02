import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const shayaris = await prisma.shayari.findMany({
    where: {
      status: "Approved",
    },
  });
  return NextResponse.json({
    status: true,
    shayaris,
  });
}

// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   const { description, author, tags } = body;
//   if (!description || !author || !tags) {
//     return NextResponse.json(
//       {
//         status: false,
//         message: "missing required fields",
//       },
//       { status: 400 }
//     );
//   }
//   console.log(description, author, tags)
//   return NextResponse.json({
//     status: true,
//     message: "created a shayari",
//   });
// }
