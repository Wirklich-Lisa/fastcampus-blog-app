import './App.css';
import {Route, Routes, Navigate, Link} from  "react-router-dom"

function App() {
  return (
  <>
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/posts">Post Link</Link></li>
    <li><Link to="/post/:id">Post Detail</Link></li>
    <li><Link to="/post/new">Post New</Link></li>
    <li><Link to="/post/edit/:id">Post Edit</Link></li>
    <li><Link to="/profile">Profile</Link></li>
  </ul>
  <Routes>
    <Route path="/" element={<h1>Home Page</h1>} />
    <Route path="/posts" element={<h1>Post List Page</h1>} />
    <Route path="/post/:id" element={<h1>Post Detail Page</h1>} />
    <Route path="/post/new" element={<h1>Post New Page</h1>} />
    <Route path="/post/edit/:id" element={<h1>Post Edit Page</h1>} />
    <Route path="/profile" element={<h1>Profile Page</h1>} />
    <Route path="*" element={<Navigate replace to="/" />} /> {/* default Path - force replaced to root page */}
  </Routes>
  </>
  );
}

export default App;
