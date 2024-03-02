import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Intro = () => {
    return (
        <>

            <section>
                <Container style={{marginTop:'200px'}}>
                    <Row >
                        <Col>
                            <h1>
                                Welcome To Blog Post
                            </h1>
                        </Col>
                        <Col>
                            <div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum explicabo aperiam consequuntur, cumque natus exercitationem mollitia optio minus dolorum sed suscipit! Doloremque asperiores ratione eligendi ea, mollitia quia quibusdam? Quibusdam!
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    )
}

export default Intro