const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema({
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  postType: {
    type: String,
    enum: ["Transportation", "Lodging", "Itinerary"],
    required: true,
  },
  trip: {
    type: Schema.Types.ObjectId,
    ref: "Trip",
  },
  fromDate: {
    type: String,
  },
  toDate: {
    type: String,
  },
  price: {
    type: Number,
  },
  transportationType: {
    type: String,
  },
  lodgingType: {
    type: String,
  },
  activity: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
