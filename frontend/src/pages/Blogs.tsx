import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

function Blogs() {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>Loding...</div>;
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          {blogs.map((blog) => (
            <BlogCard
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate="12th Apr 2024"
              id={blog.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
