import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";

function Blogs() {
  return (
    <div>
      <Appbar/>
    <div className="flex justify-center">
      <div className="max-w-xl">
      <BlogCard
        authorName="krishnadev"
        title="krishnadev medium clone"
        content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's  
        "
        publishedDate="april 7 2024"
      />
      <BlogCard
        authorName="krishnadev"
        title="krishnadev medium clone"
        content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's  
        "
        publishedDate="april 7 2024"
      />
      <BlogCard
        authorName="krishnadev"
        title="krishnadev medium clone"
        content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's  
        "
        publishedDate="april 7 2024"
      />
      <BlogCard
        authorName="krishnadev"
        title="krishnadev medium clone"
        content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's  
        "
        publishedDate="april 7 2024"
      />
      </div>
    </div>
    </div>
  );
}

export default Blogs;
