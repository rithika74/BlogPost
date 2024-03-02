import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const Create = () => {
    const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission
    console.log('Submitted:', { title, content, image });
  };

  return (
    <section className='d-flex justify-content-center'>
      <Container style={{ marginTop: '150px' }}>
        <h1>Create Your Post</h1>
        <Form onSubmit={handleSubmit} style={{ marginTop: '20px' }} id='label'>
          <Form.Group controlId="title">
            <FloatingLabel controlId="floatingTextarea" label="Enter Title">
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="content" id='label'>
            <FloatingLabel controlId="floatingTextarea2" label="Enter Content">
              <Form.Control
                as="textarea"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter content"
                style={{ height: '200px' }}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="image">
            <FloatingLabel controlId="floatingInput" label="Choose Image" >
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </FloatingLabel>
          </Form.Group>
          <Button type="submit" id='post'>
            Create Post
          </Button>
        </Form>
      </Container>
    </section>
    
    )
}

export default Create