import {Route, Routes, Navigate} from  "react-router-dom"
import Home from '../pages/home/index'
import PostList from '../pages/posts/index'
import PostDetail from '../pages/posts/detail'
import PostNew from '../pages/posts/new'
import PostEdit from "../pages/posts/edit"
import ProfilePage from "../pages/profile"
import LoginPage from "../pages/login"
import SignupPage from "../pages/signup"

export default function Router() {
  return (
  <>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/posts" element={<PostList />} />
    <Route path="/posts/:id" element={<PostDetail/>} />
    <Route path="/posts/new" element={<PostNew/>} />
    <Route path="/posts/edit/:id" element={<PostEdit/>} />
    <Route path="/profile" element={<ProfilePage/>} />
    <Route path="/login" element={<LoginPage/>} />
    <Route path="/signup" element={<SignupPage/>} />
    <Route path="*" element={<Navigate replace to="/" />} /> {/* default Path - force replaced to root page */}
  </Routes>
  </>
  );
}

