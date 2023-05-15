import mongoose from "mongoose";

const gasCategoriesModel = mongoose.Schema({
    gasName:{
        type:String,
        required:true,
        unique:true
    },
    gasImage:{
        type:String,
        required:true
    }
})

const gasCategories = mongoose.model("Categories", gasCategoriesModel)
export default gasCategories