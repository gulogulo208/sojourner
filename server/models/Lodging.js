const mongoose = require("mongoose");

const { Schema } = mongoose;

const lodgingSchema = new Schema({
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  lodgingType: {
    type: String,
    enum: ["Hotel", "Vacation Rental", "Hostel"],
    required: true,
  },
  fromDate: {
    type: Date,
    default: Date.now,
  },
  toDate: {
    type: Date,
    default: Date.now,
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

const Lodging = mongoose.model("Lodging", lodgingSchema);

module.exports = Lodging;
