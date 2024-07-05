import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  const res = await request.json();
  const { title, content, pic_url, price } = res;
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  const userId = user.id;
  const userName = user.firstName ?? "Anonymous";
  const userEmail = user.primaryEmailAddress?.emailAddress ?? "no-email@example.com";
  const userImage = user.imageUrl?? "https://github.com/shadcn.png"
  // Check if the author already exists by email
  const existingAuthor = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  const result = await prisma.post.create({
    data: {
      title,
      content,
      pic_url,
      price,
      published: true,
      author: existingAuthor
        ? { connect: { id: existingAuthor.id } }
        : { create: { id: userId, name: userName, email: userEmail, image_url: userImage } },
    },
    include: {
      author: true,
    },
  });

  return NextResponse.json({ result });
}
