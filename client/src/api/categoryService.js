import API from "./api";

const categoryService = {
  getAllCategories: () => API.get("/categories"),
  getCategory: (id) => API.get(`/categories/${id}`),
  createCategory: (data) => API.post("/categories", data),
  updateCategory: (id, data) => API.put(`/categories/${id}`, data),
  deleteCategory: (id) => API.delete(`/categories/${id}`),
};

export default categoryService;
