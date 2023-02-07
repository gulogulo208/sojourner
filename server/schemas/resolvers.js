const { AuthenticationError, ApolloError } = require("apollo-server-express");
const { User, Trip, Post } = require("../models");
const { signToken } = require("../utils/auth");
const { createTripPhoto } = require("../utils/createTripPhoto");
const error = ApolloError

const resolvers = {

  Query: {
    getTrips: async (parent, args, context) => {
      if (context.user) {
        try {
          const userTrips = await Trip.find({
            users: context.user._id,
          })
            .populate("users")
            .populate("posts")
            .populate("createdBy");

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
          }).populate("createdBy");

          return specificTrip;
        } catch (error) {
          console.error(error);
        }
      }
      throw new AuthenticationError("You must be logged in to view your trips");
    },

    getUpcomingTrips: async (parent, { tripDate }, context) => {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: "2-digit", 
        day: "2-digit", 
        year: "numeric"
      })
      if (context.user){
        try {
          const upcomingTrips = await Trip.find({tripDate: {$gte: formattedDate }}).populate("posts");
          return upcomingTrips
        } catch (error) {
          console.error(JSON.stringify(error, null, 2))
        }
      }
    },

    getPosts: async (parent, { tripId }, context) => {
      if (context.user) {
        try {
          const tripPosts = await Post.find({ tripId: tripId });

          return tripPosts.reverse();
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

    getUsersOfTrip: async (parent, { tripId }, context) => {
      if (context.user) {
        try {
          const tripUsers = await User.find({ trips: tripId });

          return tripUsers;
        } catch (error) {
          console.error(error);
        }
      }

      throw new AuthenticationError(
        "You must be logged in get users of a trip"
      );
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
        try {
        const tripPhoto = await createTripPhoto(tripName);

        const trip = await Trip.create({
          createdBy: context.user._id,
          tripName,
          tripDate,
          tripPhoto,
        });

        await Trip.findOneAndUpdate(trip._id, {
          $addToSet: { users: context.user._id },
        });

        await User.findByIdAndUpdate(context.user._id, {
          $addToSet: { trips: trip._id },
        }, 
        { new: true}
        );

        return trip;
      } catch (error){
        console.error(JSON.stringify(error, null, 2))
      }
    }

      throw new AuthenticationError("You must be logged in to create a trip");
    },

    addUserToTrip: async (parent, { email, tripId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { email: email },
          {
            $addToSet: { trips: tripId },
          }
        );

        const updatedTrip = await Trip.findByIdAndUpdate(
          tripId,
          {
            $addToSet: { users: updatedUser._id },
          },
          { new: true }
        );

        return updatedTrip;
      }
      throw new AuthenticationError(
        "You must be logged in to add a user to a trip"
      );
    },

    removeUserFromTrip: async (parent, { tripId, userId }, context) => {
      if (context.user) {
        try {
          const updatedTrip = await Trip.findByIdAndUpdate(
            tripId,
            { $pull: { users: userId } },
            { new: true }
          );

          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { trips: tripId } },
            { new: true }
          );

          return updatedTrip;
        } catch (error) {
          console.error(error);
        }
      }

      throw new AuthenticationError(
        "You must be logged in to remove a user from a trip"
      );
    },

    createPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          postType: args.postType,
          firstName: args.firstName,
          lastName: args.lastName,
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
        await Trip.findOneAndUpdate(
          { _id: args.tripId },
          {
            $addToSet: { posts: post._id },
          }
        );

        return post;
      }

      throw new AuthenticationError("You must be logged in to create a post");
    },
  },
};

module.exports = resolvers;
