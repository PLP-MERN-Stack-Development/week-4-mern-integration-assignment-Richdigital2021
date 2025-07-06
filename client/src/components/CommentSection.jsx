import { useEffect, useState } from "react";
import { postService } from "../api/api";

export default function CommentSection({ postId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const data = await postService.getPost(postId); // Includes comments?
      setComments(data.comments || []); // adjust based on response
    } catch (err) {
      console.error("Failed to load comments:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleComment = async () => {
    try {
      await postService.addComment(postId, {
        content: comment,
        author: "Anonymous",
      });
      setComment("");
      fetchComments();
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-bold mb-2">Comments</h3>
      <textarea
        className="w-full border p-2"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
      />
      <button
        className="bg-green-500 text-white px-4 py-1 mt-2"
        onClick={handleComment}
      >
        Add Comment
      </button>
      <ul className="mt-4">
        {comments.map((c) => (
          <li key={c._id} className="border-b py-2">
            <p>{c.content}</p>
            <small className="text-gray-500">{c.author}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
