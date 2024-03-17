import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const Login = () => {

  
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate()
  
  useEffect(() => {
    const user = localStorage.getItem('id')
    if (user) {
      navigate('/home')
    }
  }, [])

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let response = await axios.post('http://localhost:5000/loginOne', data)
      console.log(response.data);
      const token = response.data.token;
      console.log(token);
      localStorage.setItem('token', token)
      localStorage.setItem('id', response.data.user._id)

      if (response.data) {
        console.log('success');
        toast.success('Login success')
        navigate('/home')
      }
      else {
        toast.error('Login Failed')
      }

    } catch (e) {
      toast.error('Login Failed');
    }
  }

  return (
    <>

      

      <section className='d-flex justify-content-center '>
        <div className='main'>
          <form action="" onSubmit={handleSubmit}>
            <div>
              <h1 className=' fw-semibold '>LOGIN</h1>
              <input type="email" name="email" onChange={handleChange} id="" placeholder='Email' />
              <input type="password" name="password" onChange={handleChange} id="" placeholder='Password' />
              <button>Login</button>
              <Link to={'/signup'} className='mt-4'>
                Don't have an Account?
              </Link>
            </div>
          </form>
        </div>
      </section>

      <ToastContainer />


    </>
  )
}

export default Login;
