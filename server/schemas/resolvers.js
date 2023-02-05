const { AuthenticationError } = require("apollo-server-express");
const { User, Trip, Post } = require("../models");
const { signToken } = require("../utils/auth");
const { createTripPhoto } = require("../utils/createTripPhoto");

const resolvers = {
  Query: {
    getTrips: async (parent, args, context) => {
      if (context.user) {
        try {
          const userTrips = await Trip.find({
            users: context.user._id,
          }).populate("users");

          return userTrips;
        } catch (error) {
          console.error(error);
        }
      }

      throw new AuthenticationError("You must be logged in to view trips");
    },

    getTrip: async (parent, { tripId }, context) => {
      if (context.user) {
        try {
          const specificTrip = await Trip.findOne({
            _id: tripId,
          });

          return specificTrip;
        } catch (error) {
          console.error(error);
        }
      }
      throw new AuthenticationError("You must be logged in to view your trips");
    },

    getUpcomingTrips: async (parent, {tripDate}, context) => {
      const currentDate = new Date();
      if (context.user){
        try {
          const upcomingTrips = await Trip.find({tripDate: {$gte: currentDate }}).populate("posts");
          return upcomingTrips
        } catch (error) {
          console.error(error)
        }
      }
    },
 
    getPosts: async (parent, { tripId }, context) => {
      if (context.user) {
        try {
          const tripPosts = await Post.find({ tripId: tripId });

          return tripPosts;
        } catch (error) {
          console.error(error);
        }
      }

      throw new AuthenticationError("You must be logged in to view posts");
    },

    getUser: async (parent, args, context) => {
      if (context.user) {
        try {
          const user = await User.findOne({ _id: context.user._id });

          return user;
        } catch (error) {
          console.error(error);
        }
      }

      throw new AuthenticationError("You must be logged in to get a user");
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
        throw new AuthenticationError("Incorrect email or password");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect email or password");
      }

      const token = signToken(user);

      return { token, user };
    },

    createTrip: async (parent, { tripName, tripDate }, context) => {
      if (context.user) {
        const tripPhoto = await createTripPhoto(tripName);

        const trip = await Trip.create({
          tripName,
          tripDate,
          tripPhoto,
        });

        await Trip.findOneAndUpdate(trip._id, {
          $addToSet: { users: context.user._id },
        });

        await User.findByIdAndUpdate(context.user._id, {
          $addToSet: { trips: trip._id },
        });

        return trip;
      }

      throw new AuthenticationError("You must be logged in to create a trip");
    },

    addUserToTrip: async (parent, { tripId, userId, tripName }, context) => {
      if (context.user) {
        const updatedTrip = await Trip.findByIdAndUpdate(tripId, {
          $addToSet: { users: userId },
        });

        const updatedUser = await User.findByIdAndUpdate(userId, {
          $addToSet: { trips: updatedTrip._id },
        });

        return updatedTrip;
      }
      throw new AuthenticationError(
        "You must be logged in to add a user to a trip"
      );
    },

    createPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          postType: args.postType,
          tripId: args.tripId,
          fromDate: args.fromDate,
          toDate: args.toDate,
          price: args.price,
          transportationType: args.transportationType,
          lodgingType: args.lodgingType,
          activity: args.activity,
          description: args.description,
        });

        await User.findOneAndUpdate(context.user._id, {
          $addToSet: { posts: post._id },
        });

        await Trip.findOneAndUpdate(args.tripId, {
          $addToSet: { posts: post._id },
        });

        return post;
      }

      throw new AuthenticationError("You must be logged in to create a post");
    },
  },
};

module.exports = resolvers;
