import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
cookies();

  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        tag:true

      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
