import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import img1 from '../images/s1.png';
import img2 from '../images/s2.jpg';
import img3 from '../images/s3.jpg';
import img4 from '../images/s4.jpg';

const Intro = () => {
    return (
        <>

            <section>
                <Container style={{ marginTop: '120px' }}>
                    <Row className="justify-content-center">
                        <Col xs={12} md={8}>
                            <h1 className="mb-4 hd2" >Welcome to Our Blog Posting Platform</h1>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '50px' }} className="justify-content-center">
                        <Col xs={12} md={6}>
                            <div style={{ marginTop: '100px' }}>
                                <h5 className=' fw-bold '>Share Your Thoughts, Share Your Stories</h5>
                                <div>
                                    Here at our blog posting platform, we believe that everyone has a story to tell and insights worth sharing. With our intuitive interface, you can effortlessly upload your posts and connect with a global audience. Whether it's a personal anecdote, a professional opinion, or a creative masterpiece, your words have the power to inspire and engage.
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div>
                                <img src={img1} alt="" width={'100%'} />
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '50px' }} className="justify-content-center">
                        <Col xs={12} md={6}>
                            <div>
                                <img src={img2} alt="" width={'100%'} />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div style={{ marginTop: '100px' }}>
                                <h5 className=' fw-bold '>Effortless Editing and Management</h5>
                                <div>
                                    Editing your posts has never been easier. Our platform offers a range of tools to help you fine-tune your content to perfection. From formatting options to spell-checking features, we've got you covered. And when it comes to managing your account, it's as simple as a few clicks. Update your details, delete or modify posts – all from one convenient dashboard.
                                </div>
                            </div>

                        </Col>
                    </Row>
                    <Row style={{ marginTop: '50px' }} className="justify-content-center">
                        <Col xs={12} md={6}>
                            <div style={{ marginTop: '100px' }}>
                                <h5 className=' fw-bold '>Join Our Community of Creatives</h5>
                                <div>
                                    Become a part of our vibrant community of writers, thinkers, and storytellers. Connect with like-minded individuals, share ideas, and support one another's creative endeavors. Whether you're seeking feedback on your latest piece or looking for inspiration for your next project, you'll find a welcoming community ready to cheer you on.
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div>
                                <img src={img3} alt="" width={'100%'} />
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '50px', marginBottom:'50px' }} className="justify-content-center">
                        <Col xs={12} md={6}>
                            <div>
                                <img src={img4} alt="" width={'100%'} />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div style={{ marginTop: '100px' }}>
                                <h5 className=' fw-bold '>Start Sharing Your Stories Today</h5>
                                <div>
                                    Ready to unleash your creativity? Sign up now and start sharing your stories with the world. Whether you're a seasoned blogger or a first-time writer, our platform provides the perfect space to showcase your talents and connect with a global audience. Join us today and let your voice be heard!
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    )
}

export default Intro