import React from 'react'
import {Row, Col} from 'react-grid-system'
import { useNavigate } from 'react-router-dom'

function NoAvaib() {
  return (
    <div style={{color:"White", marginTop:"150px"}}>
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{fontSize:"50px"}}>Oops! No page found with this route..</div>
      </div>
      <h4>Go back to <a href='/'>Home</a></h4>
    </div>
  )
}

export default NoAvaib
