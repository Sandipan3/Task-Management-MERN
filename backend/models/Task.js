import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    completed : {
        type : String,
        required : true
    },
    deadline : {
        type : Date,
        required : true
    },
    remindAt : {
        type : Date,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require: true
    }
})

export default mongoose.model('Task', TaskSchema);