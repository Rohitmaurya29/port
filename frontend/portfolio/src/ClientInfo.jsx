import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Row, Col} from 'react-grid-system'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';

function ClientInfo() {

    const [data, setData] = useState([])

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("https://port-asbo.onrender.com/contactformget").then((response)=>{
            setData(response.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const fetchData=()=>{
        axios.get("https://port-asbo.onrender.com/contactformget").then((response)=>{
            setData(response.data)
        }).catch((err)=>{
            console.log(err);
        })
    }
    
    const handleContact=(id)=>{
        if(window.confirm("Are you sure you have contacted")){
            axios.put(`https://port-asbo.onrender.com/contactform/contacted/${id}`).then(()=>{
                fetchData() // refresh data after update contacted
            }).catch((err)=>{
                console.log(err)
            })
        }
        
    }

    const dlt=(id)=>{
        if(window.confirm("Are you sure want to delete.?")){
            axios.delete(`https://port-asbo.onrender.com/clientdelete/${id}`).then((response)=>{
                setData(data.filter(item=> item._id != id))
            }).catch((err)=>{
                console.log(err)
            })
        }
       
    }
    // setTechlist(techlist.filter(item => item._id !== id));

  return (
    <div>
        <Row className='mt-5'>
            <Col xs={2}>
                <Button type='button' onClick={()=>{navigate("/update")}} style={{backgroundColor:"black", borderColor:"grey", color:"white"}} className='mt-5'>Update</Button>
                <Button type='button' onClick={()=>{navigate("/")}} style={{backgroundColor:"black", borderColor:"grey", color:"white"}} className='mt-5'>Home</Button>
            </Col>
            <Col xs={10}></Col>
        </Row>
        <h1 style={{color:"rgb(204,202,224)"}} className='mt-2'><i>Contacted me</i></h1>
      <Row>
        <Col xs={1}></Col>
        <Col xs={10}>
           <div className='table-responsive mt-3'>
           <Table stripped border>
                <thead>
                    <tr>
                        <th style={{color:"Highlight"}}>Date</th>
                        <th style={{color:"Highlight"}}>Client's Name</th>
                        <th style={{color:"Highlight"}}>Client's E-mail</th>
                        <th style={{color:"Highlight"}}>Client's Contact Number</th>
                        <th style={{color:"Highlight"}}>Client's Message</th>
                        <th colSpan={2} style={{color:"Highlight"}}>Actions</th>
                    </tr>
                </thead>

                <tbody>
    {data.length === 0 ? (
        <tr>
            <td colSpan={6} className="text-center">No data available</td>
        </tr>
    ) : (
        data.map((item) => (
            <tr key={item._id}>
                <td>{new Date(item.created).toISOString().split('T')[0] }</td>
                <td>{item.fullname}</td>
                <td>{item.email}</td>
                <td>{item.number}</td>
                <td>{item.query}</td>
                <td>
                    {item.contacted ? (
                        <span className='text-success'>Contacted</span>
                    ) : (
                        <Button type='button' className='contacted' onClick={() => handleContact(item._id)}>Contacted</Button>
                    )}
                </td>
                <td>
                    <Button type='button' className='bg-danger border-danger' onClick={() => dlt(item._id)}>Delete</Button>
                </td>
            </tr>
        ))
    )}
</tbody>

            </Table>
           </div>
        </Col>
        <Col xs={1}></Col>
      </Row>
    </div>
  )
}

export default ClientInfo
