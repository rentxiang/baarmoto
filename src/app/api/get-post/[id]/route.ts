import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request, {params}:{params:{id:number}}) {
  cookies(); // dynamic rendering
  try {
    const id = params.id; //Dynamic Segments 
    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    const result = await sql`SELECT * FROM posts WHERE post_id = ${id};`;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ result: result.rows[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
