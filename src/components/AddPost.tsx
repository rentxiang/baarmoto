"use client";

import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
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
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().nonempty({ message: 'Title is required' }).min(1, { message: 'Title must be at least 1 character' }).max(50, { message: 'Title cannot be more than 50 characters' }),
  content: z.string().nonempty({ message: 'Content is required' }).min(2, { message: 'Content must be at least 2 characters' }).max(150, { message: 'Content cannot be more than 150 characters' }),
  pic_urls: z.array(z.string().url()).optional(),
  price: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(0, { message: 'Price must be at least 0' }).max(999999, { message: 'Price must be less than 999999' })
  ),
});

type FormValues = z.infer<typeof formSchema>;

const AddPost: React.FC<{ onAdded: () => void }> = ({ onAdded }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { pic_urls: [] },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      if (files.length > 3) {
        setFileError('You can only upload up to 3 images.');
      } else {
        setFileError(null);
        setSelectedFiles(files);
      }
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to upload file");
    }

    const data = await res.json();
    return data.fileUrl;
  };

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      let pic_urls: string[] = [];
      if (selectedFiles) {
        pic_urls = await Promise.all(selectedFiles.map(file => uploadFile(file)));
      }

      const res = await fetch("/api/add-post", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" },
        body: JSON.stringify({ ...values, pic_urls }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit post.");
      }

      onAdded();
      setIsAdding(false);
      setSubmitting(false);
      router.refresh();
    } catch (error) {
      console.error("Error submitting post:", error);
      setSubmitting(false);
      alert("Failed to submit post. Please try again.");
    }
  };

  const handleNewPost = () => {
    setIsAdding(true);
  };

  return (
    <div>
      <Drawer open={isAdding} onOpenChange={setIsAdding}>
        <DrawerTrigger asChild>
          <Button type="button" onClick={handleNewPost}>
            + New
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex justify-center items-center p-4 max-w-md ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <DrawerHeader>
                <DrawerTitle className="pt-7">What to sell?</DrawerTitle>
              </DrawerHeader>
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} />
                  </FormControl>
                  {form.formState.errors.title && (
                    <FormMessage>{form.formState.errors.title.message}</FormMessage>
                  )}
                </FormItem>
              )} />
              <FormField control={form.control} name="content" render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your content" {...field} />
                  </FormControl>
                  {form.formState.errors.content && (
                    <FormMessage>{form.formState.errors.content.message}</FormMessage>
                  )}
                </FormItem>
              )} />
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter your item price" {...field} />
                  </FormControl>
                  {form.formState.errors.price && (
                    <FormMessage>{form.formState.errors.price.message}</FormMessage>
                  )}
                </FormItem>
              )} />
              <FormField control={form.control} name="pic_urls" render={({ field }) => (
                <FormItem>
                  <FormLabel>Pictures</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" multiple onChange={handleFileChange} />
                  </FormControl>
                  {fileError && <FormMessage>{fileError}</FormMessage>}
                  {form.formState.errors.pic_urls && (
                    <FormMessage>{form.formState.errors.pic_urls.message}</FormMessage>
                  )}
                  <FormDescription>Please select up to 3 images to upload.</FormDescription>
                </FormItem>
              )} />
              <DrawerFooter>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
                <DrawerClose>
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
