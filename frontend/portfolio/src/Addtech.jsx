import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-grid-system';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
// import { set } from 'mongoose';

function Addtech() {
    const [tech, setTech] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [techlist, setTechlist] = useState([]);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'tech') {
            setTech(value);
        } else {
            setImageFile(e.target.files[0]);
        }
    };

    

    const submitHandler = () => {
        const formData = new FormData();
        formData.append("tech", tech);
        formData.append("image", imageFile);

        axios.post("https://port-asbo.onrender.com/addtech", formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
            },
        })
        .then((response) => {
            console.log(response.data);
            setTechlist((prev)=>[...prev, response.data]);
            // setTech("");
            // setImageFile(null);
        })
        .catch((err) => {
            console.log(err);
            // setTechlist((prev)=>[response.data, ...prev])
        });
        // window.location.reload(false)
        // setTech("")
        // setImageFile(null)
    };

    useEffect(() => {
        axios.get("https://port-asbo.onrender.com/techget").then((response) => {
            setTechlist(response.data);
        });
    }, []);

    const dlt = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            axios.delete(`https://port-asbo.onrender.com/techdlt/${id}`)
            .then((response) => {
                console.log(response);
                setTechlist(techlist.filter(item => item._id !== id));
            })
            .catch((err) => {
                console.log(err);
            });
        }
    };

    return (
        <div>
            <Row>
                <Col xs={1} md={4}></Col>
                <Col xs={10} md={4}>
                    {/* <Row>
                        <Col xs={10}> */}
                            <Form.Control 
                                type='text' 
                                name='tech' 
                                value={tech} 
                                onChange={changeHandler} 
                                style={{ width: "100%", padding: "5px"}} 
                                placeholder='Enter Your Technical Skills' 
                                className='mb-2'
                            />
                            <Form.Control 
                                type='file' 
                                name='image' 
                                onChange={changeHandler} 
                                style={{ width: "100%", padding: "5px" }} 
                                accept='image/*' 
                            />
                        {/* </Col> */}
                        {/* <Col xs={2}> */}
                            <Button className='mt-2'
                                type='button' 
                                onClick={submitHandler} 
                                
                            >
                                Add
                            </Button>
                        {/* </Col>
                    </Row> */}
                </Col>
                <Col xs={1} md={4}></Col>
            </Row>

            <Row>
                <Col xs={1} md={3}></Col>
                <Col xs={10} md={6}>
                    <div className='table-responsive'>
                    <Table striped bordered hover className="shadow-lg" style={{ color: "rgb(136,146,176)", width: "100%", border: "2px solid white", marginTop: "50px" }}>
                        <thead>
                            <tr>
                                <th style={{ color: "Highlight" }}>Submitted Technical Skill</th>
                                <th style={{ color: "Highlight" }}>Image</th>
                                <th style={{ color: "Highlight" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {techlist.map((data) => {
                                return (
                                    <tr key={data._id}>
                                        <td>{data.tech}</td>
                                        <td>
                                        <img 
                                            src={data.ImageUrl}
                                            alt={data.ImageUrl} 
                                            style={{ height: "50px", width: "50px", objectFit: "cover" }} 
                                            />
                                        </td>
                                        <td>
                                            <Button 
                                                type='button' 
                                                onClick={() => dlt(data._id)} 
                                                className='bg-danger border-danger'
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    </div>
                </Col>
                <Col xs={1} md={3}></Col>
            </Row>
        </div>
    );
}

export default Addtech;
