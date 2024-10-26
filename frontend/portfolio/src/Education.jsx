import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Row, Col} from 'react-grid-system'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

function Education() {
    const [input, setInput]= useState({
        course:"",
        branch:"",
        year:""
    })

    const[imageFile, setImageFile]= useState(null)

    const [data, setData]= useState([])

    const changeHandler=(e)=>{
        const {name,value}= e.target;
        setInput((prev)=>({
            ...prev,
            [name]: value
        }))
    }
    const fileHandler=(e)=>{
        setImageFile(e.target.files[0])
    }

    const submitHandler=()=>{
        if(!input.course || !input.branch || !input.year || !imageFile){
            alert("Please fill all fields")
            return
        }
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('course', input.course)
        formData.append('branch', input.branch)
        formData.append('year', input.year)
        axios.post("https://port-asbo.onrender.com/education", formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then((response)=>{
            console.log(response.data);
            setData((prev)=>[response.data, ...prev])
        }).catch((err)=>{
            console.log(err);
        })
        // window.location.reload(false)
        setInput({
            branch:"",
            course:"",
            year:""
        })
        setImageFile(null)
    }

    useEffect(()=>{
        axios.get('https://port-asbo.onrender.com/eduget').then((response)=>{
            // const sortedData= response.data.sort((a,b)=>
            //     new Date(b.createdAt) - new Date(a.createdAt)
            // )
            setData(response.data)
        })
    },[])

    const dlt = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            axios.delete(`https://port-asbo.onrender.com/edudelete/${id}`)
                .then((response) => {
                    console.log(response);
                    // Optionally update state to remove the deleted item from the list
                    setData((prevData) => prevData.filter(item => item._id !== id));
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };
    
  return (
    <div>
      <Row>
        <Col xs={1} md={4}></Col>
        <Col xs={10} md={4}>
        <h1 style={{color:"rgb(136,146,176)", textDecoration:"underline"}} className='mt-4'>Education Background</h1>
            <Form>
                <Form.Control type='file' name='eduImage' onChange={fileHandler} className='m-2'/>
                <Form.Control type='text' name='course' value={input.course} placeholder='Enter your course' onChange={changeHandler}className='m-2'/>
                <Form.Control type='text' name='branch' value={input.branch} placeholder='Enter your branch' onChange={changeHandler}className='m-2'/>
                <Form.Control type='number' name='year' value={input.year} placeholder='Completed Year' onChange={changeHandler}className='m-2'/>
                <Button type='button' onClick={submitHandler}>Add</Button>
            </Form>
        </Col>
        <Col xs={1} md={4}></Col>
      </Row>

      <Row>
        <Col xs={1} md={2}></Col>
        <Col xs={10} md={8} className='mt-4'>
            <div className='table-responsive'>
            <Table striped border>
                <thead>
                    <tr>
                        <th style={{color:"Highlight"}}>Course</th>
                        <th style={{color:"Highlight"}}>Branch</th>
                        <th style={{color:"Highlight"}}>Year</th>
                        <th style={{color:"Highlight"}}>Image</th>
                        <th style={{color:"Highlight"}}>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((data)=>{
                        return(
                            <>
                                <tr>
                                    <td>{data.course}</td>
                                    <td>{data.branch}</td>
                                    <td>{data.year}</td>
                                    <td>
                                        <img src={data.eduImage} alt={data.eduImage} style={{height:"50px", width:"50px"}}/>
                                    </td>
                                    <td>
                                        <Button type='button' onClick={()=>dlt(data._id)} className='bg-danger border-danger'>Delete</Button>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </Table>
            </div>
        </Col>
        <Col xs={1} md={2}></Col>
      </Row>
    </div>
  )
}

export default Education
