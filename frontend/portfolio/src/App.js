import React, { useState, useEffect, Children } from 'react';
import './App.css';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './Home';
import { Row, Col } from 'react-grid-system';
import Update from './Update';
import ClientInfo from './ClientInfo';
import AdminLogin from './AdminLogin';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import ProtectedRoute from './ProtectedRoute';
import NoAvaib from './NoAvaib';
// import web from './Image/web.png';

function App() {
  const [showComponents, setShowComponents] = useState([false, false, false]);
  const [data, setData]= useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate=useNavigate();

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setShowComponents((prev) => [true, false, false]), 500),
      setTimeout(() => setShowComponents((prev) => [true, true, false]), 1000),
      setTimeout(() => setShowComponents((prev) => [true, true, true]), 1500),
    ];

    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
  }, []);

  useEffect(()=>{
    const adminLoggedIn = sessionStorage.getItem('isLoggedIn');
    setIsLoggedIn(adminLoggedIn==='true');
  },[])

  const logout=()=>{
    if(window.confirm("Are you sure want to logout?")){
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('isLoggedIn')
      setIsLoggedIn(false)
    navigate("/")
    }
  }

  useEffect(()=>{
    axios.get("https://port-asbo.onrender.com/socialget").then((response)=>{
      setData(response.data)
  }).catch((err)=>{
      console.log(err)
  })
  },[])
  

  return (
    <div className="App container-fluid" style={{ backgroundColor: "rgb(1,1,1)", height: "100vh", alignItems: 'center', fontFamily:"sans-serif", width:"100%"}}>
      {/* Header Section */}
      <div className='header'>
      <Row className='pt-3 pb-1 fade-in' style={{ backgroundColor: "rgb(20,20,20)", marginBottom: "50px" }}>
        <Col xs={8} style={{display:"flex", flexDirection:"row", alignItems:"start"}} className='ps-5'>
          {data.map((data)=>{
            return(
              <>
                <h3 style={{color:"rgb(65,252,252)", fontFamily:"monospace"}}><b>{data.email}</b></h3>
              </>
            )
          })}
        </Col>
        <Col xs={4} style={{display:"flex", justifyContent:"end"}} className='pe-5'>
         {isLoggedIn? (
          <Button type='button' style={{backgroundColor:"black", borderColor:"grey", color:"white"}} onClick={logout}>Logout</Button>
         ):(
          <a href='/adminlogin' style={{textDecoration:"none"}}>
          <FontAwesomeIcon icon={faUser} style={{color:"rgb(204,215,247)", height:"17px", width:"20px"}}/>
          <div style={{color:"rgb(204,215,247)", fontSize:"13px"}}>Admin Login</div>
          </a>
         )}
        </Col>
      </Row>
      </div>

      {/* Routes Section */}
      <Routes>
        <Route path='/' element={showComponents[1] && <div className='fade-in'><Home /></div>} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/update' element={<ProtectedRoute><Update /></ProtectedRoute>} />
        <Route path='/client' element={<ProtectedRoute><ClientInfo /></ProtectedRoute>} />
        <Route path='*' element={<NoAvaib/>}/>
      </Routes>


      
    </div>
  );
}

export default App;
