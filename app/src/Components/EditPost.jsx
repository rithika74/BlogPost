import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const EditPost = () => {
    const { id } = useParams()
    const [blogs, setBlogs] = useState({});
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null
    });

    useEffect(() => {
        let fetchdata = async () => {
            try {
                let response = await axios.get(`http://localhost:5000/blogOne/${id}`);
                console.log(response.data);
                setBlogs(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        }
        fetchdata();
    }, [id]);
    console.log("sjih", blogs);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('image', formData.image);

        try {
            const response = await axios.put(`http://localhost:5000/updateblog/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("sjih", response.data);
            toast.success('Blog post updated successfully');
        } catch (error) {
            console.error('Error updating blog post:', error);
            toast.error('Error updating blog post');
        }
    };

    return (
        <>
            <section className='d-flex justify-content-center' style={{ marginTop: '150px' }}>
                <div  className='blogpost'>
                    <h1 className=' fw-semibold '>Edit Your Blog</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='post'>
                            <div><input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder='Title' /></div>
                            <div><textarea name="content" value={formData.content} onChange={handleInputChange} cols="65" rows="10" placeholder='Content'></textarea></div>
                            <div><input type="file" name="image" onChange={handleFileChange} style={{ padding: '0px' }} /></div>
                            <div><button type="submit">Submit</button></div>
                        </div>
                    </form>
                </div>
            </section>

            <ToastContainer />

        </>
    );
};

export default EditPost;


