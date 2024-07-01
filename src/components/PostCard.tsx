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
        <Card className="p-4 shadow-md rounded-lg focus:outline-none ">
            <CardHeader className='cursor-pointer' onClick={()=> router.push(`/post/${post_id}`)}>
                <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm text-gray-500">By {username}</p>

            </CardHeader>
            <CardContent onClick={()=> router.push(`/post/${post_id}`)}>
                <Image src={pic_url} alt='picture' className='cursor-pointer' width={100} height={100} />
            </CardContent>
            <CardFooter className=''>

            <p className="text-sm text-gray-500">Posted on: {new Date(created_at).toLocaleDateString()}</p>
            </CardFooter>
        </Card>
    );
}

export default PostCard;
