const dotenv= require("dotenv");
var express = require('express');
var router = express.Router();
const mongoose= require("mongoose")
const cors= require("cors");
const multer= require("multer");
const path = require("path");
const fs= require("fs")
const jwt = require('jsonwebtoken');
const twilio = require("twilio");


router.use(cors())
router.use(express.json());

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Uploads directory created');
} else {
  console.log('Uploads directory exists');
}

router.use('/uploads', express.static(uploadsDir));


 // Multer to handle files uploaded..
 const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, uploadsDir); // Corrected from 'designation' to 'destination'
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({storage:storage});

dotenv.config();
require("../DB/Conn")

const PORT = process.env.PORT || 5000;

// Schemas
//.. clientSchema
const clientSchema= new mongoose.Schema({
  fullname:String,
  email:String,
  query:String,
  number:String,
  created:{
    type:Date,
    default:Date.now
  },
  contacted:{type:Boolean, default:false}
})

// ..techSchema
const techSchema= new mongoose.Schema({
  tech:String,
  ImageUrl:String,
})


// ..ExpSchema
const expSchema = new mongoose.Schema({
  expImage:String,
  comName:String,
  designation:String,
  duration:String,
  expAbout:String,
  created:{
    type:Date,
    default: Date.now
  }
})

// ..contactSchema
const contactSchema=new mongoose.Schema({
  email:String,
  git:String,
  linkedIn:String,
  insta:String
  })

  // ..projectSchema
  const projectSchema = new mongoose.Schema({
    prjImage: String,
    prjName: String,
    prjTech: String,
    prjLink: String,
    created: {
        type: Date,
        default: Date.now
    }
});



 const eduSchema= new mongoose.Schema({
  eduImage:String,
  branch:String,
  course:String,
  year:String, 
  created:{
    type:Date,
    default:Date.now
  }
 })

 const skillSchema = new mongoose.Schema({
  skillImage:String
 })

 

// collections
//.. clientCollection
const clientcollection = mongoose.model("clientCollection", clientSchema);

// ..techCollection
const techCollection= mongoose.model("techCollection", techSchema)

// ..expCollection
const expCollection= mongoose.model("expCollection", expSchema)

// ..contactCollection
const contactCollection= mongoose.model("contactCollection", contactSchema)

// .. education Collection
const eduCollection = mongoose.model("eduCollection", eduSchema)

// ..projectCollection
const projectCollection= mongoose.model("projectCollection", projectSchema)

// ..skills Collection
const skillCollection = mongoose.model("skillCollection", skillSchema)

// tech API
router.post("/addtech", upload.single("image"), (req, res) => {
  console.log(req.file); // Log the uploaded file information
  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }
  
  const tech = req.body.tech;
  const ImageUrl =`${process.env.BACKEND_URL}/uploads/${req.file.filename}`;  // Use relative path
  
  techCollection.create({ tech: tech, ImageUrl: ImageUrl})
      .then((response) => {
          res.json(response);
      })
      .catch((err) => {
          console.error(err);
          res.status(500).json(err);
      });
});

router.get("/techget",(req,res)=>{
  techCollection.find({}).then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
})

router.delete("/techdlt/:id", (req, res) => {
  const id = req.params.id;

  techCollection.findByIdAndDelete(id)
      .then((deleted) => {
          res.json(deleted);
      })
      .catch((err) => {
          res.status(500).json(err);
      });
});

// social Link API
router.post("/social",(req,res)=>{
  const email= req.body.email;
  const git= req.body.git;
  const linkedIn= req.body.linkedIn;
  const insta= req.body.insta;
  contactCollection.create({
    email:email,
    git:git,
    linkedIn:linkedIn,
    insta:insta
  }).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err)
  })
})

router.get("/socialget",(req,res)=>{
  contactCollection.find({}).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err)
  })
})

router.put("/socialupdate/:id", (req, res) => {
  const id = req.params.id;
  const { email, git, linkedIn, insta } = req.body;

  contactCollection.findByIdAndUpdate(id, { email, git, linkedIn, insta }, { new: true })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});



// Education API
router.post("/education", upload.single("image"), (req, res) => {
  // console.log(req.file); // Log the uploaded file information
  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }
  
  const {branch, course, year} = req.body;
  const eduImage =`${process.env.BACKEND_URL}/uploads/${req.file.filename}`;  // Use relative path
  
  eduCollection.create({ branch: branch, eduImage: eduImage, course:course, year:year })
      .then((response) => {
          res.json(response);
      })
      .catch((err) => {
          console.error(err);
          res.status(500).json(err);
      });
});

