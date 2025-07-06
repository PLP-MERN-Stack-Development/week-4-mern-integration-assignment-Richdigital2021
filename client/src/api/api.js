import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ✅ Define and export services
export const postService = {
  getAllPosts: () => API.get("/posts"),
  getPost: (id) => API.get(`/posts/${id}`),
  createPost: (data) => API.post("/posts", data),
  updatePost: (id, data) => API.put(`/posts/${id}`, data),
  deletePost: (id) => API.delete(`/posts/${id}`),
};

// Add other services similarly
export const categoryService = {
  getCategories: () => API.get("/categories"),
  createCategory: (data) => API.post("/categories", data),
};

export const commentService = {
  getComments: (postId) => API.get(`/comments/${postId}`),
  addComment: (postId, data) => API.post(`/comments/${postId}`, data),
};

export const authService = {
  login: (data) => API.post("/auth/login", data),
  register: (data) => API.post("/auth/register", data),
};

export default API;
