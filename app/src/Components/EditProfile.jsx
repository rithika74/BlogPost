import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { adddata } from './DataSlice'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-bootstrap'

const EditProfile = () => {


    const [view, setView] = useState('')

    const { id } = useParams()

    useEffect(() => {
        let fetchdata = async () => {
            const response = await axios.get(`http://localhost:5000/findOne/${id}`)
            console.log(response.data);
            setView(response.data)
        }
        fetchdata();
    }, [])

    console.log("hgkj", id);

    const [data, setData] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(adddata(data));
        let response = await axios.put(`http://localhost:5000/update/${id}`, data)
        console.log(response);
        toast.success('Updated successfully');
    };


    return (
        <>

            <section className='d-flex justify-content-center' style={{ marginTop: '150px' }}>
                <div className='editpro'>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} value={data.fullname ? data.fullname : ''} id="fullname" name="fullname" placeholder={view.fullname}  />
                        </div>
                        <div className="form-group">
                            <input type="email" onChange={handleChange} value={data.email ? data.email : ''} id="email" name="email" placeholder={view.email}  />
                        </div>
                        <div className="form-group">
                            <input type="password" onChange={handleChange} value={data.password ? data.password : ''} id="password" name="password" placeholder={view.password}  />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </section>

            <ToastContainer/>

        </>
    )
}

export default EditProfile