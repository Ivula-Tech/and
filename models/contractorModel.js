import mongoose from "mongoose";

const contractorModel = mongoose.Schema({
    contName:{
        type:String,
        required:[true, "kindly provide an name"],
    },
    contEmail:{
        type:String,
        required:[true, "kindly provide an email"], 
        unique:[true, "Email already taken"]
    },
    contPhone:{
        type:String,
        required:[true, "kindly provide an phone number"],

    },
    password:{
        type:String,
        required:[true, "kindly provide an password"]
    },
    Image:{
        type:String,
        required:true,
        default:''
    }
})

const contractors = mongoose.model('Contractors', contractorModel)
export default contractors