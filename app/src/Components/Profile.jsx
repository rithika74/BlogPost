import React, { useEffect, useState } from 'react';
import img from '../images/profile.jpg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {

    const [data, setData] = useState({
        fullname: '',
        email: '',
        password: ''
    });
    const [update, setUpdate] = useState({
        fullname: '',
        email: '',
        password: '',
        image: null
    });

    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/findOne/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
                setUpdate(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();
    }, [id, token]);

    const handleChange = (event) => {
        setUpdate({ ...update, [event.target.name]: event.target.value })
    };


    const handleImageChange = (event) => {
        setUpdate({ ...update, image: event.target.files[0] });
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('fullname', update.fullname || data.fullname);
        formData.append('email', update.email || data.email);
        if (update.password !== data.password) {
            formData.append('password', update.password);
        }
        formData.append('image', update.image);

        console.log('Form Data:', formData);

        try {
            let response = await axios.put(`http://localhost:5000/update/${id}`, formData, {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
            });
            console.log(response);
            setUpdate(prevState => ({
                ...prevState,
                fullname: response.data.fullname,
                email: response.data.email,
                password: response.data.password,
                image: response.data.image
            }));
            toast.success('Profile Updated successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error updating profile:', error);
        }



    }

    console.log('fsjhjh', data);
    console.log('fsff', update);

    return (
        <>


            <section className='d-flex justify-content-center align-items-center ' style={{ marginTop: '120px' }}>
                <div className=' container '>
                    <div className='profile'>
                        <div className=''>
                            <div className='editpro'>
                                <form action="" onSubmit={handleUpdate}>
                                    <div className='img'>
                                        {update.image ? (
                                            <img src={`http://localhost:5000/uploads/profile/${update.image}`} alt="" width={'150px'} height={'150px'} style={{ borderRadius: '100px' }} />
                                        ) : (
                                            <img src={img} alt="" width={'150px'} height={'150px'} style={{ borderRadius: '100px' }} />
                                        )}
                                        <h1>{update.fullname}</h1>
                                        <Link to={`/home/userblogs/${id}`}><button>Your Blogs</button></Link>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fullname">Full Name</label>
                                        <input type="text" id="fullname" name="fullname" onChange={handleChange} value={update.fullname} placeholder='fullname' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input type="email" id="email" name="email" onChange={handleChange} value={update.email} placeholder='email' />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" id="password" name="password" onChange={handleChange} placeholder="Change Password" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="image">Add Profile Photo</label>
                                        <input type="file" name="image" id="" onChange={handleImageChange} />
                                    </div>
                                    <button type="submit">Update Profile</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ToastContainer />

        </>
    )
}

export default Profile


