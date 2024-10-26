const mongoose = require("mongoose");

const DB = process.env.DATABASE;
const PORT = process.env.PORT || 5000;

mongoose.connect(DB).then(()=>{
    console.log(`Connection Successful${PORT}`)
  }).catch((err)=>{
    console.log("Not connected")
  });  
  