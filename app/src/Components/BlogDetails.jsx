import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
    const { id } = useParams();
    const [blogs, setBlogs] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/blogOne/${id}`);
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <>
            <section style={{marginTop:'120px'}}>
                <div>
                    <div className='details container'>
                        <h1>{blogs.title}</h1>
                        <img src={`http://localhost:5000/uploads/blog/${blogs.image}`} alt="" />
                        <div>{blogs.content}</div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BlogDetails;
