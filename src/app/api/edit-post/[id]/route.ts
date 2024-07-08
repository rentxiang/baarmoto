import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function PUT(request: Request, {params}:{params:{id:string}}) {
  const res = await request.json();
  const id = params.id;
  const { title, content, pic_url, price } = res;
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  const existingPost = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!existingPost) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  if (existingPost.authorId !== user.id) {
    return NextResponse.json({ error: "User not authorized to edit this post" }, { status: 403 });
  }

  const result = await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      pic_url,
      price,
    },
    include: {
      author: true,
    },
  });

  return NextResponse.json({ result });
}
