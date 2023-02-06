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

export const GET_UPCOMINGTRIPS = gql`
query GetUpcomingTrips($tripDate: String!) {
  getUpcomingTrips(tripDate: $tripDate) {
    tripName
    posts {
      fromDate
      toDate
      postType
      transportationType
      lodgingType
      activity
      description
    }
  }
}
`;
