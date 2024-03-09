import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Css/Style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Intro from './Components/Intro';
import About from './Components/About';
import Create from './Components/Create';
import { Provider } from 'react-redux';
import { Store } from './Components/Store';
import Profile from './Components/Profile';
import EditProfile from './Components/EditProfile';
import Blogs from './Components/Blogs';
import EditPost from './Components/EditPost';
import UserBlogs from './Components/UserBlogs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<Intro />} />
            <Route path='blogs' element={<Blogs />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='add' element={<Create />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/editprofile/:id' element={<EditProfile />} />
            <Route path='/editpost/:id' element={<EditPost />} />
            <Route path='/userblogs/:id' element={<UserBlogs />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
