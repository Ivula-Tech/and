import mongoose, { mongo } from "mongoose";

const notifyModel = new mongoose.Schema({
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

const notification = mongoose.model('Notification', notifyModel)

export {notification}