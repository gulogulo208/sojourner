import { gql } from "@apollo/client";

export const GET_TRIPS = gql`
  query getTrips {
    getTrips {
      _id
      createdAt
      tripName
      users {
        _id
        firstName
        lastName
      }
      posts {
        _id
        dateCreated
        postType
        tripId
        fromDate
        toDate
        price
        transportationType
        lodgingType
        activity
        description
      }
      tripPhoto
    }
  }
`;

export const GET_TRIP = gql`
  query getTrip($tripId: ID!) {
    getTrip(tripId: $tripId) {
      tripName
      tripPhoto
      _id
    }
  }
`;

export const GET_POSTS = gql`
  query getPosts($tripId: ID!) {
    getPosts(tripId: $tripId) {
      _id
      dateCreated
      firstName
      lastName
      postType
      fromDate
      toDate
      transportationType
      lodgingType
      activity
      description
      price
    }
  }
`;

export const GET_USER = gql`
  query getUser {
    getUser {
      _id
      firstName
      lastName
    }
  }
`;
