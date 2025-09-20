"use client";

import Blog from "@/components/Blog";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { useEffect } from "react";

interface EditBlogProps {
  params: {
    id: string;
  };
}

export default function EditBlog({ params }: EditBlogProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Check if there's no active session and redirect to login page
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="full-h flex flex-center">
        <div className="loading-bar">Loading</div>
      </div>
    );
  }

  return (
    <>
      <div className="addblogspage">
        <div className="titledashboard flex flex-sb">
          <div data-aos="fade-right">
            <h2>
              Edit <span>Blog</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb" data-aos="fade-left">
            <FaEdit /> <span>/</span>
            <span>Edit Blog</span>
          </div>
        </div>
        <div className="blogsadd">
          <Blog id={params.id} />
        </div>
      </div>
    </>
  );
}
