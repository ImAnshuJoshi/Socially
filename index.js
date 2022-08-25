const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const multer = require('multer');
const path = require('path');

var cors = require('cors')
const app = express();


dotenv.config();
app.use(cors({
    origin:['http://localhost:3000']
}))

mongoose.connect(process.env.MONGO_URL,()=>{
    console.log('Connected to the database')
});

app.get('/',(req,res)=>{
    res.send('Welcome to home page');
})

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use("/images",express.static(path.join(__dirname, 'public/images')))

const storage = multer.diskStorage({
     destination:(req,file,cb)=>{
        cb(null,"public/images");
     },
     filename:(req,file,cb)=>{
        cb(null,req.body.name)
     },
});

const upload = multer({storage});

app.post('/api/upload',upload.single('file'),(req,res)=>{
    try{
        return res.status(200).json("File Uploaded successfully!");
    }
    catch(err){
        console.log(err);
    }
})
app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/posts',postRoute)


app.listen (8800,()=>{
    
console.log('Backend Server is listening on port 8800')})