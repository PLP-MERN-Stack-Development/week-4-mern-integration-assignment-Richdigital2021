import PostList from "../components/PostList";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recent Posts</h1>
      <PostList />
    </div>
  );
}
