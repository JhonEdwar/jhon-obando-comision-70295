import mongoose from "mongoose"

const cartSchema = mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min:1,
                max: 100,
            }
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    createdAt: {
    type: Date,
    default: Date.now
    },
});

export default mongoose.model('cart',cartSchema)



