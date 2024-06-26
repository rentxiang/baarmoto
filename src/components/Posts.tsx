"use client";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface Post {
  post_id: number;
  title: string;
  username: string;
  content: string;
  pic_url: string;
  created_at: string;
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
        next: { revalidate: 1000 },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      console.log("data", data.res);
      setPosts(data.res);
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleRefresh = () => {
    setIsloading(true);

    fetchPosts();
  };
  if (isloading)
    return (
      <div className="flex flex-col space-y-3">
        {/* <Skeleton className="h-[300px] w-[500px] rounded-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500  animate-puls" /> */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-[700px] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded" />
          <Skeleton className="h-4 w-[350px] bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 rounded" />
        </div>
      </div>
    );
  return (
    <div>
      <div className="md:hidden flex flex-col gap-4 m-4">
        {posts.map((post) => (
          <PostCard
            key={post.post_id}
            post_id={post.post_id}
            title={post.title}
            username={post.username}
            content={post.content}
            pic_url={post.pic_url}
            created_at={post.created_at}
          />
        ))}
        <Button onClick={handleRefresh}>Refresh (test)</Button>
      </div>
      <div className="hidden md:grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.post_id}
            post_id={post.post_id}
            title={post.title}
            username={post.username}
            content={post.content}
            pic_url={post.pic_url}
            created_at={post.created_at}
          />
        ))}
        <Button onClick={handleRefresh}>Refresh (test)</Button>
      </div>
    </div>
  );
};

export default Posts;
