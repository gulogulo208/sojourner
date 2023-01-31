const mongoose = require("mongoose");

const { Schema } = mongoose;

const transportationSchema = new Schema({
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  transportationType: {
    type: String,
    enum: ["Plane", "Car", "Boat"],
    required: true,
  },
  fromDate: {
    type: Date,
  },
  toDate: {
    type: Date,
  },
  price: {
    type: Number,
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

const Transportation = mongoose.model("Transportation", transportationSchema);

module.exports = Transportation;
