import express from 'express'
import Task from '../models/Task.js';
import { authMiddleWare } from '../middlewares/authMiddleware.js';


export const router = express.Router();

router.use(authMiddleWare) //protect all routes

//get all tasks
router.get('/', async(req,res)=>{
    const tasks = await Task.find({userId : req._id})
    return res.json(tasks)
})

//create a new task
router.post('/', async(req,res)=>{

    const {title , completed , deadline , remindAt} = req.body
    const task = new Task({
        title ,
        completed ,
        deadline ,
        remindAt ,
        userId : req.user._id
    })


        // title : String,
        // completed : Boolean,
        // deadline : Date,
        // remindAt : Date,
        // userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User'}


    const tasks = await task.save()
    return res.status(201).json({
        message : "Task created successfully", task
    })
})

// //update a task(partial)
// router.get('/', async(req,res)=>{
//     const tasks = await Task.find({userId : req.user._id})
//     return res.json(tasks)
// })

// //delete a task
// router.get('/', async(req,res)=>{
//     const tasks = await Task.find({userId : req.user._id})
//     return res.json(tasks)
// })


