"use client";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import AddPost from "./AddPost";
import { toast } from "sonner";
interface Post {
  id: number;
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
  price: number;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      let response = await fetch("/api/get-posts", {
        next: { revalidate: 60 },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      console.log("data", data);
      setPosts(data.reverse());
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleAdded = () => {
    toast("Post has been created");
    setIsloading(true);
    fetchPosts();
  };
  if (isloading)
    return (
      <div className="flex flex-col space-y-3 pt-4">
        {/* <Skeleton className="h-[300px] w-[500px] rounded-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500  animate-puls" /> */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded" />
          <Skeleton className="h-4 w-1/2 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 rounded" />
        </div>
      </div>
    );
  if (!posts) return <p>No post found</p>;

  return (
    <div className="">
      <div className="flex pb-4 items-center justify-between">
        <h1 className="text-xl font-bold">Today&apos; picks</h1>
        <AddPost onAdded={handleAdded} />
      </div>
      <div className="md:hidden flex flex-col gap-4 m-4 ">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            author={post.author.name || "Anonymous"}
            content={post.content}
            pic_url={post.pic_url}
            created_at={post.createdAt}
            price={post.price}
            author_image_url={
              post.author.image_url || "https://github.com/shadcn.png"
            }
          />
        ))}
      </div>
      <div className="hidden md:grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            author={post.author.name || "Anonymous"}
            content={post.content}
            pic_url={post.pic_url}
            created_at={post.createdAt}
            price={post.price}
            author_image_url={
              post.author.image_url || "https://github.com/shadcn.png"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
