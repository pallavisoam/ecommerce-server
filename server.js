const express  = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser  = require('body-parser');
const cors = require('cors');
const fs = require('fs')
 require('dotenv').config()
 // import routes
//  const authRoutes = require('./routes/auth').... no need of using this fs does thisnall for us 

 // app 
 const app = express()

 // db
 mongoose.connect(process.env.MONGO_URI , {
     useNewUrlParser:true,
     useCreateIndex:true,
     useFindAndModify:true
 })
 .then (() => console.log("DB CONNECTED"))
 mongoose.connection.on("error",err =>{
     console.log(`DB connection eror :${err.message}`);
 });

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({limit :"2mb"}));
app.use(cors());


// route middlewares

// app.use('/api' , authRoutes);
fs.readdirSync('./routes').map((r) =>
 app.use("/api" , require("./routes/" + r)))

// port
const port = process.env.PORT || 8000

app.listen(port, () =>console.log(`Server is running on port ${port} `))