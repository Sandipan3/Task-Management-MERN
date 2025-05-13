import express from 'express';
import { router as authRoutes } from './routes/auth.js';
import { router as tasksRoutes } from './routes/tasks.js';
import cors from 'cors'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL ;


//Express json parsing 
app.use(express.json());
// app.use(express.urlencoded({extended:true}))
mongoose.connect(MONGODB_URL)
.then(console.log('mongo connected'))
.catch((err)=>{
    console.error(err);
})
;

app.use(cors({
    origin : 'http://localhost:3000', 
    credentials : true
}))

// app.get('/',(req,res)=>{
//     res.send('Running')
// })

//Express router 
app.use('/', authRoutes);
app.use('/tasks', tasksRoutes);



app.listen(PORT , ()=>{
    console.log(`Server running at port : ${PORT}`);
    
})