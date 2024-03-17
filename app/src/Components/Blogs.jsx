import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      let response = await axios.get('http://localhost:5000/blogs');
      console.log(response.data);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  console.log("kjhhhkjkjh", blogs);
  return (
    <>
      <section style={{ marginTop: '120px' }} className='d-flex justify-content-center'>
        <div className='blogs' style={{gap:'10px'}}>
          {blogs.length > 0 ? (
            blogs.map(item => (
              <div key={item._id} className='blogs'>
                <Card style={{  cursor:'pointer' }} className='card' onClick={() => { navigate(`/home/blogdetails/${item._id}`) }}>
                  <Card.Img variant="top" src={`http://localhost:5000/uploads/blog/${item.image}`} alt="blog" height={'200px'} />
                  <Card.Body>
                    <Card.Title>
                      <h2>{item.title}</h2>
                    </Card.Title>
                    <Card.Text>
                      <div>{item.content.length > 100 ? `${item.content.substring(0, 100)}...` : item.content}</div>
                      {item.content.length > 100 && (
                        <div className="read-more">
                          <Link >Read More</Link>
                        </div>
                      )}
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
  );
}

export default Blogs;


