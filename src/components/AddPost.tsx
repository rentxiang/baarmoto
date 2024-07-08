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
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title is required" })
    .min(1, { message: "Title must be at least 1 character" })
    .max(50, { message: "Title cannot be more than 50 characters" }),
  content: z
    .string()
    .nonempty({ message: "Content is required" })
    .min(2, { message: "Content must be at least 2 characters" })
    .max(100, { message: "Content cannot be more than 150 characters" }),
  pic_url: z.string().url({ message: "Must be a valid URL" }),
  price: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(0, { message: "Price must be at least 0" }).max(999999, {
      message: "Price must be less than 999999",
    })
  ),
});
type FormValues = z.infer<typeof formSchema> & { name?: string };
const AddPost: React.FC<{ onAdded: () => void }> = ({ onAdded }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pic_url: "https://baarmoto.vercel.app/images/motorbikeIcon.svg",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/add-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Failed to submit post.");
      }
      onAdded();
      setSubmitting(false);
      setIsAdding(false);
      router.refresh();
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to submit post. Please try again.");
    }
  };
  useEffect(() => {
    // Prefetch the marketplace page
    router.prefetch("/marketplace");
  }, [router]);
  const handleNewPost = () => {
    setIsAdding(true);
    console.log("editing new post");
  };

  return (
    <div>
      <Drawer open={isAdding} onOpenChange={setIsAdding}>
        <DrawerTrigger asChild>
          <Button type="button" onClick={handleNewPost}>
            {" "}
            + New
          </Button>
        </DrawerTrigger>

        <DrawerContent className="flex justify-center items-center p-4 max-w-md ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <DrawerHeader>
                <DrawerTitle className="pt-2">What to sell?</DrawerTitle>
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
                      <FormMessage>
                        {form.formState.errors.title.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

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
                      <FormMessage>
                        {form.formState.errors.content.message}
                      </FormMessage>
                    )}
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
                      <Input
                        type="number"
                        placeholder="Enter your item price"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.price && (
                      <FormMessage>
                        {form.formState.errors.price.message}
                      </FormMessage>
                    )}
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
                      <FormMessage>
                        {form.formState.errors.pic_url.message}
                      </FormMessage>
                    )}
                    <FormDescription>
                      Sorry, we only accept picture urls for now :o
                    </FormDescription>
                  </FormItem>
                )}
              />

              <DrawerFooter>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
                <DrawerClose>
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    Cancel
                  </Button>
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
