import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Row, Col} from 'react-grid-system'
import Card from 'react-bootstrap/Card'

function Skills() {
    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get('https://port-asbo.onrender.com/skillget').then((response)=>{
            setData(response.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
  return (
    <div className='container' style={{marginTop:"100px"}}>
        <h1 style={{color:"rgb(204,215,247)"}}><i>Proficiencies</i></h1>
        <marquee>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}} className='mt-4'>
                {data.map((data)=>{
                    return(
                        <>
                        <Row>
                            {/* <Col xs={1}> */}
                            <Card  className=' mt-2 me-4 ms-4' style={{width:"150px", height:"140px", objectFit:"cover"}}>
                                <Card.Img src={data.skillImage} alt={data.skillImage} style={{width:"100%", height:"100%",marginLeft:"", objectFit:"cover"}}/>    
                        </Card>
                            {/* </Col> */}
                        </Row>
                       
                            {/* <div style={{height:"150px", width:"140px", margin:"0 5px" }} className='me-1 mt-2'>
                            </div> */}
                        </>
                    )
                })}
            </div>
        </marquee>
        
    </div>
  )
}

export default Skills
