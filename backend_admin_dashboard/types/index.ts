export interface Blog {
  _id: string;
  title: string;
  slug: string;
  description: string;
  blogcategory: string[];
  tags: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogFormData {
  title: string;
  slug: string;
  description: string;
  blogcategory: string[];
  tags: string[];
  status: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
