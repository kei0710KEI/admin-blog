import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const blogcategory = searchParams.get("blogcategory");
    const tags = searchParams.get("tags");
    const slug = searchParams.get("slug");

    let blogs;

    if (id) {
      // Fetch a single blog by id
      blogs = await Blog.findById(id);
      return NextResponse.json(blogs);
    } else if (blogcategory) {
      // Fetch blogs by blogcategory
      blogs = await Blog.find({ blogcategory: blogcategory }).lean();
      return NextResponse.json(blogs.reverse());
    } else if (tags) {
      // Fetch blogs by tags
      blogs = await Blog.find({ tags: tags }).lean();
      return NextResponse.json(blogs.reverse());
    } else if (slug) {
      // Fetch blogs by slug
      blogs = await Blog.find({ slug: slug }).lean();
      return NextResponse.json(blogs.reverse());
    } else {
      // Fetch all blogs
      blogs = await Blog.find().lean();
      return NextResponse.json(blogs.reverse());
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
