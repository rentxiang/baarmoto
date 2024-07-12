import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get('term'); 

    let whereCondition = {}; 

    if (term) {
      whereCondition = {
        OR: [
          { title: { contains: term, mode: 'insensitive' } },
          { content: { contains: term, mode: 'insensitive' } }
        ]
      };
    }

    const result = await prisma.post.findMany({
      where: whereCondition,
      include: {
        author: true,
        tag: true
      }
    });

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error('Error searching posts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
