import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    keys: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          auto: true,
        },
        key: {
          type: String,
          required: true,
          unique: true,
        },
        identifier: {
          type: String,
          required: true,
          unique: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    max_quota: {
      type: Number,
      default: 20,
    },
    used_quota: {
      type: Number,
      default: 0,
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

const Keys = mongoose.model("Keys", schema);

export default Keys;
