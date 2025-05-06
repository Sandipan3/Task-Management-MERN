import express from 'express'
import Task from '../models/Task.js';
import { authMiddleWare } from '../middlewares/authMiddleware.js';


export const router = express.Router();

router.use(authMiddleWare) //protect all routes

//get all tasks
router.get('/', async(req,res)=>{
    const tasks = await Task.find({userId : req.user._id})
    return res.json(tasks)
})

//create a new task
router.post('/', async(req,res)=>{

    const {title , completed , deadline , remindAt} = req.body
    
    //const {username} = req.body; // can be email or username 
    //const userKey = username ? username : ()=>{const {email} = req.body; return email}
    //console.log(userKey);
    
     const task = new Task({
        title ,
        completed ,
        deadline ,
        remindAt ,
        userId : req.user._id
     })

    const tasks = await task.save()
    return res.status(201).json({
       message : "Task created successfully", task
    })
})

//update a task(partial)
router.patch('/:id', async(req,res)=>{

    const taskId = req.params.id

    const tasks = await Task.findOneAndUpdate({_id : taskId } , req.body , {new:true} )
   // const tasks = await Task.findOneAndUpdate({_id : taskId , userId : req.user._id})//in our example userId is not mandatory

    if(!tasks) {
        return res.status(500).json({
            message : "Update error"
        })
    }

    console.log(tasks);
    

    return res.status(200).json({tasks})
})

//delete a task
router.delete('/:id', async(req,res)=>{

    //retrieve the id from params
    const taskId = req.params.id

    const deletedTask = await Task.findOneAndDelete({_id : taskId })

    if(!deletedTask) {
        return res.status(500).json({
            message : "Deletion error"
        })
    }

    console.log(deletedTask);
    

    return res.status(200).json({
        message : "Task deleted successfully"
    })
 })


 