import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { postService } from "../api/api";
import CommentSection from "./CommentSection";

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPost(id);
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      {post.imageUrl && <img src={post.imageUrl} alt="" className="my-4" />}
      <p>{post.content}</p>
      <CommentSection postId={id} />
    </div>
  );
}
