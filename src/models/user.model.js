import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    email:{
        type:String,
        default:"",
        unique
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
    }
})

export default mongoose.model('user',userSchema)