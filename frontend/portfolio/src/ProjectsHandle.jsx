import React, { useEffect, useState } from 'react'
import {Row,Col} from 'react-grid-system'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function ProjectsHandle() {
    const [input,setInput]= useState({
        prjName:"",
        prjTech:"",
        prjLink:""
    })

    const [imageFile, setImageFile ]= useState(null);

    const [data,setData]= useState([]);

    const changeHandler=(e)=>{
        const {name, value}= e.target;
        setInput((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const fileHandler=(e)=>{
        setImageFile(e.target.files[0]);
    }

    const submitHandler = () => {
        if (!input.prjLink || !input.prjName || !input.prjTech || !imageFile) {
            alert("Please Fill Fields Properly");
            return;
        }
    
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('prjName', input.prjName);
        formData.append('prjTech', input.prjTech);
        formData.append('prjLink', input.prjLink);
    
        axios.post('https://port-asbo.onrender.com/project', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            console.log(response.data);
            // Add the new data at the top
            setData((prevData) => [response.data, ...prevData]);
        })
        .catch((err) => {
            console.error(err);
        });
    
        setInput({
            prjName: "",
            prjLink: "",
            prjTech: ""
        });
        setImageFile(null);
    };
    
    
    useEffect(()=>{
        axios.get('https://port-asbo.onrender.com/projectget').then((response)=>{
            setData(response.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const dlt=(id)=>{
        if(window.confirm("Are You Want To delete")){
            axios.delete(`https://port-asbo.onrender.com/projectdelete/${id}`).then((response)=>{
                console.log(response.data)
                setData((prevData) => prevData.filter(item => item._id !== id));
            }).catch((err)=>{
                console.log(err);
            })
        }
        // window.location.reload(false)
    }

  return (
    <div>
      <Row className='mt-5'>
        <Col xs={12}>
            <h1 style={{color:"rgb(136,146,176)", textDecoration:"underline"}}>Projects Update</h1>
        </Col>
      </Row>

      <Row>
        <Col xs={1} md={2}></Col>
        <Col xs={10} md={8}>
            <Form>
                <Form.Control name='prjImage' type='file' onChange={fileHandler} className='m-2'/>
                <Form.Control name='prjName' type='text' value={input.prjName} onChange={changeHandler} placeholder="Projects's Name" className='m-2'/>
                <Form.Control name='prjTech' type='text' value={input.prjTech} onChange={changeHandler} placeholder="Projects's Technology" className='m-2'/>
                <Form.Control name='prjLink' type='text' value={input.prjLink} onChange={changeHandler} placeholder="Projects's Link" className='m-2'/>
                <Button type='button' onClick={submitHandler}>Add</Button>
            </Form>

            <div className='table-responsive'>
            <Table className='mt-4' stripped border>
                <thead>
                    <tr>
                        <th style={{color:"Highlight"}}>Project Name</th>
                        <th style={{color:"Highlight"}}>Project Technology</th>
                        <th style={{color:"Highlight"}}>Project Link</th>
                        <th style={{color:"Highlight"}}>Project Image</th>
                        <th style={{color:"Highlight"}}>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((data)=>{
                        return(
                            <>
                                <tr>
                                    <td>{data.prjName}</td>
                                    <td>{data.prjTech}</td>
                                    <td>{data.prjLink}</td>
                                    <td>
                                    <img src={data.prjImage} alt={data.prjImage} style={{height:"50px", width:"50px"}}/>
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

export default ProjectsHandle
