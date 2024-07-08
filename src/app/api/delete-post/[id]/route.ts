import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function DELETE(request: Request, {params}: {params:{id:string}}) {
  const id = params.id
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  const existingPost = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!existingPost) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  if (existingPost.authorId !== user.id) {
    return NextResponse.json({ error: "User not authorized to delete this post" }, { status: 403 });
  }

  await prisma.post.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Post deleted successfully" });
}
