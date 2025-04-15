import express from 'express';
import { authRoutes } from './routes/auth.js';
import { tasksRoutes } from './routes/tasks.js';

const app = express();

const port = 3000;

// app.get('/',(req,res)=>{
//     res.send('Running')
// })

app.use('/', authRoutes);

app.use('/tasks', tasksRoutes);


app.listen(port,()=>{
    console.log(`Server running at port : ${port}`);
    
})