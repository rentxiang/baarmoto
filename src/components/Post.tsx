"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { IoLogoWechat } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Post {
  id: string;
  title: string;
  author: {
    id: string;
    name?: string;
    email: string;
    image_url?: string; 
  };
  content: string;
  pic_url: string;
  createdAt: string;
  price: number
}

const Post: React.FC = () => {
  const {id} = useParams()
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/get-post/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch post");
          }
          const data = await response.json();
          setPost(data.result);
          console.log(data.result);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id]);

  if (loading) return(
    <div className="flex flex-col space-y-3 items-center justify-center">
    <Skeleton className="h-[255px] w-[250px] rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-6 w-[250px]" />
      <Skeleton className="h-6 w-[200px]" />
    </div>
  </div>
  )

  if (!post) return <p>No post found</p>;

  return (
    <div className="w-96 mx-auto p-4">
      <Button className="mb-4" onClick={() => router.back()}>
        Back
      </Button>
      <Card className="shadow-md rounded-lg overflow-hidden">
        {post.pic_url && (
          <Image
            src={post.pic_url}
            alt={post.title}
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        )}
        <CardHeader className="p-6">
          <CardTitle className="text-2xl font-bold mb-2">
            {post.title}
          </CardTitle>
          <CardTitle className="mb-2">
            ${post.price}
          </CardTitle>
          <CardDescription className="text-gray-600 mb-4 pt-2 flex items-center gap-3">
            <p>By {post.author.name}</p>
        <Avatar >
          <AvatarImage src={post.author.image_url} />
          <AvatarFallback ></AvatarFallback>
        </Avatar>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-800">{post.content}</p>
        </CardContent>
        <CardFooter className="justify-between items-center">
        <Button className="gap-2" onClick={() => console.log("Messaging...")}>
        <IoLogoWechat />Message
      </Button>
          <p className="text-sm text-gray-500">
            Posted on: {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </CardFooter>
        
      </Card>
    </div>
  );
};

export default Post;
