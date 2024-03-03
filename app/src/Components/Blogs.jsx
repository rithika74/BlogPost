import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Blogs = () => {
  const [blogs, setBlogs] = useState('')

  useEffect(() => {
    getBlogs();
  }, [])

  const getBlogs = async () => {
    try {
      let response = await axios.get('http://localhost:5000/blogs');
      console.log(response.data); 
      setBlogs(response.data); 
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };
  

  console.log("kjhhhkjkjh",blogs);
  return (
    <>


      <section style={{ marginTop: '150px' }} className='d-flex justify-content-center '>
        <div>
          {blogs && (
            blogs.map(item => (
              <div key={item._id}>
                <h1>{item.title}</h1>
                <div>{item.content}</div>
                <img src={item.image} alt="img" />
              </div>
            )
            ))}
        </div>
      </section>




    </>
  )
}

export default Blogs