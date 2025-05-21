import mongoose from "mongoose"

const schema = mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ["login", "logout", "verify", "key_delete", "key_create", "enqueue"],
        },
        info: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["success", "failed"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        }
    },
    {
        timestamps: true,
    }
)

const Activity = mongoose.model("Activity", schema)

export default Activity;
