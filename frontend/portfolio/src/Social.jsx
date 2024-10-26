import React, { useEffect, useState } from 'react'
import {Row,Col} from 'react-grid-system'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import EditSocial from './EditSocial'

function Social() {
    const [input, setInput] = useState({
        email:"",
        git:"",
        linkedIn:"",
        insta:""
    })

    const [data,setData]= useState([])

    const [show, setShow]= useState(false);

    const [selectedData, setSelectedData]= useState(null)

    const hiddenhandle=()=> setShow(false);
    const showhandler=(data)=>{
        setSelectedData(data);
        setShow(true)};

    // const changeHandler=(e)=>{
    //     const {name, value} = e.target;
    //     setInput((prev)=>({
    //         ...prev,
    //         [name]:value
    //     }))
    // }

    // const submitHandler=()=>{
    //     if(!input.email || !input.git || !input.insta || !input.linkedIn){
    //         alert("Please Fill All fields Properly")
    //         return
    //     }
    //     axios.post("https://port-asbo.onrender.com/social",{
    //         email:input.email,
    //         git:input.git,
    //         linkedIn:input.linkedIn,
    //         insta:input.insta
    //     }).then((data)=>{
    //         console.log(data)
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    //     window.location.reload(false)
    // }

    useEffect(()=>{
        axios.get("https://port-asbo.onrender.com/socialget").then((response)=>{
            setData(response.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    
  return (
    <div>
        {/* <Row>
            <Col xs={2} md={4}></Col>
            <Col xs={10} md={4}>
                <Form.Control type='email' name='email' value={input.email} onChange={changeHandler} placeholder='E-mail' style={{width:"80%", padding:"5px", borderRadius:"10px", color:"blueviolet", margin:"10px", backgroundColor:"bisque", fontWeight:"10px"}}/>
                <Form.Control type='text' name='git' value={input.git} onChange={changeHandler} placeholder='GitHub Link' style={{width:"80%", padding:"5px", borderRadius:"10px", color:"blueviolet", margin:"10px", backgroundColor:"bisque", fontWeight:"10px"}}/>
                <Form.Control type='text' name='linkedIn' value={input.linkedIn} onChange={changeHandler} placeholder='LinkedIn' style={{width:"80%", padding:"5px", borderRadius:"10px", color:"blueviolet", margin:"10px", backgroundColor:"bisque", fontWeight:"10px"}}/>
                <Form.Control type='text' name='insta' value={input.insta} onChange={changeHandler} placeholder='Instagram' style={{width:"80%", padding:"5px", borderRadius:"10px", color:"blueviolet", margin:"10px", backgroundColor:"bisque", fontWeight:"10px"}}/>
                <div>
                <Button type='button' onClick={submitHandler} style={{width:"50%", padding:"5px", borderRadius:"10px", color:"black", margin:"10px", backgroundColor:"cyan", fontWeight:"10px"}}>Submit</Button>
                </div>
                
            </Col>
            <Col xs={2} md={4}></Col>
        </Row> */}

        <Row>
            <Col xs={1}></Col>
            <Col xs={10}>
                <div className='table-responsive'>
                <Table striped bordered hover className="shadow-lg" style={{color:"white", border:"2px solid white", borderCollapse:"collapse", width:"100%"}}>
                <thead>
                    <tr>
                        <th style={{padding:"5px", color:"Highlight"}}>Header Text</th>
                        <th style={{padding:"5px", color:"Highlight"}}>Github Link</th>
                        <th style={{padding:"5px", color:"Highlight"}}>LinkedIn Link</th>
                        <th style={{padding:"5px", color:"Highlight"}}>Instagram Link</th>
                        <th style={{padding:"5px", color:"Highlight"}}>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((data)=>{
                        return(
                            <>
                                <tr key={data._id}>
                                    <td style={{padding:"5px", color:"rgb(136,146,176)"}}>{data.email}</td>
                                    <td style={{padding:"5px", color:"rgb(136,146,176)"}}>{data.git}</td>
                                    <td style={{padding:"5px", color:"rgb(136,146,176)"}}>{data.linkedIn}</td>
                                    <td style={{padding:"5px", color:"rgb(136,146,176)"}}>{data.insta}</td>
                                    <td>
                                        <Button type='button' className='btn btn-primary' onClick={()=>showhandler(data)}>Update</Button>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>

                <Modal show={show} onHide={hiddenhandle}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Social Links</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditSocial selectedData={selectedData} onClose={hiddenhandle}/>
                    </Modal.Body>
                </Modal>

            </Table>
                </div>
            </Col>
            <Col xs={1}></Col>
        </Row>

        
    </div>
  )
}

export default Social
