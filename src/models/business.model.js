import mongoose from "mongoose"

const businessSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"business"
    }
})

 businessSchema.virtual('products',{
    ref:'product',
    localField:'_id',
    foreignField:'business',
 })
businessSchema.set("toObject", { virtuals: true });
businessSchema.set("toJSON", { virtuals: true });

export default mongoose.model('business',businessSchema)