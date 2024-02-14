import { useState } from "react";

import {Route, Routes, Navigate} from  "react-router-dom"
import Home from 'pages/home/index'
import PostList from 'pages/posts/index'
import PostDetail from 'pages/posts/detail'
import PostNew from 'pages/posts/new'
import PostEdit from "pages/posts/edit"
import ProfilePage from "pages/profile"
import LoginPage from "pages/login"
import SignupPage from "pages/signup"
import React from "react"

export default function Router() {
  // if firebase auth were identification, be changed at true
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  return (
  <>
  <Routes>
    {isAuthenticated ? (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/posts/:id" element={<PostDetail/>} />
      <Route path="/posts/new" element={<PostNew/>} />
      <Route path="/posts/edit/:id" element={<PostEdit/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="*" element={<Navigate replace to="/" />} /> {/* default Path - force replaced to root page */}
    </>
    ) : (
      <>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="*" element={<LoginPage/>} />
      </>
    )}
    
  </Routes>
  </>
  );
}

