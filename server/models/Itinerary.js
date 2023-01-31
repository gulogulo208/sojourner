const mongoose = require("mongoose");

const { Schema } = mongoose;

const itinerarySchema = new Schema({
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  activity: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

module.exports = Itinerary;
