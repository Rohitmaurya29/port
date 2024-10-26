import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Row, Col} from 'react-grid-system'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

function Projects() {

    const [data, setData]= useState([])

    useEffect(()=>{
        axios.get('https://port-asbo.onrender.com/projectget').then((response)=>{
            setData(response.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[])

  return (
    <div  className='container' style={{marginTop:"85px"}}>
        <Row>
            <Col xs={12}>
            <h1 style={{color:"rgb(204,215,247)"}}><i>Look at my Projects</i></h1>

            </Col>
        </Row>
      <Row>
        {data.map((data)=>{
            return(
                <>
                    <Col xs={12} md={4}>
                    <div className='projectContainer mt-4' style={{borderRadius:"20px",}}>
                    <div style={{
                            backgroundImage:`url(${data.prjImage})`,
                            objectFit:"cover"
                            
                            }} className='projectImage'>
                                <div className='projectInfo'>
                                    <h3 className='mt-5'>{data.prjName}</h3>
                                    <p>{data.prjTech}</p>
                                </div>

                        </div>

                        <a href={data.prjLink} alt={data.prjLink} style={{textDecoration:"none", color:"rgb(136,146,176)", fontSize:"25px", position:"relative"}} >
                            <FontAwesomeIcon icon={faUpRightFromSquare}  className=''/>
                        </a>

                        
                        </div>
                    </Col>
                </>
            )
        })}
      </Row>
    </div>
  )
}

export default Projects
