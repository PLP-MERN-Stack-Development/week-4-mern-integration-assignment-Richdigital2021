import API from "./api"; // base axios instance with /api prefix

const postService = {
  getAllPosts: (page = 1, limit = 10) =>
    API.get(`/posts?page=${page}&limit=${limit}`),

  getPost: (id) => API.get(`/posts/${id}`).then((res) => res.data),

  createPost: (data) => API.post("/posts", data),

  updatePost: (id, data) => API.put(`/posts/${id}`, data),

  deletePost: (id) => API.delete(`/posts/${id}`),
};

export default postService;
