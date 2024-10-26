// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { Row, Col } from 'react-grid-system';
// import { useParams } from 'react-router-dom';

// function ExpUpdate({ selectedData, onClose, onUpdate }) {
//     const [input, setInput] = useState({
//         comName: "",
//         designation: "",
//         duration: "",
//         expAbout: "",
//         expImage: null
//     });

//     const changeHandler = (e) => {
//         const { name, value } = e.target;
//         setInput((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const fileHandler = (e) => {
//         setInput((prev) => ({
//             ...prev,
//             expImage: e.target.files[0]
//         }));
//     };

//     const {id}= useParams()

//     useEffect(() => {
//         if (selectedData) {
//             setInput({
//                 comName: selectedData.comName,
//                 designation: selectedData.designation,
//                 duration: selectedData.duration,
//                 expAbout: selectedData.expAbout,
//                 expImage: null // Reset image input
//             });
//         }
//     }, [selectedData]);

//     const submitHandler = () => {
//         const formData = new FormData();
//         formData.append('comName', input.comName);
//         formData.append('designation', input.designation);
//         formData.append('duration', input.duration);
//         formData.append('expAbout', input.expAbout);
//         if (input.expImage) {
//             formData.append('expImage', input.expImage);
//         }

//         axios.put(`https://port-asbo.onrender.com/experienceupdate/${selectedData._id}`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         }).then((response) => {
//             console.log(response.data);
//             onUpdate(response.data); // Call onUpdate with the updated data
//             onClose(); // Close the modal after updating
//         }).catch((err) => {
//             console.error(err);
//         });
//     };

//     return (
//         <div>
//             <Row>
//                 <Col xs={12}>
//                     <Form>
//                         <Form.Label>Company Name</Form.Label>
//                         <Form.Control type='text' name='comName' value={input.comName} onChange={changeHandler} className='mt-2' />

//                         <Form.Label>Designation</Form.Label>
//                         <Form.Control type='text' name='designation' value={input.designation} onChange={changeHandler} className='mt-2' />

//                         <Form.Label>Duration</Form.Label>
//                         <Form.Control type='text' name='duration' value={input.duration} onChange={changeHandler} className='mt-2' />

//                         <Form.Label>About Experience</Form.Label>
//                         <Form.Control as='textarea' name='expAbout' value={input.expAbout} onChange={changeHandler} className='mt-2' />

//                         <Form.Label>Company Image</Form.Label>
//                         <Form.Control type='file' name='expImage' onChange={fileHandler} className='mt-2' />

//                         <Button type='button' onClick={submitHandler} className='mt-3'>Update</Button>
//                     </Form>
//                 </Col>
//             </Row>
//         </div>
//     );
// }

// export default ExpUpdate;
