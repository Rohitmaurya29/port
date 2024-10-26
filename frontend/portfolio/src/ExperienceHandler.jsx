import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-grid-system';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import ExpUpdate from './ExpUpdate';

function ExperienceHandler() {
    const [input, setInput] = useState({
        comName: "",
        designation: "",
        duration: "",
        expAbout: ""
    });

    const [imageFile, setImageFile] = useState(null);
    const [data, setData] = useState([]);
    // const [show, setShow] = useState(false);
    // const [selectedData, setSelectedData] = useState(null);

    // const showHandler = (data) => {
    //     setShow(true);
    //     setSelectedData(data);
    // };

    

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const fileHandler = (e) => {
        setImageFile(e.target.files[0]);
    };

    const submitHandler = () => {
        if (!input.comName || !input.duration || !input.designation || !input.expAbout || !imageFile) {
            alert("Please Fill All Fields");
            return;
        }
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("comName", input.comName);
        formData.append("designation", input.designation);
        formData.append("duration", input.duration);
        formData.append("expAbout", input.expAbout);

        axios.post("https://port-asbo.onrender.com/experience", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response.data);
            setData((prev) => [response.data, ...prev]);
        }).catch((err) => {
            console.log(err);
        });
        
        // Reset input fields
        setInput({
            comName: "",
            designation: "",
            duration: "",
            expAbout: ""
        });
        setImageFile(null);
    };

    useEffect(() => {
        axios.get("https://port-asbo.onrender.com/experienceget").then((response) => {
            setData(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const dlt = (id) => {
        if (window.confirm("Are you sure want to delete?")) {
            axios.delete(`https://port-asbo.onrender.com/experiencedelete/${id}`).then((response) => {
                console.log(response.data);
                setData((prev) => prev.filter((item) => item._id !== id));
            }).catch((err) => {
                console.log(err);
            });
        }
    };

    const updateExperience = (updatedData) => {
        setData((prev) => prev.map(item => item._id === updatedData._id ? updatedData : item));
    };

    return (
        <div className='mt-5'>
            <h1 style={{ color: "rgb(136,146,176)", textDecoration: "underline" }}>Handle Experience</h1>
            <Row>
                <Col xs={1} md={4}></Col>
                <Col xs={10} md={4}>
                    <Form>
                        <Form.Control type='file' name='expImage' onChange={fileHandler} className='m-2' />
                        <Form.Control type='text' name='comName' value={input.comName} onChange={changeHandler} placeholder='Company Name' className='m-2' />
                        <Form.Control type='text' name='designation' value={input.designation} onChange={changeHandler} placeholder='Designation' className='m-2' />
                        <Form.Control type='text' name='duration' value={input.duration} onChange={changeHandler} placeholder='Duration' className='m-2' />
                        <Form.Control as='textarea' name='expAbout' value={input.expAbout} onChange={changeHandler} placeholder='About' className='m-2' />
                        <Button type='button' onClick={submitHandler} className='m-2'>Add</Button>
                    </Form>
                </Col>
                <Col xs={1} md={4}></Col>
            </Row>

            <Row>
                <Col xs={1} md={2}></Col>
                <Col xs={10} md={8}>
                    <div className='table-responsive'>
                    <Table striped border className='mt-4'>
                        <thead>
                            <tr>
                                <th style={{ color: "Highlight" }}>Company Name</th>
                                <th style={{ color: "Highlight" }}>Designation</th>
                                <th style={{ color: "Highlight" }}>Duration</th>
                                <th style={{ color: "Highlight" }}>About Experience</th>
                                <th style={{ color: "Highlight" }}>Company Image</th>
                                <th colSpan={2} style={{ color: "Highlight" }}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.comName}</td>
                                    <td>{item.designation}</td>
                                    <td>{item.duration}</td>
                                    <td>{item.expAbout}</td>
                                    <td>
                                        <a href={item.expImage}>
                                            <img src={item.expImage} alt={item.expImage} style={{ height: "50px", width: "50px" }} />
                                        </a>
                                    </td>
                                    {/* <td>
                                        <Button type='button' onClick={() => showHandler(item)}>Update</Button>
                                    </td> */}

                                    <td>
                                        <Button type='button' className='bg-danger border-danger' onClick={() => dlt(item._id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </div>
                </Col>
                <Col xs={1} md={2}></Col>
            </Row>

            {/* <Modal show={show} onHide={closeHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedData && (
                        <ExpUpdate
                            selectedData={selectedData}
                            onClose={closeHandler}
                            onUpdate={updateExperience} // Pass the update function
                        />
                    )}
                </Modal.Body>
            </Modal> */}
        </div>
    );
}

export default ExperienceHandler;
