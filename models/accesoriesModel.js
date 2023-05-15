import mongoose from 'mongoose'

const AccModel = mongoose.Schema({
    AccName: {
        type: String,
        required: true,
        ref:'Categories'
    },
    gassStationName:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'GassStation'
    },
    AccService:{
        type:String,
        required:true
    },
    AccPrice: {
        type: String,
        required: true
    },
    deliveryTime: {
        type: String,
        required: true
    }

})

const Acc = mongoose.model("Accesories", AccModel)

export default Acc