import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title : String,
    completed : Boolean,
    deadline : Date,
    remindAt : Date,
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User'}
})

export default mongoose.model('Task', TaskSchema);