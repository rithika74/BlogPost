import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserBlogs = () => {

    const { id } = useParams();
    const [blogs, setBlogs] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate=useNavigate();

    useEffect(() => {
        let fetchdata = async () => {
            try {
                let response = await axios.get(`http://localhost:5000/userblogs/${id}`);
                console.log(response.data);
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        }
        fetchdata();
    }, [id]);

    const handleDelete = async (id) => {
        console.log(id);
        const confirm = window.confirm('Are you sure you want to delete')
        try {
            if (confirm) {
                setRefresh(!refresh);
                let response = await axios.delete(`http://localhost:5000/deletepost/${id}`);
                console.log(response);
                window.location.reload();
            }
        } catch (error) {
            console.log('Error deleting blog post');
        }
    };

    return (
        <>

            <section style={{ marginTop: '150px' }} className='d-flex justify-content-center '>
                <div className='blogs' style={{gap:'10px'}}>
                    {blogs.length > 0 ? (
                        blogs.map(item => (
                            <div key={item._id} className='blogs'>
                                <Card style={{  cursor:'pointer' }} className='card'>
                                    <Card.Img variant="top" src={`http://localhost:5000/uploads/blog/${item.image}`} onClick={() => { navigate(`/home/blogdetails/${item._id}`) }} alt="img" height={'200px'} />
                                    <Card.Body >
                                        <Card.Title >
                                            <h2>{item.title}</h2>
                                        </Card.Title>
                                        {/* <Card.Text onClick={() => { navigate(`/home/blogdetails/${item._id}`) }}>
                                        <div>{item.content.length > 100 ? `${item.content.substring(0, 100)}...` : item.content}</div>
                                            {item.content.length > 100 && (
                                                <div className="read-more">
                                                    <Link >Read More</Link>
                                                </div>
                                            )}
                                        </Card.Text> */}
                                        <Card.Text >
                                            <div className='d-flex flex-wrap justify-content-end'>
                                                <Link to={`/home/editpost/${item._id}`}>
                                                    <button className='edit-btn' >
                                                        <FaEdit />
                                                    </button>
                                                </Link>
                                                <button className='delete-btn' onClick={() => handleDelete(item._id)}>
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    ) : (
                        <div style={{ fontSize: '28px', color: 'gainsboro', fontWeight: 'bold' }}>No Blogs Found</div>
                    )}
                </div>
            </section>



        </>
    )
}

export default UserBlogs


