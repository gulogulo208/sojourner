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
      createdBy {
        _id
        firstName
        lastName
      }
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

export const GET_USERS_OF_TRIP = gql`
  query getUsersOfTrip($tripId: ID!) {
    getUsersOfTrip(tripId: $tripId) {
      _id
      firstName
      lastName
    }
  }
`;
