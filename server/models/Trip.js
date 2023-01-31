const mongoose = require("mongoose");

const { Schema } = mongoose;

const tripSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tripName: {
    type: String,
    required: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
