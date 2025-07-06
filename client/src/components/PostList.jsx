import { useEffect, useState } from "react";
import postService from "../api/postService";
import { Link } from "react-router-dom";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getAllPosts();
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts.");
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="p-4">No posts available.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id} className="mb-2">
            <Link
              to={`/posts/${post.slug}`}
              className="text-blue-500 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
