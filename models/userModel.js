import mongoose from "mongoose";

const postUserModel = mongoose.Schema({
    userEmail : {
        type:String,
        unique:[true, "Email already taken"],
        required:[true, "kindly provide an email"]
    }, 
    userName : {
        type: String, 
        required:[true, "kindly provide a user name"]
    },
    password : {
        type:String,
        required:[true, "kindly provide a password"]
    },
    phoneNumber : {
        type:String,
        required: [true, "kindly provide a phone number"]
    },
    location:{
        type:String, 
        required : false
    }
})
const postUser = mongoose.model('Users', postUserModel)
export { postUser}