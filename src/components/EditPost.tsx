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
import { useRouter, useParams } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";

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
  price: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(0, { message: "Price must be at least 0" }).max(999999, {
      message: "Price must be less than 999999",
    })
  ),
});
type FormValues = z.infer<typeof formSchema> & { name?: string };

const EditPost: React.FC<{ onEditUpdated: () => void }> = ({onEditUpdated}) => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<FormValues | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  });

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/get-post/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch post");
          }
          const data = await response.json();
          form.reset(data.result);
          setPost(data.result);
          console.log(data.result);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, form]);

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    console.log("values:", values);

    try {
      const res = await fetch(`/api/edit-post/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(values),
      });
      console.log(res);
      if (!res.ok) {
        toast("Failed to update post");

        throw new Error("Failed to update post.");
      }
      setSubmitting(false);
      setIsEditing(false);
      toast("Successfully edited");

    } catch (error) {
      setSubmitting(false);
      console.error("Error updating post:", error);
      alert("Failed to update post. Please try again.");
    } finally {
      onEditUpdated();
    }
  };

  const handleEditPost = () => {
    setIsEditing(true);
    console.log("editing post");
  };

  if (loading) return <p></p>;

  return (
    <div>
      <Drawer open={isEditing} onOpenChange={setIsEditing}>
        <DrawerTrigger asChild>
          <Button type="button" onClick={handleEditPost}>
            <FaEdit />
          </Button>
        </DrawerTrigger>

        <DrawerContent className="flex justify-center items-center p-4 max-w-md ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <DrawerHeader>
                <DrawerTitle className="pt-2">Edit Your Post</DrawerTitle>
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
                    <Textarea placeholder="Enter your content" {...field}/>

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
              <DrawerFooter>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
                <DrawerClose>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
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

export default EditPost;
