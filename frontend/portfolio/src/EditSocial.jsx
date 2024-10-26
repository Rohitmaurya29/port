import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Row, Col} from 'react-grid-system'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function EditSocial({selectedData, onClose}) {
    const [input, setInput]= useState({
        email:"",
        git:"",
        linkedIn:"",
        insta:""
    })

    const {id}= useParams();

    const changeHandler=(e)=>{
        const {name, value}= e.target;
        setInput((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    useEffect(()=>{
        if(selectedData){
            setInput({
                email:selectedData.email,
                git:selectedData.git,
                linkedIn:selectedData.linkedIn,
                insta:selectedData.insta
            })
        }
    },[selectedData])

    const submitHandler=()=>{
        axios.put(`https://port-asbo.onrender.com/socialupdate/${selectedData._id}`,input).then((response)=>{
            setInput({
                email:response.data.email,
                git:response.data.git,
                linkedIn:response.data.linkedIn,
                insta:response.data.insta
            })
            window.location.reload(false);
        })
    }
  return (
    <div>
        <Row>
            <Col xs={1}></Col>
            <Col xs={10}>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type='email' name='email' value={input.email} onChange={changeHandler} />
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Label>Github Link</Form.Label>
                        <Form.Control type='text' name='git' value={input.git} onChange={changeHandler}/>
                    </Col>

                    <Col xs={12} md={6}>
                        <Form.Label>LinkedIn Link</Form.Label>
                        <Form.Control type='text' name='linkedIn' value={input.linkedIn} onChange={changeHandler}/>
                    </Col>

                    <Col xs={12} md={6}>
                        <Form.Label>Instagram Link</Form.Label>
                        <Form.Control type='text' name='insta' value={input.insta} onChange={changeHandler}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={1}></Col>
        </Row>

        <Row>
            <Col xs={12}>
                <Button type='button' onClick={submitHandler}>Submit</Button>
            </Col>
        </Row>
    </div>
  )
}

export default EditSocial
