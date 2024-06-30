import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    cookies(); // dynamic rendering
  try {
    const result =
      await sql`Select * From posts;`;
    const res = result.rows.length > 0 ? result.rows : null;
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}