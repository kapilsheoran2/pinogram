const express = require('express');
require('dotenv').config()
const cors = require('cors');
const logger = require('morgan')
const lazzer = require('lazzer')
const path = require('path')

const {connectDb} = require('./connection')

const userRouter =  require('./routes/userRouter')
const postRouter = require('./routes/postRouter')

const app = express();
const PORT = process.env.PORT;

connectDb(process.env.MONGO)
.then(()=>{lazzer.info("Database Conneted")})
.catch((error)=>{lazzer.error("Failed Database Connection" + error);})

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users',userRouter)
app.use('/api/posts',postRouter)

app.use("/",(req, res)=> {
    res.send("server is running");
})

 app.listen(PORT,()=>{
    lazzer.info(`Server Started at http://localhost:${PORT}`);
})