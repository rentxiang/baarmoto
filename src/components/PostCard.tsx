"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface PostCardProps {
  id: number;
  title: string;
  author: string;
  content: string;
  pic_url: string;
  created_at: string;
  price: number;
  author_image_url: string;
  tag_name: string
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  author,
  author_image_url,
  pic_url,
  created_at,
  price,
  tag_name
}) => {
  const router = useRouter();
  return (
    <Card className="shadow-md rounded-lg focus:outline-none flex flex-col justify-between h-full">
      <CardHeader
        className="cursor-pointer"
        onClick={() => router.push(`/post/${id}`)}
      >
        <div className="min-h-30 max-h-48 overflow-hidden">
          <Image
            src={
              pic_url ?? "https://baarmoto.vercel.app/images/motorbikeIcon.svg"
            }
            alt="picture"
            className="cursor-pointer w-full object-cover"
            width={150}
            height={150}
            loading="lazy"
          />
        </div>
        <h2 className="text-xl font-bold px-6 pt-6 max-h-36 overflow-hidden overflow-ellipsis">
          {title}
        </h2>
        <h2 className=" px-6 max-h-36 overflow-hidden overflow-ellipsis">
          ${price}
        </h2>
      </CardHeader>
      <CardContent className="py-2 mt-auto flex items-center gap-3">
        <p className="text-sm text-gray-500">By {author}</p>
        <Avatar>
          <AvatarImage src={author_image_url} />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between pt-4">
        <p className="text-sm text-gray-500">
          Posted on: {new Date(created_at).toLocaleDateString()}
        </p>
        {tag_name?<Badge variant="outline" ><p className="text-sm"/>{tag_name}</Badge>:""}
        
      </CardFooter>
    </Card>
  );
};

export default PostCard;
