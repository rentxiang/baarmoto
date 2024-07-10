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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "@clerk/clerk-react";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Post {
  id: string;
  title: string;
  author: {
    id: string;
    name?: string;
    email: string;
    image_url?: string;
    wechat?: string;
  };
  content: string;
  pic_urls: string[];
  createdAt: string;
  price: number;
}

const Post: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const [userId, setUserId] = useState<string | undefined>();

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/get-post/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await response.json();
      setPost(data.result);
      console.log("post page:", data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setUserId(user?.id);
  }, [user]);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);
  const handlePostUpdate = () => {
    setLoading(true);
    fetchPost();
  };
  if (loading)
    return (
      <div className="flex flex-col space-y-3 items-center justify-center">
        <Skeleton className="h-[255px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-6 w-[200px]" />
        </div>
      </div>
    );

  if (!post) return <p>No post found</p>;
  return (
    <div className="w-96 mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        {" "}
        <Button className="" onClick={() => router.back()}>
          Back
        </Button>
        {userId === post.author.id ? (
          <div className="flex flex-row gap-2">
            <EditPost onEditUpdated={handlePostUpdate} />
            <DeletePost onDeleteUpdated={handlePostUpdate} />
          </div>
        ) : (
          " "
        )}
      </div>
      <Card className="shadow-md rounded-lg overflow-hidden">
        <Carousel>
          <CarouselContent>

            {post.pic_urls.map((url, index) => (
              <CarouselItem key={index}>
             <div>
            <Image
                  src={url}
                  alt={post.title}
                  width={200}
                  height={200}
                  className="w-full  object-cover"
                />
            </div>
                <p className="bg-transparent text-sm text-end px-2">{index+1} of {post.pic_urls.length}</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <CardHeader className="p-6">
          <CardTitle className="text-2xl font-bold mb-2">
            {post.title}
          </CardTitle>
          <CardTitle className="mb-2">${post.price}</CardTitle>
          <CardDescription className="text-gray-600 mb-4 pt-2 flex items-center gap-3">
            <p>By {post.author.name}</p>
            <Avatar>
              <AvatarImage
                src={post.author.image_url ?? "https://github.com/shadcn.pn"}
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-800">{post.content}</p>
        </CardContent>
        <CardFooter className="justify-between items-center">
          <Popover>
            <PopoverTrigger>
              <Button
                className="gap-2"
                onClick={() => console.log("Messaging...")}
              >
                <IoLogoWechat />
                Message
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              {post.author.wechat
                ? post.author.wechat
                : "Please reach out to admin for contact"}{" "}
            </PopoverContent>
          </Popover>

          <p className="text-sm text-gray-500">
            Posted on: {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
