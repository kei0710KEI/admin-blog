import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await mongooseConnect();

    const { title, slug, description, blogcategory, tags, status } =
      await request.json();

    const productDoc = await Blog.create({
      title,
      slug,
      description,
      blogcategory,
      tags,
      status,
    });

    return NextResponse.json(productDoc);
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await mongooseConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const blog = await Blog.findById(id);
      return NextResponse.json(blog);
    } else {
      const blogs = await Blog.find();
      return NextResponse.json(blogs.reverse());
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await mongooseConnect();

    const { _id, title, slug, description, blogcategory, tags, status } =
      await request.json();

    await Blog.updateOne(
      { _id },
      {
        title,
        slug,
        description,
        blogcategory,
        tags,
        status,
      }
    );

    return NextResponse.json(true);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await mongooseConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      await Blog.deleteOne({ _id: id });
      return NextResponse.json(true);
    } else {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
