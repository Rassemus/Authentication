
const bcrypt = require('bcrypt')

const express = require('express')
const router = express.Router()

const User = require('../models/user')

let session;
//Authentication
router.post('/', async (req, res) => {
    let user = await User.findOne({ name: req.body.name });
    if (!user) {
        return res.status(400).send('Incorrect name or password.')
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect name or password.');
    }
    session=req.session;
    session.name=req.body.name;
    res.redirect('/welcome');
})

module.exports = router;
