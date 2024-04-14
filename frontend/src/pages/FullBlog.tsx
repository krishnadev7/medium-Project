import { Appbar } from "../components/Appbar";
import { AvatarName } from "../components/BlogCard";
import { Blog } from "../hooks";

const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Post on 2nd Dec 2024</div>
            <div>{blog.content}</div>
          </div>
          <div className="col-span-4">
            Author
            <div className="flex">
                <div className="pr-2 flex justify-center">
                <AvatarName name={blog.author.name || "Anonymous"}/>
                </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">Authors description</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
