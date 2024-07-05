"use client";

import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title is required" })
    .min(1, { message: "Title must be at least 1 character" })
    .max(50, { message: "Title cannot be more than 50 characters" }),
  // author: z.string().nonempty({ message: "Author is required" }),
  content: z
    .string()
    .nonempty({ message: "Content is required" })
    .min(2, { message: "Content must be at least 2 characters" })
    .max(100, { message: "Content cannot be more than 150 characters" }),
  pic_url: z.string().url({ message: "Must be a valid URL" }),
  price: z
  .preprocess((val) => parseFloat(val as string), z.number().min(0, { message: "Price must be at least 0" }).max(999999, {
    message: "Price must be less than 999999",
  })),
});

const AddPost: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pic_url: "https://baarmoto.vercel.app/images/motorbikeIcon.svg",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    console.log("values:", values);
    try {
      const res = await fetch("/api/add-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Failed to submit post.");
      }
      alert("Post submitted successfully!");
      setSubmitting(false);
      setIsAdding(false)
      router.refresh()
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to submit post. Please try again.");
    }
  };

  const handleNewPost = () => {
    setIsAdding(true);
    console.log("editing new post");
  };

  return (
    <div>
      <Drawer open={isAdding} onOpenChange={setIsAdding}>
        <DrawerTrigger asChild>
          <Button type="button" onClick={handleNewPost}> + New</Button>
        </DrawerTrigger>

        <DrawerContent className="flex justify-center items-center p-4 max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <DrawerHeader >
                <DrawerTitle className="pt-2">What to sell?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter post title" {...field} />
                    </FormControl>
                    {form.formState.errors.title && (
                      <FormMessage>{form.formState.errors.title.message}</FormMessage>
                    )}
                    <FormDescription>Title cannot be empty</FormDescription>
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter author's name" {...field} />
                    </FormControl>
                    {form.formState.errors.author && (
                      <FormMessage>{form.formState.errors.author.message}</FormMessage>
                    )}
                    <FormDescription>Author cannot be empty</FormDescription>
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your content" {...field} />
                    </FormControl>
                    {form.formState.errors.content && (
                      <FormMessage>{form.formState.errors.content.message}</FormMessage>
                    )}
                    <FormDescription>Content cannot be empty</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input  type="number" placeholder="Enter your item price" {...field} />
                    </FormControl>
                    {form.formState.errors.price && (
                      <FormMessage>{form.formState.errors.price.message}</FormMessage>
                    )}
                    <FormDescription>Price can&apos;t be bigger than 999999</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pic_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Picture URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Picture URL" {...field} />
                    </FormControl>
                    {form.formState.errors.pic_url && (
                      <FormMessage>{form.formState.errors.pic_url.message}</FormMessage>
                    )}
                    <FormDescription>We only accept picture URLs</FormDescription>
                  </FormItem>
                )}
              />

              <DrawerFooter>
              <Button type="submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit'}
                </Button>
                <DrawerClose >
 
                  <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </DrawerContent>  
      </Drawer>
    </div>
  );
};

export default AddPost;
