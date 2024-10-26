import React, { useEffect, useState } from 'react'
import {Row, Col} from 'react-grid-system'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

function Flow() {
    const [imageFile, setImageFile]= useState(null)
    const [data, setData]= useState([]);

    const fileHandler=(e)=>{
        setImageFile(e.target.files[0]);
    }

    const submitHandler=()=>{
        if(!imageFile){
            alert("Please Uploadn Image File")
            return
        }
        const formData = new FormData();
        formData.append("image", imageFile);
        axios.post('https://port-asbo.onrender.com/skill', formData,{
            headers:{
                'Content-Type': 'multipart/form-Data'
            }
        }).then((response)=>{
            setData((prev)=>[...prev, response.data])
        }).catch((err)=>{
            console.log(err)
        })
        setImageFile(null)
    }
    
    useEffect(()=>{
        axios.get('https://port-asbo.onrender.com/skillget').then((response)=>{
            setData(response.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const dlt=(id)=>{
        if(window.confirm("Are you sure want to delete?")){
            axios.delete(`https://port-asbo.onrender.com/skilldelete/${id}`).then((response)=>{
                setData((prev)=>prev.filter((item)=>item._id !== id));
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
  return (
    <div className='mt-4 container'>
      <h2 style={{color:"rgb(136,146,176)", textDecoration:"underline"}}>Handle Skills</h2>
      <Row>
        <Col xs={1} md={4}></Col>
        <Col xs={10} md={4}>
            <Form.Control type='file' name='skillImage' onChange={fileHandler} className='m-2'/>
            <Button type='button' onClick={submitHandler} className='m-2'>Add</Button>

            <h5 style={{color:"rgb(136,146,176)"}} className='mt-2'>Submitted Skills</h5>
                <div className='table-responsive'>
                <Table>
                <thead>
                    <tr>
                        <th style={{color:"Highlight"}}>Submitted Skills</th>
                        <th style={{color:"Highlight"}}>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((data)=>{
                        return(
                            <>
                                <tr>
                                    <td>
                                        <img src={data.skillImage} alt={data.skillImage} style={{height:"50px", width:"50px"}}/>
                                    </td>
                                    <td>
                                        <Button type='button' className='bg-danger border-danger' onClick={()=>dlt(data._id)}>Delete</Button>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </Table>
                </div>
        </Col>
        <Col xs={1} md={4}></Col>
      </Row>
    </div>
  )
}

export default Flow
