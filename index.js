const express = require('express');
const app = express();
const sessions = require('express-session')
const http = require('http');
const server = http.createServer(app)
const path = require('path')
const bodyParser = require('body-parser')

const db = require('./db/db')
const auth = require('./routes/auth')
const users = require('./routes/users')

//Database connection
db.connect;

app.use(sessions({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

 app.use(bodyParser.urlencoded({ extended: true }));
 
//Login route
 app.get('/', (req,res) => {
     res.sendFile(path.join(__dirname + '/pages/login.html'))
 });

app.use('/auth', auth)
app.use('/register', users);

//Register route
app.use('/register', (req,res) => {
    res.sendFile(path.join(__dirname + '/pages/register.html'))
})
//Login success --> redirect
app.use('/welcome', (req,res) => {
    let session = req.session;
    if(session.name){
        res.send(`Hello  ${session.name}!` + '<br>' + '<a href="/logout">Logout</a>')
    }
})

//Logout route
app.use('/logout', (req, res) => {
    if(req.session){
        req.session.name = null;
        res.clearCookie('name');
        req.session.destroy();
    }
    res.redirect('/')
})

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server running in port ${PORT}`))
