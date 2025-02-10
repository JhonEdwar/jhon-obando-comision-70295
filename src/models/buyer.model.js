import mongoose from "mongoose"

const buyerSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"buyer"
    },
    orders:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:"orders"
        }
    ],

})

export default mongoose.model('buyers',buyerSchema)