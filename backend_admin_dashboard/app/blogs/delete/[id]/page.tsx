"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useEffect, useState } from "react";

interface DeleteBlogProps {
  params: {
    id: string;
  };
}

export default function DeleteBlog({ params }: DeleteBlogProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blogs?id=${params.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/blogs");
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="addblogspage">
        <div className="titledashboard flex flex-sb">
          <div data-aos="fade-right">
            <h2>
              Delete <span>Blog</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb" data-aos="fade-left">
            <RiDeleteBin6Fill /> <span>/</span>
            <span>Delete Blog</span>
          </div>
        </div>
        <div className="blogsadd">
          <div className="delete-confirmation">
            <h2>Are you sure you want to delete this blog?</h2>
            <p>This action cannot be undone.</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="delete-btn"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => router.push("/blogs")}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
