"use client";
import { FunctionComponent } from "react";
import { config } from "@/config";
import Link from "next/link";
import { Icons } from "./ui/icons";

export const Footer: FunctionComponent = () => {
  return (
    <div className="flex items-center justify-between mt-12 md:mt-16 mb-12">
      <div className="text-sm text-muted-foreground">
        © {config.blog.copyright} {new Date().getFullYear()}
      </div>
      <div className="flex justify-between gap-4 text-sm text-muted-foreground ">
      <Link href="https://github.com/rentxiang/baarmoto"> See Github</Link> <Icons.gitHub className="mr-2 h-4 w-4"  />

      </div>
    </div>
  );
};
