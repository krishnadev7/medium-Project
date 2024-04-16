import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import { Publish } from './components/Publish'

function App() {

  return (
  <>
  <BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/blog/:id" element={<Blog/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/publish" element={<Publish/>}/>
    </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
