export interface Dashboard {}

export interface NewPost {
  title: string;
  description: string;
  category_id: number;
  images: Image[];
}
export interface Image {
  base64Image: string | null;
  type?: string;
}
export interface PostCreationResponse {
  message: string;
  blog: Post;
}
export interface Post {
  id: number;
  title: string;
  description: string;
  category_id: number;
  updated_at: string;
  created_at: string;
  category?: Category;
}
export interface Category {
  id: number;
  name: string;
}
export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}
export interface PaginatedResponse {
  current_page: number;
  data: Post[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
export interface PostsCountResponse {
  Article: number;
  News: number;
  Blogs: number;
}
export interface LoginAdminData {
  email: string;
  password: string;
}
export interface LoginAdminResponse {
  token: string;
  admin: Admin;
}
export interface Admin {
  id: number;
  name: string;
  role: string;
}
export interface PostDeletedResponse {
  messsage: string;
}
