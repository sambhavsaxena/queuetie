import mongoose from "mongoose";

const schema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", schema);

export default User;
