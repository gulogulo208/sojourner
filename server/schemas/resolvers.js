const { AuthenticationError } = require("apollo-server-express");
const {
  User,
  Trip,
  Post,
  Transportation,
  Lodging,
  Itinerary,
} = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getTrips: async (parent, args, context) => {
      if (context.user) {
        const userTrips = await User.findById(context.user._id).populate(
          "trips"
        );

        return userTrips;
      }

      throw new AuthenticationError("You must be logged in to view trips");
    },

    getPosts: async (parent, { tripId }, context) => {
      if (context.user) {
        const tripPosts = await Trip.findById(tripId).populate("posts");

        return tripPosts;
      }

      throw new AuthenticationError("You must be logged in to view posts");
    },
  },

  Mutation: {
    signup: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    createTrip: async (parent, { tripName }, context) => {
      if (context.user) {
        const trip = new Trip({ tripName });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { trips: trip._id },
        });

        return trip;
      }

      throw new AuthenticationError("You must be logged in to create a trip");
    },

    addUserToTrip: async (parent, { tripId, userId }, context) => {
      if (context.user) {
        const updatedTrip = await Trip.findByIdAndUpdate(tripId, {
          $push: { users: userId },
        });

        const updatedUser = await User.findByIdAndUpdate(userId, {
          $push: { trips: updatedTrip._id },
        });

        return { updatedTrip };
      }

      throw new AuthenticationError(
        "You must be logged in to add a user to a trip"
      );
    },

    createPost: async (parent, args, context) => {
      if (context.user) {
        const post = new Post({ postType: args.postType, trip: args.tripId });

        switch (post.postType) {
          case "Transportation":
            const transportation = new Transportation({
              transportationType: args.transportationType,
              fromDate: args.fromDate,
              toDate: args.toDate,
              price: args.price,
              post: post._id,
            });

            await User.findByIdAndUpdate(context.user._id, {
              $push: { posts: post },
            });

            await Trip.findByIdAndUpdate(args.tripId, {
              $push: { posts: post },
            });

            return { post };

          case "Lodging":
            const lodging = new Lodging({
              lodgingType: args.lodgingType,
              fromDate: args.fromDate,
              toDate: args.toDate,
              price: args.price,
              post: post._id,
            });

            await User.findByIdAndUpdate(context.user._id, {
              $push: { posts: post },
            });

            await Trip.findByIdAndUpdate(args.tripId, {
              $push: { posts: post },
            });

            return { post };

          case "Itinerary":
            const itinerary = new Itinerary({
              activity: args.activity,
              description: args.description,
              price: args.price,
              post: post._id,
            });

            await User.findByIdAndUpdate(context.user._id, {
              $push: { posts: post },
            });

            await Trip.findByIdAndUpdate(args.tripId, {
              $push: { posts: post },
            });

            return { post };

          default:
            console.error("postType is required");
        }
      }

      throw new AuthenticationError("You must be logged in to create a post");
    },
  },
};

module.exports = resolvers;
