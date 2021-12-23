const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user')

let session;
//Register handle
router.post('/', async (req,res)=>{
   
    //Check if user already exisits
    let user = await User.findOne({name: req.body.name});
    if (user){
        return res.status(400).send("That user already exisits")
    }else{
        //Insert new user
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            date: req.body.date
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
        await user.save();
        session=req.session;
        session.name=req.body.name;
        res.redirect('/welcome');
    }
})



module.exports  = router;