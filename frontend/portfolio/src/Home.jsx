import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-grid-system';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Projects from './Projects';
import Experience from './Experience';
import ConnectForm from './ConnectForm';
import Skills from './Skills';

function Home() {
    const [tech, setTech] = useState([]);
    const [data, setData] = useState([]);
    const [edu, setEdu]= useState([]);

    useEffect(() => {
        axios.get("https://port-asbo.onrender.com/techget").then((response) => {
            setTech(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get("https://port-asbo.onrender.com/socialget").then((response) => {
            setData(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(()=>{
      axios.get("https://port-asbo.onrender.com/eduget").then((response)=>{
        setEdu(response.data)
      }).catch((err)=>{
        console.log(err)
      })
    },[])

    return (
        <div style={{ paddingBottom: "", marginTop: "70px" }}>
            <Row style={{ justifyContent: "center", textAlign: "center" }}>
              <Col lg={1} xl={1}></Col>
                <Col xs={10} lg={4} md={6} className='d-flex-column align-items-center' style={{marginTop:"12px", display:"flex", justifyContent:"center"}}>
                    <div>
                    <h1 style={{ color: "rgb(204,215,247)", fontSize: "40px", textShadow: "2px 2px 4px rgba(255, 255, 255, 0.5)" }} className=' flex items-center justify-center'>
                        <b>ROHIT MAURYA</b>
                    </h1>
                    {tech.map((data) => (
                        <h2 key={data._id} style={{ color: "rgb(136,146,176)", margin: 0, fontSize:"30px" }}>{data.tech}</h2>
                    ))}
                    <Row style={{display:"Flex", alignItems:"center"}} className='mt-4'>
                    {data.map((data)=>{
                        return(
                          <>
                          <Col xs={3}></Col>
                              
                            
                            <Col xs={2} className=''>
                            <a href={data.linkedIn}><FontAwesomeIcon icon={faLinkedin} style={{color:"rgb(136,146,176)", fontSize:"28px"}}/></a>

                            </Col>
                            
                            <Col xs={2}>
                            <a href={data.git}><FontAwesomeIcon icon={faGithub} style={{color:"rgb(136,146,176)", fontSize:"28px"}}/></a>

                            </Col>
                            <Col xs={2} >
                              <a href={data.insta}><FontAwesomeIcon icon={faInstagram} style={{color:"rgb(136,146,176)", fontSize:"28px"}}/></a>

                              </Col>
                            <Col xs={3}></Col>
                            
                          </>
                        )
                      })}
                    </Row>
                    </div>
                      
                    
                </Col>
                <Col lg={1}></Col>
                <Col xs={10} lg={4} md={6} style={{marginTop:"30px", display:"flex", justifyContent:"center", marginBottom:"47px"}}>
                   <div style={{height:"380px", width:"400px"}}>
                   {tech.map((data) => (
                        <img 
                            key={data._id}
                            src={data.ImageUrl} 
                            alt={data.tech} 
                            style={{ height: "100%", width: "100%", borderRadius: "10%", marginTop: "18px", boxShadow: "0 4px 20px rgba(255, 255, 255, 0.6)" }} 
                        />
                    ))}
                   </div>
                </Col>
                <Col lg={1}></Col>
            </Row>

            <Row>
                <Col xs={1} md={1}></Col>
                <Col xs={10} md={10} className=''>
                    <h2 className='mt-3' style={{color:"rgb(204,215,247)"}}> <i>About me</i></h2>
                    <p style={{color:"rgb(204,202,224)"}}>Hello! I’m thrilled to share my journey with you. I’m passionate <b>Web Developer</b> based in <b>Lucknow</b>. Growing up in this vibrant city has fueled my interest in technology and innovation.
                    As you explore my portfolio, you'll find a showcase of my skills, projects, and experiences that reflect my dedication to web development. 
                    <div> <b>Thank you for visiting.</b></div>
                   
                    </p>
                    
                </Col>
                <Col xs={1} md={1}></Col>
            </Row>

            <Row style={{ justifyContent: "center", textAlign: "center"}} className='mt-5'>
                <Col xs={10} md={8} lg={6} className='mt-5'>
                    <h1 style={{ color: "rgb(204,215,247)" }}>
                        <i>Academic Background</i>
                    </h1>
                </Col>
            </Row>

            <div className='container'>
            <Row>
    {edu.map((data) => (
        <Col xs={12} md={4} key={data._id}>
            <Card className='mt-5 card-shadow' style={{ borderRadius: "20px" }}>
                
                <Card.Img src={data.eduImage} variant='top' className='eduImg' style={{ borderRadius: "20px", height:"300px", objectFit:"cover" }} />

                
                <Card.Body style={{ backgroundColor: "black", color: "rgb(204,215,247)" }} className='eduBody'>
                    <Card.Title>{data.course}</Card.Title>
                    <Card.Text>
                        <div>
                            {data.branch}
                        </div>
                        <div>
                            <b>Year: </b> {data.year}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    ))}
</Row>

            </div>
            <Skills/>

            <Projects/>
            <Experience/>
            <ConnectForm/>

        <Row style={{backgroundColor:"rgb(20,20,20)"}} className='pb-2'>
            <Col xs={12} className=''>
                <h3 className='mt-3'>
                    <span style={{color:"black", backgroundColor:"white", padding:"4px", borderRadius:"1px", fontSize:"40px"}}>Thank</span><span style={{backgroundColor:"rgb(234,106,68)", color:"white", padding:"4px", borderRadius:"1px", fontSize:"40px"}}>You</span>
                </h3>
                <h4 style={{color:"rgb(204,215,247)"}}>Together, let’s create something amazing!</h4>
            </Col>
        </Row>
        </div>
    );
}

export default Home;
