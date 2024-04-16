import { Link } from "react-router-dom";
import { AvatarName } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div className="font-bold text-2xl">BlogApp</div>
      <div>
        <Link to='/publish'>
        <button
          type="button"
          className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          New
        </button>
        </Link>
        <AvatarName name="Krishnadev" />
      </div>
    </div>
  );
};
