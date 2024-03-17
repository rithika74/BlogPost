import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Signup = () => {

  const [data, setData] = useState({
    fullname: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('id')
    if (user) {
      navigate('/home')
    }
  })

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (data.fullname && data.email && data.password) {
      try {
        const response = await axios.post('http://localhost:5000/insert', data);
        if (response.data.emailExists) {
          toast.error('Email already exists.');
        } else {
          toast.success('Registration successful');
          setData('');
          navigate('/login');
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          toast.error('Email already exists.');
        } else {
          console.error('Error during signup:', error);
          toast.error('An error occurred while processing your request.');
        }
      }
    } else {
      toast.error('Please fill in all fields.');
    }
  };

  return (
    <>

      <section className='d-flex justify-content-center '>
        <div className='main'>
          <form action="" onSubmit={handleSubmit}>
            <div>
              <h1 className=' fw-semibold '>SIGN UP</h1>
              <input type="text" name="fullname" onChange={handleChange} value={data.fullname ? data.fullname : ''} id="" placeholder='Fullname' />
              <input type="email" name="email" onChange={handleChange} value={data.email ? data.email : ''} id="" placeholder='Email' />
              <input type="password" name="password" onChange={handleChange} value={data.password ? data.password : ''} id="" placeholder='Password' />
              <button>Sign Up</button>
              <Link to={'/login'} className='mt-4'>
                Already have an Account?
              </Link>
            </div>
          </form>
        </div>
      </section>

      <ToastContainer />

    </>
  )
}

export default Signup

