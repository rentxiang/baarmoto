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

interface Post {
  id: number;
  title: string;
  username: string;
  content: string;
  pic_url: string;
  created_at: string;
}

const PostPage: React.FC = () => {
  const { id } = useParams();
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

  if (loading) return;
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>;
  if (!post) return <p>No post found</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
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
            className="w-full h-64 object-cover"
          />
        )}
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-2">
            {post.title}
          </CardTitle>
          <CardDescription className="text-gray-600 mb-4">
            By {post.username}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-800">{post.content}</p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Posted on: {new Date(post.created_at).toLocaleDateString()}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostPage;
