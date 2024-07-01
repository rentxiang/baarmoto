"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useToast } from "@/components/ui/use-toast";
import exp from "constants";
import { log } from "console";

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "motorcycles",
    label: "Motorcycles",
  },
  {
    id: "helmets",
    label: "Helmets",
  },
  {
    id: "riding-gears",
    label: "Riding Gears",
  },
  {
    id: "accessories",
    label: "Accessories",
  },
  {
    id: "parts",
    label: "Parts",
  },
] as const;

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function SideFilter() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["recents"],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("submitted:", data.items);
    // query database with data.items

    let query = data.items.join("&");

    // // test

    // const whereClauses = data.items
    //   .map((tag) => `tags @> '["${tag}"]'::jsonb`)
    //   .join(" OR ");
    // const sql = `SELECT * FROM posts WHERE ${whereClauses}`;
    // console.log("sql data:", sql);

    // fetch(`/api/get-filtered-posts?tags=${query}`)
    fetch(`/api/get-filtered-posts/${query}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("filtered data:", data.res);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(data.items, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-xl font-bold mb-4">Categories</FormLabel>
                <FormDescription className="py-1">Buy and sell used gears</FormDescription>
                <p className="text-sm pt-1">⚠️ Future feature</p>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="filter">
                  <AccordionTrigger className="text-base">
                    Filter
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2">
                      {items.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="items"
                          render={({ field }) => (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  id={item.id}
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, item.id]);
                                    } else {
                                      field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Find</Button>
      </form>
    </Form>
  );
}

export default SideFilter;
