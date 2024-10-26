import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Row, Col } from 'react-grid-system';

function Experience() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("https://port-asbo.onrender.com/experienceget")
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className='container' style={{marginTop:"100px"}}>
            <h1 style={{ color: "rgb(204,215,247)" }}><i>Professional Journey</i></h1>
            <Row className='mt-4'>
                {/* <Col xs={1} md={0}></Col> */}
            {data.map((data) => (
        <Col xs={12} md={6} key={data._id}>
            <Card className='mt-4 card-shadow expCard' style={{ borderRadius: "20px"}}>
                <Card.Img src={data.expImage} variant='top' className='eduImg' style={{ borderTopLeftRadius: "20px",borderTopRightRadius:"20px", height:"300px", objectFit:"cover" }} />
                <Card.Body style={{ backgroundColor: "black", color: "rgb(204,215,247)" }} className='eduBody expBody'>
                    <Card.Title>{data.comName}</Card.Title>
                    <Card.Text>
                        <div>
                            <b></b> {data.designation}
                        </div>
                        <div>
                            <p>{data.duration}</p>
                            
                        </div>
                        <div>
                            <p>{data.expAbout}</p>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    ))}
    {/* <Col xs={1} md={0}></Col> */}
            </Row>
        </div>
    );
}

export default Experience;
