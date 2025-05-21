import mongoose from "mongoose"

const schema = mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },
        info: {
            type: String,
            required: true,
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
