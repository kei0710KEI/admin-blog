import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import Link from "next/link";
import { absoluteUrl } from "@/lib/url";

export const runtime = "nodejs";
export const revalidate = 0;

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const url = absoluteUrl(`/topics/${category}`);
  const title = `トピック: ${category}`;
  const description = `${category}に関する記事一覧`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "VBMBLOGS",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

function extractFirstImageUrl(
  markdownContent: string | null | undefined
): string | null {
  // Check if markdownContent is provided and non-empty
  if (!markdownContent || typeof markdownContent !== "string") {
    return null;
  }

  // Regular expression to match the first image URL in markdown format ![alt text](imageURL)
  const regex = /!\[.*?\]\((.*?)\)/;
  const match = markdownContent.match(regex);
  return match ? match[1] : null;
}

// Function to convert Markdown to plain text
const markdownToText = (markdown: string): string => {
  // Use a simple regex to remove Markdown formatting
  return markdown
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // Bold
    .replace(/(\*|_)(.*?)\1/g, "$2") // Italics
    .replace(/`([^`]+)`/g, "$1") // Inline code
    .replace(/!\[.*?\]\(.*?\)/g, "") // Images
    .replace(/\[.*?\]\(.*?\)/g, "") // Links
    .replace(/###*|##*|#*/g, "") // Headers
    .replace(/(\r\n|\n|\r)/g, " ") // New lines
    .trim(); // Remove extra spaces
};

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  if (!category) {
    notFound();
  }

  await connectToDatabase();
  const blogs = (await Blog.find({ blogcategory: category }).lean()) as any[];

  // filter published blogs
  const publishedblogs = blogs.filter((blog) => blog.status === "publish");

  // Safe date formatting
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "Unknown date";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  };

  return (
    <div className="blogpage">
      <div className="category_slug">
        <div className="container">
          <div className="category_title">
            <div className="flex gap-1" data-aos="fade-right">
              <h1>
                {(publishedblogs && publishedblogs[0]?.blogcategory) ||
                  category}
              </h1>
              <span>
                {publishedblogs.filter((blog) => blog.blogcategory).length}
              </span>
            </div>
            <p data-aos="fade-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>
          <div className="category_blogs mt-3">
            {publishedblogs.map((item) => {
              // in the markdown content first image show here
              const firstImageUrl = extractFirstImageUrl(item.description);
              const plainTextDescription = markdownToText(item.description);
              const truncatedDescription =
                plainTextDescription.length > 150
                  ? `${plainTextDescription.substring(0, 150)}...`
                  : plainTextDescription;

              return (
                <div className="cate_blog" key={item._id} data-aos="fade-up">
                  <Link href={`/blog/${item.slug}`}>
                    <img
                      src={firstImageUrl || "/img/noimage.jpg"}
                      alt={item.title || "ブログ記事の画像"}
                    />
                  </Link>
                  <div className="bloginfo mt-2">
                    <Link href={`/tag/${item.tags[0]}`}>
                      <div className="blogtag">{item.tags[0]}</div>
                    </Link>
                    <Link href={`/blog/${item.slug}`}>
                      <h3>{item.title}</h3>
                    </Link>
                    <p>{truncatedDescription}</p>
                    <div className="blogauthor flex gap-1">
                      <div className="blogaimg">
                        <img
                          src="/img/coder.png"
                          alt="記事の作者プロフィール画像"
                        />
                      </div>
                      <div className="flex flex-col flex-left gap-05">
                        <h4>vbm coder</h4>
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
