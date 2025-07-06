import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import postService from "../api/postService";

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    author: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      setForm((prev) => ({ ...prev, author: user._id }));
    }

    if (id) {
      postService.getPost(id).then((post) => {
        setForm({
          title: post.title,
          content: post.content,
          category: post.category || "",
          author: post.author || "",
        });
      });
    }
  }, [id]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("category", form.category);
      formData.append("author", form.author);
      formData.append("slug", generateSlug(form.title));

      if (image) {
        formData.append("image", image);
      }

      if (id) {
        await postService.updatePost(id, formData);
      } else {
        await postService.createPost(formData);
      }

      navigate("/");
    } catch (error) {
      console.error("Failed to save post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full border p-2"
        required
      />
      <textarea
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="w-full border p-2"
        rows={8}
        required
      />
      <input
        type="text"
        placeholder="Author"
        className="w-full border p-2"
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="w-full border p-2"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="block"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
}
