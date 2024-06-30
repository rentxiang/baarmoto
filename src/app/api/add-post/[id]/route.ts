import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { title, username, content, pic_url } = await request.json();

    if (!title || !username || !content || !pic_url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO posts (title, username, content, pic_url)
      VALUES (${title}, ${username}, ${content}, ${pic_url})
      RETURNING *;
    `;

    return NextResponse.json({ result: result.rows[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error}, { status: 500 });
  }
}
