import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get('term'); 

    if (!term) {
      return NextResponse.json({ error: 'Missing term parameter' }, { status: 400 });
    }

    const result = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: term, mode: 'insensitive' } },
          { content: { contains: term, mode: 'insensitive' } }
        ]
      },
      include: {
        author: true
      }
    });

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error('Error searching posts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
