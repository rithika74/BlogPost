import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const Create = () => {

  const [data, setData] = useState({
    title: '',
    content: ''
  });
  const [image, setImage] = useState('')

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  console.log(image);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const authorId = localStorage.getItem('id');
      console.log(authorId);
      const postData = {
        ...data,
        author: authorId
      };

      const formData = new FormData();

      formData.append('title', postData.title);
      formData.append('content', postData.content);
      formData.append('image', image);
      formData.append('author', authorId);

      let response = await axios.post('http://localhost:5000/addblog', formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      console.log("ghffgjgg",response.data);
      if (response.data) {
        toast.success('Blog Posted Successfully');
        setData({
          title: '',
          content: ''
        });
        setImage('');
      }
    } catch (error) {
      console.error('Error adding blog post:', error);
    }
  };


  return (
    <>


      <section className='d-flex justify-content-center container ' style={{ marginTop: '120px' }}>
        <div className='blogpost'>
          <h1 className=' fw-semibold '>Create Your Blog</h1>
          <form action="">
            <div className='post'>
              <div><input type="text" name="title" onChange={handleChange} value={data.title ? data.title : ''} id="" placeholder='Title' /></div>
              <div><textarea name="content" onChange={handleChange} value={data.content ? data.content : ''} id="" cols="65" rows="10" placeholder='Content'></textarea></div>
              <div><input type="file" name="image" onChange={handleImageChange} id="" style={{ padding: '0px' }} /></div>
              <div><button onClick={handleSubmit}>Submit</button></div>
            </div>
          </form>
        </div>
      </section>


      <ToastContainer />

    </>



  )
}

export default Create


