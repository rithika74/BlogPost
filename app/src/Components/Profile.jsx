import React, { useEffect, useState } from 'react';
import img from '../images/profile.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {

    const [data, setData] = useState({});
    const [update, setUpdate] = useState({
        fullname: '',
        email: '',
        password: '',
        newpassword: ''
    });
    const [image, setImage] = useState(null)

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
        setImage(event.target.files[0]);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('fullname', update.fullname);
        formData.append('email', update.email);
        formData.append('password', update.password);
        formData.append('newpassword', update.newpassword);
        formData.append('image', image);

        try {
            let response = await axios.post(`http://localhost:5000/update/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log(response);
            toast.success('Profile Updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }

    }

    return (
        <>


            <section className='d-flex justify-content-center align-items-center ' style={{ marginTop: '150px' }}>
                <div className=' container '>
                    <div className='row '>
                        <div className='col img' style={{ marginLeft: '200px', marginTop: '50px', display:'flex', flexDirection:'column' }}>
                            <img src={img} alt="" width={'300px'} height={'300px'} style={{ borderRadius: '20px' }} />
                            <Link to={`/userblogs/${id}`}><button>Your Blogs</button></Link>
                        </div>
                        <div className='col'>
                            <div className='editpro'>
                                <form action="" onSubmit={handleUpdate}>
                                    <div className="form-group">
                                        <input type="text" id="fullname" name="fullname" onChange={handleChange} value={update.fullname ? update.fullname : ''} placeholder={data.fullname} />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" id="email" name="email" onChange={handleChange} value={update.email ? update.email : ''} placeholder={data.email} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" id="password" name="password" onChange={handleChange} value={update.password ? update.password : ''} placeholder="Current Password" />
                                    </div>
                                    {/* <div className="form-group">
                                        <input type="password" id="newpassword" name="newpassword" onChange={handleChange} value={update.newpassword ? update.newpassword : ''} placeholder="New Password" />
                                    </div> */}
                                    <div className="form-group">
                                        <input type="file" name="image" id="" onChange={handleImageChange}/>
                                    </div>
                                    <button type="submit">Update Profile</button>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </>
    )
}

export default Profile



// import React from 'react';

// const Profile = () => {
//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-4 col-md-offset-4 col-sm-6 col-xs-12 profile-badge">
//                     <div className="profile-pic">
//                         <img alt="User Pic" src="https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png" id="profile-image1" height="200"/>
//                         <input id="profile-image-upload" className="hidden" type="file" onChange={(e) => console.log(e.target.files[0])} />
//                         <div style={{ color: '#999' }}>  </div>
//                     </div>
//                     <div className="user-detail text-center">
//                         <div className="form-group">
//                             <label htmlFor="Fname">First Name</label>
//                             <input type="text" className="form-control" id="Fname" placeholder="Enter First Name" name="name"/>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="Lname">Last Name</label>
//                             <input type="text" className="form-control" id="Lname" placeholder="Enter Last Name" name="name"/>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="mobile">Mobile Number</label>
//                             <input type="text" className="form-control" id="Mobile" placeholder="Enter Mobile Number" name="Mobile"/>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="email">Mail ID</label>
//                             <input type="email" className="form-control" id="email" placeholder="Enter Mail" name="mail"/>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="age"> Age</label>
//                             <input type="number" className="form-control" id="age" placeholder="Enter Age" name="age"/>
//                         </div>
//                         <input type="Button" className="btn btn-info" value="Update Profile"/>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;

