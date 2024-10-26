import React, { useState } from 'react'
import axios from 'axios'
import {Row, Col} from 'react-grid-system'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Outlet, useNavigate } from 'react-router-dom'

function AdminLogin() {
  const [input, setInput] = useState({
    username:"",
    password:"",
  })

  const [check, setCheck]= useState({
    client:false,
    update:false
  })

  const navigate = useNavigate();

  const changeHandler=(e)=>{
    const {value,name} = e.target;
    setInput((prev)=>({
      ...prev,
      [name]: value
    }))
  }

  const checkHandler = (e)=>{
    const {name, checked} = e.target;
    setCheck((prev)=>({
      ...prev,
      [name]:checked,
      client: name === "client"? checked:false,
      update: name=== "update"? checked:false
    }))
  }

  const submitHandler=()=>{
    if (!input.username || !input.password){
      alert("Please enter your username and password")
      return
    }
    axios.post("https://port-asbo.onrender.com/adminlogin", input). then((response)=>{
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("isLoggedIn", "true")
      alert("Login Successful")
      if (check.client){
        navigate("/client")
    window.location.reload(false)

      }
      else if(check.update){
        navigate("/update")
    window.location.reload(false)

      }
      else{
        alert("Please select redirecting page");
      }
    }).catch((err)=>{
      alert("Invalid Credentials")
    })

  }

  return (
    <div className='mt-5' style={{display:"flex", alignItems:"center", justifyContent:"center", height:"90vh"}}>
      <Row style={{border:"2px solid white", padding:"50px", borderRadius:"10px"}} className='mt-4'>
        <Col xs={1}></Col>
        <Col xs={10}>
        <h1 style={{color:"rgb(204,215,247)"}} className='mb-3'><i>Admin Login</i></h1>
          <Form>
            <Form.Control type='text' name='username' value={input.username} onChange={changeHandler} placeholder='Username' autoComplete='off' className='m-o'/>
            <Form.Control type='password' name='password' value={input.password} onChange={changeHandler} placeholder='Password' className='mt-2'/>
            
            <Form.Check type='switch' id='client' label="Contacted me" checked={check.client} style={{color:"rgb(204,215,247)"}} inline className='mt-2' name='client' onChange={checkHandler}/>
           
            <Form.Check type='switch' id='update' label="Update" checked={check.update} style={{color:"rgb(204,215,247)"}} inline className='mt-2' name='update' onChange={checkHandler}/>
           
            <Button type='button' onClick={submitHandler} style={{backgroundColor:"black", borderColor:"grey", color:"White"}} className='mt-3'>Login</Button>
          </Form>
          <Outlet/>
        </Col>
        <Col xs={1}></Col>
      </Row>
    </div>
  )
}

export default AdminLogin
