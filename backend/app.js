import express from 'express';
import { router as authRoutes } from './routes/auth.js';
import { router as tasksRoutes } from './routes/tasks.js';
import cors from 'cors'; 
import mongoose from 'mongoose';

const app = express();
const port = 3000;

//Express json parsing 
app.use(express.json());
// app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb://localhost:27017/')
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



app.listen(port,()=>{
    console.log(`Server running at port : ${port}`);
    
})