router.get("/eduget", (req,res)=>{
  eduCollection.find({}).sort({created:-1}).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err)
  })
})

router.delete('/edudelete/:id',(req,res)=>{
  const id= req.params.id;
  eduCollection.findByIdAndDelete({_id:id}).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err)
  })
})

// Projects API
router.post('/project', upload.single("image"), (req, res) => {
  if (!req.file) {
      return res.status(404).send("No file uploaded.");
  }
  
  const { prjLink, prjName, prjTech } = req.body;
  const prjImage = `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;  // Corrected variable name

  projectCollection.create({
      prjLink: prjLink,
      prjName: prjName,
      prjTech: prjTech,
      prjImage: prjImage
  })
  .then((response) => {
      res.json(response);
  })
  .catch((err) => {
      console.error(err);
      res.status(500).json(err);
  });
});


router.get('/projectget', (req,res)=>{
  projectCollection.find({}).sort({created:-1}).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err)
  })
})

router.delete('/projectdelete/:id',(req,res)=>{
  const {id}= req.params;
  projectCollection.findByIdAndDelete({_id:id}).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err);
  })
})

// Experience API
router.post("/experience", upload.single('image'), (req,res)=>{
  const {comName,designation, duration,expAbout}= req.body;
  const expImage= `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;
  expCollection.create({
    expImage:expImage,
    comName:comName,
    designation:designation,
    duration:duration,
    expAbout:expAbout
  }).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err);
  })
})

router.get('/experienceget', (req,res)=>{
  expCollection.find({}).sort({created:-1}).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err)
  })
})

router.put("/experienceupdate/:id", (req,res)=>{
  const {id}= req.params;
  const {comName, designation, duration, expAbout}= req.body;
  const updateData = {comName, designation, duration, expAbout}; // only due to image update otherwise no
  if(req.file){
    const expImage= `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    updateData.expImage= expImage;
  }
  expCollection.findByIdAndUpdate(id, updateData, {new:true}).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err)
  })
})

// const { email, git, linkedIn, insta } = req.body;

//   contactCollection.findByIdAndUpdate(id, { email, git, linkedIn, insta }, { new: true })
//     .then((response) => {

router.delete("/experiencedelete/:id", (req,res)=>{
  const {id}= req.params;
  expCollection.findByIdAndDelete({_id:id}).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err)
  })
})

// Admin Login API
router.post('/adminlogin', (req,res)=>{
  const {username, password}= req.body;
  if(username === process.env.USERNAME && password === process.env.PASSWORD){
    const token = jwt.sign({username}, process.env.USERNAME);
    res.json({token});
  }else{
    res.status(401).send("Invalid credentials");
  }
})

const authenticateJWT=(req,res,next)=>{
  const token = req.headers['authorization'];
  if(token){
    jwt.verify(token, process.env.USERNAME , (err, user)=>{
      if(err){
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    })
  }else{
    res.sendStatus(401);
  }
}

// ..Client API
router.post("/contactform", (req, res) => {
  console.log(req.body); // Log the incoming request data
  const { fullname, email, number, query } = req.body;

  clientcollection.create({
      fullname: fullname,
      email: email,
      number: number,
      query: query
  })
  .then((response) => {
      const messageBody = `New contact request on portfolio:\nName:${fullname}\nEmail:${email}\nNumber:${number}\nMessage:${query}`;
      return client.messages.create({
          body: messageBody,
          from: '+18583867418',
          to: '+917510097007'
      });
  })
  .then((message) => {
      console.log(`SMS sent: ${message.sid}`);
      res.json({ message: "Contact form submitted successfully!" });
  })
  .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
  });
});



router.get("/contactformget",(req,res)=>{
  clientcollection.find({}).sort({created:-1}).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err)
  })
})

router.delete("/clientdelete/:id",(req,res)=>{
  const {id}= req.params;
  clientcollection.findByIdAndDelete({_id:id}).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err)
  })
})

router.put('/contactform/contacted/:id', (req,res)=>{
  const {id}= req.params;
  clientcollection.findByIdAndUpdate(id,{contacted:true}, {new:true}).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err)
  })
})

// Skills API
router.post("/skill", upload.single('image'), (req, res)=>{
  const skillImage= `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;
  skillCollection.create({skillImage:skillImage}).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err);
  })
})

router.get('/skillget', (req,res)=>{
  skillCollection.find({}).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err)
  })
})

router.delete("/skilldelete/:id", (req,res)=>{
  const {id}= req.params;
  skillCollection.findByIdAndDelete({_id:id}).then((response)=>{
    res.json(response)
  }).catch((err)=>{
    res.json(err)
  })
})



 
/* GET home page. */

// Routes
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports = router;
