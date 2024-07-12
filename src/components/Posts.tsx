"use client";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import AddPost from "./AddPost";
import { toast } from "sonner";
import { Input } from "./ui/input";

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
  pic_urls: string[];
  createdAt: string;
  price: number;
  tag: {
    tag_name: string;
  }
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let response = await fetch(`/api/search-posts?term=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Failed to search posts");
      }
      console.log("response:", response)

      const data = await response.json();
      console.log("data:", data)

      setPosts(data.result.reverse());
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  const handleAdded = () => {
    toast("Post has been created");
    setIsLoading(true);
    fetchPosts();
  };

  if (isLoading)
    return (
      <div className="flex flex-col space-y-3 pt-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded" />
          <Skeleton className="h-4 w-1/2 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 rounded" />
        </div>
      </div>
    );

  if (!posts) return <p>No post found</p>;

  return (
    <div className="">
      <form onSubmit={handleSearch} className="pb-4 flex flex-row gap-3">
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </form>
      <div className="flex pb-4 items-center justify-between">
        <h1 className="text-xl font-bold">Today&apos;s picks</h1>
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
            pic_url={post.pic_urls?.[0]}
            created_at={post.createdAt}
            price={post.price}
            author_image_url={
              post.author.image_url || "https://github.com/shadcn.png"
            }
            tag_name={post.tag.tag_name}
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
            pic_url={post.pic_urls?.[0]}
            created_at={post.createdAt}
            price={post.price}
            author_image_url={
              post.author.image_url || "https://github.com/shadcn.png"
            }
            tag_name={post.tag.tag_name}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
