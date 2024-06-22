"use client";

import { Button } from "@/components/ui/button";
import { Undo } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">

      <h1 className="text-5xl font-bold">404</h1>
      <p className="my-2 text-2xl">Page not found or we are working on that :o</p>

      <Button asChild className="mt-4">
        <Link href="/">
          <Undo className="mr-2 h-4 w-4" /> Go to homepage
        </Link>
      </Button>
    </div>
  );
};
