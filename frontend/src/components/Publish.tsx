import axios from "axios";
import { Appbar } from "./Appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <textarea
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="title"
          ></textarea>
          <TextEditor
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button
            onClick={async () => {
              const res = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content,
                },
                {
                  headers: { Authorization: localStorage.getItem("token") },
                }
              );
              navigate(`/blog/${res.data.id}`);
            }}
            type="submit"
            className=" mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="mt-2">
      <form>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="my-2 bg-white rounded-t-lg">
            <label className="sr-only">Your comment</label>
            <textarea
              id="comment"
              onChange={onChange}
              rows={8}
              className="w-full px-0 text-sm text-gray-900 bg-white focus:outline-none "
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
}
