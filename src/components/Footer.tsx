"use client";
import { FunctionComponent } from "react";
import { config } from "@/config";
import Link from "next/link";
import { Icons } from "./ui/icons";
import Image from "next/image";
import { useRouter } from 'next/navigation';


export const Footer: FunctionComponent = () => {
  const router = useRouter()
  return (
    <div className="pt-7">

    <div className="hidden md:flex flex-row items-end justify-between mt-12 md:mt-16 mb-12">
      <div className="text-sm text-muted-foreground gap-4">
      <Image
            src="/images/motorbikeIcon.svg"
            width={80}
            height={80}
            alt="baar"
          />
        <p className="pt-7">© {config.blog.copyright} {new Date().getFullYear()}</p>
      </div>
      <div className="flex justify-between gap-2 text-sm text-muted-foreground cursor-pointer" onClick={()=> router.push(`https://github.com/rentxiang/baarmoto`)}>

      <Link href="https://github.com/rentxiang/baarmoto"> Github</Link> <Icons.gitHub className="mr-2 h-4 w-4"  />

      </div>
    </div>
    <div className="md:hidden flex flex-col items-center justify-center mt-12 md:mt-16 mb-12">
      <div className="text-sm text-muted-foreground py-4 flex flex-col items-center">
      <Image
            src="/images/motorbikeIcon.svg"
            width={80}
            height={80}
            alt="baar"
          />
        <p className="pt-7">© {config.blog.copyright} {new Date().getFullYear()}</p>
      </div>
      <div className="flex items-center justify-items-center gap-3 py-4 text-sm text-muted-foreground " onClick={()=> router.push(`https://github.com/rentxiang/baarmoto`)}>

      <Link href="https://github.com/rentxiang/baarmoto"> Github</Link> <Icons.gitHub className="mr-2 h-4 w-4"  />

      </div>
    </div>
    </div>

  );
};
