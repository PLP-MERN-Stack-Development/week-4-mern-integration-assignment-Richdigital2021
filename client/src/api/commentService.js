import API from "./api";

const commentService = {
  getCommentsByPostId: (postId) => API.get(`/comments/${postId}`),
  addCommentToPost: (postId, data) => API.post(`/comments/${postId}`, data),
};

export default commentService;
