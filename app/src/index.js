import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Css/Style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Intro from './Components/Intro';
import Create from './Components/Create';
import Profile from './Components/Profile';
import Blogs from './Components/Blogs';
import EditPost from './Components/EditPost';
import UserBlogs from './Components/UserBlogs';
import BlogDetails from './Components/BlogDetails';
import LoginNav from './Components/LoginNav';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginNav />}>
          <Route index element={<Intro />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='blogs' element={<Blogs />} />
        </Route>
        <Route path='/home' element={<Home />}>
          <Route index element={<Intro />} />
          <Route path='blogs' element={<Blogs />} />
          <Route path='add' element={<Create />} />
          <Route path='profile' element={<Profile />} />
          <Route path='editpost/:id' element={<EditPost />} />
          <Route path='userblogs/:id' element={<UserBlogs />} />
          <Route path='blogdetails/:id' element={<BlogDetails />} />
        </Route>

      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
