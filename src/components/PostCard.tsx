"use client";

import React, {useState} from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image';
import { useRouter } from 'next/navigation';


interface PostCardProps {
    post_id: number;
    title: string;
    author: string;
    content: string;
    pic_url: string;
    created_at: string;
    price: number;
}

const PostCard: React.FC<PostCardProps> = ({ post_id, title, author, content, pic_url, created_at, price }) => {
    const router = useRouter();
    return (
        <Card className="shadow-md rounded-lg focus:outline-none flex flex-col justify-between h-full">
            <CardHeader className='cursor-pointer' onClick={() => router.push(`/post/${post_id}`)}>
            <div className='min-h-30 max-h-48 overflow-hidden'>
                    <Image src={pic_url} alt='picture' className='cursor-pointer w-full object-cover' width={150} height={150} />
                </div>
                <h2 className="text-xl font-bold px-6 pt-6 max-h-36 overflow-hidden overflow-ellipsis">{title}</h2>
                <h2 className=" px-6 max-h-36 overflow-hidden overflow-ellipsis">${price}</h2>

            </CardHeader>
            <CardContent className='py-2 mt-auto'>
                <p className="text-sm text-gray-500">By {author}</p>
            </CardContent>
            <CardFooter className=''>
                <p className="text-sm text-gray-500">Posted on: {new Date(created_at).toLocaleDateString()}</p>
            </CardFooter>
        </Card>
    );
}


export default PostCard;
