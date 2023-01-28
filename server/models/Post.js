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
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
