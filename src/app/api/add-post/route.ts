import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  const { title, content, pic_urls, price, tag, wechat } = await request.json(); // 注意这里的变量名是 tag 而不是 tags
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const userId = user.id;
  const userName = user.firstName ?? "Anonymous";
  const userEmail =
    user.primaryEmailAddress?.emailAddress ?? "no-email@example.com";
  const userImage = user.imageUrl ?? "https://github.com/shadcn.png";

  let existingTag = await prisma.tag.findUnique({
    where: { tag_name: tag },
  });
  if (!existingTag) {
    existingTag = await prisma.tag.create({
      data: { id: randomUUID(), tag_name: tag },
    });
  }
  const existingAuthor = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  const result = await prisma.post.create({
    data: {
      title,
      content,
      pic_urls: pic_urls || [
        "https://baarmoto.vercel.app/images/motorbikeIcon.svg",
      ],
      price,
      published: true,
      author: existingAuthor
        ? { connect: { id: existingAuthor.id } }
        : {
            create: {
              id: userId,
              name: userName,
              email: userEmail,
              image_url: userImage,
              wechat: wechat
            },
          },
      tag: { connect: { id: existingTag.id } },
    },
    include: {
      author: true,
      tag: true,
    },
  });

  return NextResponse.json({ result });
}
