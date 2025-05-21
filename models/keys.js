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
          unique: true
        },
        identifier: {
          type: String,
          required: true,
          unique: true
        },
        limit: {
          type: Number,
          required: true,
          default: 10,
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
