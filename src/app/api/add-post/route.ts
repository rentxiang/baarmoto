import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"

export async function POST(request: Request){
    const res = await request.json()
    const {title, content, pic_url, price} = res;

    const result = await prisma.post.create({
        data:{
            title,
            content,
            pic_url,
            price,
            published:true
        }
    })

    return NextResponse.json({result})
}