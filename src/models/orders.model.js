import mongoose from "mongoose"

const ordersSchema = mongoose.Schema({
    business:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"business",
        required: true
    },
    buyer:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"buyers",
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
        }
   ],
    status:{
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending"
    },
    totalPrice: {
        type: Number,
        min: 0,
        required: true

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('orders',ordersSchema)