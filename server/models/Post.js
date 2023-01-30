const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema(
  {
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
    postData: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

postSchema.virtual("transportation", {
  ref: "Transportation",
  localField: "postData",
  foreignField: "_id",
  justOne: true,
});

postSchema.virtual("lodging", {
  ref: "Lodging",
  localField: "postData",
  foreignField: "_id",
  justOne: true,
});

postSchema.virtual("itinerary", {
  ref: "Itinerary",
  localField: "postData",
  foreignField: "_id",
  justOne: true,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
