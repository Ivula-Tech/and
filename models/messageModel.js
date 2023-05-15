import mongoose, { mongo } from "mongoose";

const messageModel = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    clientID:{
        type:mongoose.Schema.Types.ObjectId,
        required : true
    },
    contID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

const messages = mongoose.model('Messages', messageModel)

export {messages}