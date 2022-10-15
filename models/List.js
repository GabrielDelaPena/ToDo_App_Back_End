const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    description: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    createdDate: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    endDate: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listSchema);
