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
    tripName: String!
    tripPhoto: String
    users: [User]
    posts: [Post]
  }

  type Post {
    _id: ID!
    dateCreated: String!
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
    getTrip(tripId: ID!): [Trip]
    getPosts(tripId: ID!): [Post]
  }

  type Mutation {
    signup(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    createTrip(tripName: String!): Trip
    addUserToTrip(tripId: String!, userId: String!): Trip
    createPost(
      postType: String!
      tripId: String!
      fromDate: String
      toDate: String
      price: String
      transportationType: String
      lodgingType: String
      activity: String
      description: String
    ): Post
  }
`;

module.exports = typeDefs;
