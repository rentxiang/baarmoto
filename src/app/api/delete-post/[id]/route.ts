import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { S3Client, DeleteObjectsCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

async function deleteS3Objects(keys: string[]) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Delete: {
      Objects: keys.map(key => ({ Key: key })),
    },
  };

  const command = new DeleteObjectsCommand(params);
  return s3Client.send(command);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
  }

  const existingPost = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!existingPost) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  if (existingPost.authorId !== user.id) {
    return NextResponse.json(
      { error: 'User not authorized to delete this post' },
      { status: 403 }
    );
  }

  const picUrls = existingPost.pic_urls ?? [];

  // Map picUrls to S3 object keys
  const keys = picUrls.map(url => {
    const urlParts = url.split("/");
    return urlParts.slice(3).join("/"); 
  });

  try {
    // Check if keys array is empty before attempting deletion
    if (keys.length > 0) {
      await deleteS3Objects(keys);
    }
  } catch (error) {
    console.error('Error deleting S3 objects:', error);
    return NextResponse.json(
      { error: 'Failed to delete post due to S3 deletion error' },
      { status: 500 }
    );
  }

  // Delete the post from the database after successful S3 deletion
  try {
    await prisma.post.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting post from database:', error);
    return NextResponse.json(
      { error: 'Failed to delete post from database' },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: 'Post deleted successfully' });
}
