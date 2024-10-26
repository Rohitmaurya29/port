import React from 'react'
import {Row, Col} from 'react-grid-system'
import Addtech from './Addtech'
import Social from './Social'
import Education from './Education'
import ProjectsHandle from './ProjectsHandle'
import ExperienceHandler from './ExperienceHandler'
import ClientInfo from './ClientInfo'
import Flow from './Flow'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

function Update() {
  const navigate = useNavigate()
  return (
    <div style={{paddingBottom:"20px"}}>
      <Row className='mt-5'>
        <Col xs={2} className='mt-5'>
          <Button type='button' style={{backgroundColor:"black", borderColor:"grey", coloor:"white"}} onClick={()=>{navigate("/client")}}>Contacted</Button>
          <Button type='button' style={{backgroundColor:"black", borderColor:"grey", coloor:"white"}} onClick={()=>{navigate("/")}}>Home</Button>
        </Col>
        <Col xs={11}></Col>

      </Row>
      <Row>
        <Col xs={1} md={4}></Col>
        <Col xs={10} md={4}><h2 style={{color:"rgb(136,146,176)", textDecoration:"underline", marginTop:"100px"}}>Technology Update</h2></Col>
        <Col xs={1} md={4}></Col>
      </Row>
      <Addtech/>

      <Row>
      <Col xs={1} md={4}></Col>
        <Col xs={10} md={4}><h2 style={{color:"rgb(136,146,176)", textDecoration:"underline", marginTop:"50px"}}>Social Links Update</h2></Col>
        <Col xs={1} md={4}></Col>
      </Row>
      <Social/>
      <Education/>
      <ProjectsHandle/>
      <ExperienceHandler/>
      {/* <ClientInfo/> */}
      <Flow/>
    </div>
  )
}

export default Update
