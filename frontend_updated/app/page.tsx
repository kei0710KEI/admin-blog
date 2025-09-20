import Link from "next/link";
import { FaHtml5 } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FiDatabase } from "react-icons/fi";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import SeoJsonLd from "@/app/_components/SeoJsonLd";
import { absoluteUrl } from "@/lib/url";

export const runtime = "nodejs";
export const revalidate = 0;

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

export default async function Home() {
  // Server-side data processing
  await connectToDatabase();
  const blogs = (await Blog.find({ status: "publish" })
    .lean()
    .sort({ createdAt: -1 })) as any[];
  const currentBlogs = blogs.slice(0, 5); // Show first 5 blogs

  const siteUrl = absoluteUrl("/");
  const webSiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl,
    name: "VBMBLOGS",
  };
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: siteUrl,
    name: "ホーム",
  };

  return (
    <>
      <section className="header_data_section">
        <div className="container flex flex-sb w-100">
          <div className="leftheader_info" data-aos="fade-right">
            <h1>
              Hi, I'm <span>Vbm Coder</span>.<br /> UX/UI Designer
            </h1>
            <h3>Specialized in JavaScript and React</h3>
            <div className="flex gap-2 ">
              <Link href="/contact">
                <button>Contact Me</button>
              </Link>
              <Link href="/about">
                <button>About Me</button>
              </Link>
            </div>
          </div>
          <div className="rightheader_img" data-aos="zoom-in">
            <div className="image_bg_top"></div>
            <div className="image_bg_top2"></div>
            <img src="/img/coder.png" alt="VBMBLOGSの作者プロフィール画像" />
          </div>
        </div>
      </section>
      <section className="main_blog_section">
        <div className="container flex flex-sb flex-left flex-wrap">
          <div className="leftblog_sec">
            <h2>Recently Published</h2>
            <div className="blogs_sec">
              {currentBlogs.map((blog) => {
                // in the markdown content first image show here
                const firstImageUrl = extractFirstImageUrl(blog.description);

                const plainTextDescription = markdownToText(blog.description);
                const truncatedDescription =
                  plainTextDescription.length > 150
                    ? `${plainTextDescription.substring(0, 150)}...`
                    : plainTextDescription;
                return (
                  <div className="blog" key={blog._id} data-aos="fade-up">
                    <div className="blogimg">
                      <Link href={`/blog/${blog.slug}`}>
                        <img
                          src={firstImageUrl || "/img/noimage.jpg"}
                          alt={blog.title || "ブログ記事の画像"}
                        />
                      </Link>
                    </div>
                    <div className="bloginfo">
                      <Link href={`/tag/${blog.tags[0]}`}>
                        <div className="blogtag">{blog.tags[0]}</div>
                      </Link>
                      <Link href={`/blog/${blog.slug}`}>
                        <h3>{blog.title}</h3>
                      </Link>

                      {/* Render only the first <p> tag */}
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
                          <span>
                            {blog.createdAt
                              ? new Date(blog.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )
                              : "Unknown date"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rightblog_info">
            <div className="topics_sec">
              <h2>Topics</h2>
              <div className="topics_list">
                <Link href="/topics/htmlcssjs" data-aos="fade-up">
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
                <Link href="/topics/database" data-aos="fade-up">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FiDatabase />
                    </div>
                    <h3>DataBase</h3>
                  </div>
                </Link>
                <Link href="/topics/deployment" data-aos="fade-up">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <AiOutlineDeploymentUnit />
                    </div>
                    <h3>Deployment</h3>
                  </div>
                </Link>
              </div>
            </div>
            <div className="tags_sec mt-3">
              <h2>Tags</h2>
              <div className="tags_list" data-aos="fade-up">
                <Link href="/tag/html">#html</Link>
                <Link href="/tag/css">#css</Link>
                <Link href="/tag/javascript">#javaScript</Link>
                <Link href="/tag/nextjs">#nextjs</Link>
                <Link href="/tag/reactjs">#reactjs</Link>
                <Link href="/tag/database">#database</Link>
              </div>
            </div>
            <div className="letstalk_sec mt-3">
              <h2>Let's Talk</h2>
              <div className="talk_sec">
                <h4>
                  Want to find out how I can solve problems specific to your
                  business? Let's talk.
                </h4>
                <div className="social_talks flex flex-center gap-1 mt-2">
                  <div className="st_icon" data-aos="fade-up">
                    <FaGithub />
                  </div>
                  <div className="st_icon" data-aos="fade-up">
                    <FaTwitter />
                  </div>
                  <div className="st_icon" data-aos="fade-up">
                    <FaInstagram />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SeoJsonLd json={webSiteLd} />
      <SeoJsonLd json={webPageLd} />
    </>
  );
}
