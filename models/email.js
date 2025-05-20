import mongoose from "mongoose"

const schema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
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
)

const Email = mongoose.model("Email", schema)

export default Email;
