import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    email:{
        type:String,
        default:"",
        unique:true,
    },
    password:{
        type:String,
        default:""
    },
    firstName:{
        type:String,
        default:""
    },
    lastName:{
        type:String,
        default:""
    },
    age:{
        type:Number,
        default:0
    },
    roles:{
        type:[String],
        default:["user"]
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
        default: null
    },
})

export default mongoose.model('user',userSchema)