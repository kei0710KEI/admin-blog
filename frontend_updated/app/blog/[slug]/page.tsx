import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { absoluteUrl } from "@/lib/url";
import { env } from "@/lib/env";
import SeoJsonLd from "@/app/_components/SeoJsonLd";
import { BsTags } from "react-icons/bs";
import { LuClock3 } from "react-icons/lu";
import { AiOutlineDeploymentUnit, AiOutlineUser } from "react-icons/ai";
import { PiMedalFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FiDatabase } from "react-icons/fi";
import { TbBrandNextjs } from "react-icons/tb";
import { FaGithub, FaHtml5, FaInstagram, FaTwitter } from "react-icons/fa6";
import CodeComponent from "./CodeComponent";

export const runtime = "nodejs";
export const revalidate = 0;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  await connectToDatabase();
  const post = (await Blog.findOne({
    slug: slug,
    status: "publish",
  }).lean()) as any;

  const url = absoluteUrl(`/blog/${slug}`);
  const title = post?.title ?? "記事";
  const description = post?.description ?? "記事の概要";
  const ogImage = post?.ogImage || "/og-default.jpg";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "VBMBLOGS",
      type: "article",
      images: [{ url: absoluteUrl(ogImage) }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(ogImage)],
    },
    robots: { index: true, follow: true },
  };
}

// Code component for syntax highlighting
const Code = ({ node, inline, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || "");

  if (inline) {
    return <code>{children}</code>;
  } else if (match) {
    return (
      <div style={{ position: "relative" }}>
        <SyntaxHighlighter
          style={a11yDark}
          language={match[1]}
          PreTag="pre"
          {...props}
          codeTagProps={{
            style: {
              padding: "0",
              borderRadius: "5px",
              overflowX: "auto",
              whiteSpace: "pre-wrap",
            },
          }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
        <CodeComponent code={String(children).replace(/\n$/, "")} />
      </div>
    );
  } else {
    return (
      <code className="md-post-code" {...props}>
        {children}
      </code>
    );
  }
};

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;

  await connectToDatabase();
  const blog = (await Blog.findOne({ slug }).lean()) as any;

  if (!blog) {
    notFound();
  }

  const canonical = absoluteUrl(`/blog/${slug}`);
  const createdAtIso = blog?.createdAt
    ? new Date(blog.createdAt).toISOString()
    : undefined;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog?.title,
    description: blog?.description,
    datePublished: createdAtIso,
    dateModified: createdAtIso,
    mainEntityOfPage: canonical,
  };

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
    <div className="slugpage">
      <div className="container">
        <div className="topslug_titles" data-aos="fade-right">
          <h1 className="slugtitle">{blog.title}</h1>
          <h5>
            By <span>Vbm Coder</span>・ Published in{" "}
            <span>{blog.blogcategory}</span> ・ {formatDate(blog.createdAt)}
            <span>・ 1 min read</span>
          </h5>
        </div>

        {/* blog data section */}
        <div className="flex flex-sb flex-left pb-5 flex-wrap">
          <div className="leftblog_data_markdown" data-aos="fade-up">
            <div className="w-100 blogcontent">
              {/* content */}
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: Code,
                }}
              >
                {blog.description}
              </ReactMarkdown>
            </div>
          </div>
          <div className="rightslug_data">
            <div className="slug_profile_info">
              <div className="slugprofile_sec">
                <div className="profile_imgbg"></div>
                <div className="slug_profile_img">
                  <div className="image_bg_top0"></div>
                  <div className="image_bg_top1"></div>
                  <img src="/img/coder.png" alt="記事の作者プロフィール画像" />
                </div>
              </div>
              <h3>Vbm Coder</h3>
              <h4>Website Developer</h4>
              <div className="social_talks flex flex-center gap-1 mt-2">
                <div className="st_icon">
                  <FaGithub />
                </div>
                <div className="st_icon">
                  <FaTwitter />
                </div>
                <div className="st_icon">
                  <FaInstagram />
                </div>
              </div>
            </div>
            <div className="topics_sec">
              <h2>Topics</h2>
              <div className="topics_list">
                <Link href="/topics/htmlcssjs">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaHtml5 />
                    </div>
                    <h3>Html, css & javaScript</h3>
                  </div>
                </Link>
                <Link href="/topics/nextjs">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <TbBrandNextjs />
                    </div>
                    <h3>Next Js, React js</h3>
                  </div>
                </Link>
                <Link href="/topics/database">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FiDatabase />
                    </div>
                    <h3>DataBase</h3>
                  </div>
                </Link>
                <Link href="/topics/deployment">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <AiOutlineDeploymentUnit />
                    </div>
                    <h3>Deployment</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SeoJsonLd json={articleLd} />
    </div>
  );
}
