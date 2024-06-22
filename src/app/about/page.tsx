import { Footer } from "@/components/Footer";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `

# About Us


Hey there, we are asian riders based in the San Francisco Bay Area. We ride and share passion for motorcycles together.

Come and join us.


Love,

BAAR

![San Francisco](/images/SF.svg)
`;

export async function generateMetadata() {
  return {
    title: "About Us",
    description: "Learn more about BAAR",
    openGraph: {
      title: "About Us",
      description: "Learn more about BAAR",
      images: [
        signOgImageUrl({
          title: "BAAR",
          label: "About Us",
          brand: config.blog.name,
        }),
      ],
    },
  };
}

const Page = async () => {
  return (
    <div className="container mx-auto px-5">
      <div className="prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10 blog-content">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
};

export default Page;
