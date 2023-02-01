import { gql } from "@apollo/client";

// export const GET_TRIPS

export const QUERY_TRIPS = gql `
query Query {
  getTrips {
    _id
    createdAt
    tripName
    users {
      _id
      createdAt
      tripName
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($tripId: ID!) {
    getPosts(tripId: $tripId) {
      _id
      dateCreated
      postType
    }
  }
`;
