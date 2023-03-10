import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation Mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOG_IN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        password
      }
    }
  }
`;

export const CREATE_TRIP = gql`
  mutation Mutation($tripName: String!, $tripDate: String!) {
    createTrip(tripName: $tripName, tripDate: $tripDate) {
      _id
      createdAt
      tripDate
      tripName
      tripPhoto
    }
  }
`;

export const ADD_USER_TO_TRIP = gql`
  mutation addUserToTrip($email: String!, $tripId: String!) {
    addUserToTrip(email: $email, tripId: $tripId) {
      _id
      tripName
    }
  }
`;

export const REMOVE_USER_FROM_TRIP = gql`
  mutation removeUserFromTrip($tripId: String!, $userId: String!) {
    removeUserFromTrip(tripId: $tripId, userId: $userId) {
      _id
      tripName
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $postType: String!
    $tripId: String!
    $firstName: String!
    $lastName: String!
    $transportationType: String
    $fromDate: String
    $toDate: String
    $price: String
    $lodgingType: String
    $activity: String
    $description: String
  ) {
    createPost(
      postType: $postType
      tripId: $tripId
      firstName: $firstName
      lastName: $lastName
      transportationType: $transportationType
      fromDate: $fromDate
      toDate: $toDate
      price: $price
      lodgingType: $lodgingType
      activity: $activity
      description: $description
    ) {
      _id
      dateCreated
      postType
    }
  }
`;

export const REMOVE_TRIP = gql`
  mutation removeTrip($tripId: String!) {
    removeTrip(tripId: $tripId) {
      _id
    }
  }
`;

export const REMOVE_POST = gql`
  mutation removePost($postId: String!, $userId: String!, $tripId: String!) {
    removePost(postId: $postId, userId: $userId, tripId: $tripId) {
      _id
      firstName
      description
    }
  }
`;
