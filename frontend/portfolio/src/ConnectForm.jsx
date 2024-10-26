import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-grid-system';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ConnectForm() {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        number: "",
        query: ""
    });

    const [text, setText] = useState("");
    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const validate = () => {
        let newErrors = {};

        if (!input.fullname) newErrors.fullname = "Enter Your Name";
        else if (input.fullname.length < 3) newErrors.fullname = "Name Must be more than 3 characters";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!input.email) newErrors.email = "Please Enter your email";
        else if (!emailRegex.test(input.email)) newErrors.email = "E-mail format is invalid";

        if (!input.number) newErrors.number = "Please Enter your Contact Number";
        else if (isNaN(input.number)) newErrors.number = "Should be in number form";
        else if (input.number.length < 10) newErrors.number = "Please enter valid mobile number";

        if (!input.query) newErrors.query = "Please enter your message";
        else if (input.query.length < 10) newErrors.query = "Message should not be less than 10 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitHandler = () => {
        if (validate()) {
            console.log("Submitting:", input);
            axios.post("https://port-asbo.onrender.com/contactform", {
                fullname: input.fullname,
                email: input.email,
                number: input.number,
                query: input.query
            })
            .then((response) => {
                console.log(response.data);
                setText("Thanks for your time. I will contact you soon.");
                setInput({ fullname: "", email: "", number: "", query: "" });
                setTimeout(() => {
                    setText("");
                }, 4000);
            })
            .catch((err) => {
                console.log(err);
                setText("An error occurred while submitting the form. Please try again.");
            });
        }
    };

    return (
        <div style={{ marginTop: "100px", marginBottom: "20px" }}>
            <h1 style={{ color: "rgb(204,215,247)" }}><i>Will Connect You...</i></h1>
            <Row>
                <Col xs={2} md={3.5}></Col>
                <Col xs={8} md={5} className='mt-4'>
                    <Form>
                        <Form.Control type='text' name='fullname' value={input.fullname} onChange={changeHandler} placeholder='Your Name' className='mt-2 shadow-lg contactinput' style={{ borderColor: "Black", boxShadow: "rgba(255, 255, 255, 0.2)", textAlign: "center" }} autoComplete='off' />
                        {errors.fullname && <span style={{ color: "red" }}>{errors.fullname}</span>}
                        <Form.Control type='email' name='email' value={input.email} onChange={changeHandler} placeholder='Your E-mail' className='mt-2 shadow-lg contactinput' style={{ borderColor: "Black", boxShadow: "rgba(255, 255, 255, 0.2)", textAlign: "center" }} autoComplete='off' />
                        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                        <Form.Control type='number' name='number' value={input.number} onChange={changeHandler} placeholder='Your Contact Number' className='mt-2 shadow-lg contactinput' style={{ borderColor: "Black", boxShadow: "rgba(255, 255, 255, 0.2)", textAlign: "center" }} autoComplete='off' />
                        {errors.number && <span style={{ color: "red" }}>{errors.number}</span>}
                        <Form.Control as='textarea' name='query' value={input.query} onChange={changeHandler} placeholder='Your Message...' className='mt-2 shadow-lg contactinput' style={{ borderColor: "Black", boxShadow: "rgba(255, 255, 255, 0.2)", textAlign: "center" }} autoComplete='off' />
                        {errors.query && <span style={{ color: "red" }}>{errors.query}</span>}
                        <div className='text-info mt-2'>{text}</div>
                        <Button type='button' onClick={submitHandler} className='mt-2 shadow-lg ps-4 pe-4' style={{ backgroundColor: "black", borderColor: "grey", color: "white", textAlign: "center" }}>Submit</Button>
                        {/* <h5 className='text-info'>{text}</h5> */}
                        <hr style={{ color: "rgb(204,215,247)", width: "100%" }} />
                    </Form>
                </Col>
                <Col xs={2} md={3.5}></Col>
            </Row>
        </div>
    );
}

export default ConnectForm;
