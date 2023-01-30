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
        try {
          const userTrips = await Trip.find({ users: context.user._id });

          return userTrips;
        } catch (error) {
          console.error(error);
        }
      }

      throw new AuthenticationError("You must be logged in to view trips");
    },

    getPosts: async (parent, { tripId }, context) => {
      if (context.user) {
        try {
          const tripPosts = await Post.find({ trip: tripId });

          return tripPosts;
        } catch (error) {
          console.error(error);
        }
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

        await trip.save();

        await User.findByIdAndUpdate(context.user._id, {
          $push: { trips: trip._id },
        });

        return trip;
      }

      throw new AuthenticationError("You must be logged in to create a trip");
    },

    addUserToTrip: async (parent, { tripId, userId, tripName }, context) => {
      if (context.user) {
        const updatedTrip = await Trip.findByIdAndUpdate(tripId, {
          $push: { users: userId },
        });

        const updatedUser = await User.findByIdAndUpdate(userId, {
          $push: { trips: updatedTrip._id },
        });

        return  updatedTrip ;
      }

      throw new AuthenticationError(
        "You must be logged in to add a user to a trip"
      );
    },

    createPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          postType: args.postType,
          trip: args.tripId,
        });

        switch (post.postType) {
          case "Transportation":
            const transportation = await Transportation.create({
              transportationType: args.transportationType,
              fromDate: args.fromDate,
              toDate: args.toDate,
              price: args.price,
              post: post._id,
            });

            post.postData = transportation._id;
            await post.save();

            await User.findByIdAndUpdate(context.user._id, {
              $push: { posts: post._id },
            });

            await Trip.findByIdAndUpdate(args.tripId, {
              $push: { posts: post._id },
            });

            return post;

          case "Lodging":
            const lodging = await Lodging.create({
              lodgingType: args.lodgingType,
              fromDate: args.fromDate,
              toDate: args.toDate,
              price: args.price,
              post: post._id,
            });

            post.postData = lodging._id;
            await post.save();

            await User.findByIdAndUpdate(context.user._id, {
              $push: { posts: post._id },
            });

            await Trip.findByIdAndUpdate(args.tripId, {
              $push: { posts: post._id },
            });

            return post;

          case "Itinerary":
            const itinerary = await Itinerary.create({
              activity: args.activity,
              description: args.description,
              price: args.price,
              post: post._id,
            });

            post.postData = itinerary._id;
            await post.save();

            await User.findByIdAndUpdate(context.user._id, {
              $push: { posts: post._id },
            });

            await Trip.findByIdAndUpdate(args.tripId, {
              $push: { posts: post._id },
            });

            return post;

          default:
            console.error("postType is required");
        }
      }

      throw new AuthenticationError("You must be logged in to create a post");
    },
  },
};

module.exports = resolvers;
