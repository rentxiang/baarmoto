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
    username: string;
    content: string;
    pic_url: string;
    created_at: string;
}

const PostCard: React.FC<PostCardProps> = ({ post_id, title, username, content, pic_url, created_at }) => {
    const router = useRouter()
    return (
        <Card className="flex flex-col h-full w-max-40 shadow-md rounded-lg focus:outline-none ">
            <CardHeader className='w-50 cursor-pointer' onClick={()=> router.push(`/post/${post_id}`)}>
            <Image src={pic_url} alt='picture' className='cursor-pointer w-full h-full' width={150} height={150} />
            <h2 className="text-xl font-bold p-6">{title}</h2>
            </CardHeader>
            <CardContent className='pb-2 mt-auto'>
            <p className="text-sm text-gray-500">By {username}</p>

            </CardContent>
            <CardFooter className=''>

            <p className="text-sm text-gray-500">Posted on: {new Date(created_at).toLocaleDateString()}</p>
            </CardFooter>
        </Card>
    );
}

export default PostCard;
