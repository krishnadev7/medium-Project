import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-200 pb-4 pt-5 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
      <div className="flex justify-center flex-col">
        <AvatarName name={authorName} /> 
      </div>
      <div className="font-extralight pl-2">
      {authorName} . 
      </div>
      <div className="font-thin text-slate-500 pl-2">
      {publishedDate}
      </div>
      </div>
      <div className="text-xl font-semibold pt-2">{title}</div>
      <div className="text-md font-thin">
        {content.length > 100 ? content.slice(0, 100) + "..." : content}
      </div>
      <div className="text-slate-500 text-sm font-thin pt-4">{`${Math.ceil(content.length / 100)} min read`}</div>
    </div>
    </Link>
  );
};

export function AvatarName({ name }: { name: string }) {
 return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-xs text-gray-600 dark:text-gray-300">
      {name[0]}
    </span>
  </div>;
}
