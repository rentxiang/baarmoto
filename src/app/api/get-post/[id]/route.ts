import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request, {params}:{params:{id:string}}) {
  cookies(); // dynamic rendering
  try {
    const id = params.id; //Dynamic Segments 
    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    const result = await prisma.post.findUnique({
      where: {
        id: id,

      },
      include:{
        author: true,
        tag:true
      }
    })

    if (!result) { 
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
