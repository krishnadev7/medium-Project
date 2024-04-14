import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import FullBlog from "./FullBlog";

function Blog() {
  const {id} = useParams()
  const {blog,loading} = useBlog({id:id || ""});
  if(loading){
    return <div>
      loading... 
    </div>
  }
  return (
    <div><FullBlog blog={blog}/></div>
  )
}

export default Blog