const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//register
router.post("/register", async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        const newuser = await new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })
        
        const user = await newuser.save();
        res.status(200).json(newuser); 
    }
    catch(err){
        res.status(500).json(err);
    }
})

//login
router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).send('Please Register!');

        const validPassword = await bcrypt.compare(req.body.password,user.password);
        !validPassword && res.status(400).send('Invalid Password!');

        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
})
module.exports = router;