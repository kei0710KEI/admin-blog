import { Schema, models, model, Document } from "mongoose";

export interface IBlog extends Document {
  _id: string;
  title: string;
  slug: string;
  description: string;
  blogcategory: string[];
  tags: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String },
    slug: { type: String, required: true },
    description: { type: String },
    blogcategory: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String },
  },
  {
    timestamps: true, // This option will automatically manage createdAt and updatedAt fields
  }
);

export const Blog = models.Blog || model<IBlog>("Blog", BlogSchema, "blogtest");
