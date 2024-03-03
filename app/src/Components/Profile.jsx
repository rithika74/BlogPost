import React, { useEffect, useState } from 'react'
import img from './img.png'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';

const Profile = () => {

    // const { id } = useParams()
    // const [data, setData] = useState([''])

    // useEffect(() => {
    //     let fetchdata = async () => {
    //         let response = await axios.get(`http://localhost:5000/findOne/${id}`)
    //         console.log(response.data);
    //         setData(response.data)
    //     }
    //     fetchdata()
    // }, [])
    // console.log(data);

    return (
        <>


            <section className='d-flex justify-content-center'>
                    <Card className="user-profile-card">
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <Card.Img variant="top" src={img} className="user-profile-image" style={{borderRadius:'100%',width:'200px',height:'200px'}} />
                            <Card.Body className="user-profile-details">
                                <Card.Title>
                                    <h2>Your Name</h2>
                                </Card.Title>
                                <Card.Text>
                                    <div>
                                        <Link to={`/editprofile`}><button>Edit Profile</button></Link>
                                        <button>Your Blogs</button>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </div>
                    </Card>
                    {/* <div className="user-profile-image">
                        <img src={img} alt='' />
                    </div>
                    <div className="user-profile-details">
                        <h2>your name</h2>
                        <div>
                            <button>Edit Profile</button>
                            <button>Your Blogs</button>
                        </div>
                    </div> */}
            </section>



        </>
    )
}

export default Profile

