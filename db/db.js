const mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect(process.env.DB_connection,{
    useNewUrlParser: true, 
    useUnifiedTopology : true
})
.then(() => console.log('DB connected..'))
.catch((err)=> console.log(err));


module.exports = mongoose;