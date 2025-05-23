import mongoose from "mongoose";

const schema = mongoose.Schema(
    {
        plan: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        provider: {
            type: String,
            required: true
        },
        order_id: {
            type: String,
            required: true
        },
        receipt: {
            type: String,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        payment_id: {
            type: String
        },
        signature: {
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Subscription = mongoose.model("Subscription", schema);

export default Subscription;
