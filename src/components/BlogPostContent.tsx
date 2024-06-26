"use client";
import { GetPostResult } from "@/lib/wisp";
import Link from "next/link";
import sanitize from "sanitize-html";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const PostContent = ({ content }: { content: string }) => {
  return (
    <div
      className="blog-content mx-auto my-4 space-y-7 "
      dangerouslySetInnerHTML={{
        __html: sanitize(content, {
          allowedTags: [
            "b",
            "i",
            "em",
            "strong",
            "a",
            "img",
            "h1",
            "h2",
            "h3",
            "code",
            "pre",
            "p",
            "li",
            "ul",
            "ol",
            "blockquote",
          ],
        }),
      }}
    ></div>
  );
};

export const BlogPostContent = ({ post }: { post: GetPostResult["post"] }) => {
  if (!post) return null;
  const { title, publishedAt, createdAt, content, tags } = post;
  return (
    <div>
      <div className="prose lg:prose-xl dark:prose-invert mx-auto lg:prose-h1:text-4xl mb-10 lg:mt-20 break-words">
        <h1 className="font-sans font-semibold tracking-tighter text-primary text-2xl md:text-3xl">{title}</h1>
        <PostContent content={content} />

        <div className="mt-10 opacity-40 text-sm">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tag/${tag.name}`}
              className="text-primary mr-2"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm opacity-40 mt-4">
          <div>
            {Intl.DateTimeFormat("en-US").format(
              new Date(publishedAt || createdAt)
            )}
          </div>
          <div>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "default" }),
                "right-4 top-4 md:right-8 md:top-8"
              )}
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
