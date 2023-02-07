const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    trips: [Trip]
    posts: [Post]
  }

  type Trip {
    _id: ID!
    createdAt: String!
    createdBy: User!
    tripName: String!
    tripDate: String!
    tripPhoto: String
    users: [User]
    posts: [Post]
  }

  type Post {
    _id: ID!
    dateCreated: String!
    firstName: String!
    lastName: String!
    postType: String!
    tripId: String!
    fromDate: String
    toDate: String
    price: String
    transportationType: String
    lodgingType: String
    activity: String
    description: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    getTrips: [Trip]
    getTrip(tripId: ID!): Trip
    getUpcomingTrips(tripDate: String!): [Trip]
    getPosts(tripId: ID!): [Post]
    getUser: User
    getUsersOfTrip(tripId: ID!): [User]
  }

  type Mutation {
    signup(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    removeTrip(tripId: ID!): Trip
    createTrip(tripName: String!, tripDate: String!): Trip
    addUserToTrip(tripId: String!, email: String!): Trip

    createPost(
      postType: String!
      firstName: String!
      lastName: String!
      tripId: String!
      fromDate: String
      toDate: String
      price: String
      transportationType: String
      lodgingType: String
      activity: String
      description: String
    ): Post

    removeUserFromTrip(tripId: String!, userId: String!): Trip
    removePost(postId: String!, userId: String!, tripId: String!): Post
  }
`;

module.exports = typeDefs;
