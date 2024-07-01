import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

// export const revalidate = 60;

export async function GET(request: NextRequest) {
  cookies();
  const searchParams = request.nextUrl.searchParams;
  const tagsQuery = searchParams.get('tags');

  const tags = tagsQuery ? tagsQuery.split('&') : [];

  try {
    let result;

    if (tags.length > 0) {
      const whereClauses = tags.map(tag => `tags @> '["${tag}"]'::jsonb`).join(' OR ');
      // SQL anti injection attack error here...
      result = await sql`SELECT * FROM posts WHERE ${whereClauses}`;

    } else {
      result = await sql`SELECT * FROM posts where id = 3;`;
    }

    const res = result.rows.length > 0 ? result.rows : [];
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
