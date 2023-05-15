import mongoose from "mongoose";

const ordersModel = new mongoose.Schema({
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Contractors',
        cascade:'delete'
    },
    contID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
        cascade:'delete'
    },
    item: {
        itemTier: {
            type: String,
            required:true
        },
        itemID: {
            type:mongoose.Schema.Types.ObjectId,
            required:[true, 'The item you requested does not exist'],
            ref:function(){
                return this.item.itemTier
            },
            cascade:'delete'
        }

    }
})

const orders = mongoose.model('Orders',ordersModel)
export default orders