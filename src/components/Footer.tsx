"use client";
import { FunctionComponent } from "react";
import { config } from "@/config";
import Link from "next/link";
import { Icons } from "./ui/icons";
import Image from "next/image";

export const Footer: FunctionComponent = () => {
  return (
    <div className="flex flex-rows items-end justify-between mt-12 md:mt-16 mb-12">
      <div className="text-sm text-muted-foreground gap-4">
      <Image
            src="/images/motorbikeIcon.svg"
            width={100}
            height={120}
            alt="baar"
          />
        <p className="pt-7">© {config.blog.copyright} {new Date().getFullYear()}</p>
      </div>
      <div className="flex justify-between gap-3 text-sm text-muted-foreground ">

      <Link href="https://github.com/rentxiang/baarmoto"> Github</Link> <Icons.gitHub className="mr-2 h-4 w-4"  />

      </div>
    </div>
  );
};
