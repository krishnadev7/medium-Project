import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Blog from './pages/Blog'

function App() {

  return (
  <>
  <BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/blog/:id" element={<Blog/>}/>
    </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
