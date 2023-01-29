import { gql } from '@apollo/client';

export const SIGN_UP = gql `
mutation Mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        password
      }
    }
  }
`

export const LOG_IN = gql `
mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        password
        trips {
          _id
          createdAt
          tripName
        }
        posts {
          _id
          dateCreated
          postType
          trip {
            _id
          }
        }
      }
    }
  }
`
export const CREATE_TRIP = gql`
mutation CreateTrip($tripName: String!) {
    createTrip(tripName: $tripName) {
      _id
      createdAt
      tripName
      users {
        _id
      }
    }
  }
`

export const ADD_USER_TO_TRIP = gql`
mutation Mutation($tripId: String!, $userId: String!) {
    addUserToTrip(tripId: $tripId, userId: $userId) {
      _id
      createdAt
      tripName
    }
  }
`

export const CREATE_POST = gql `
mutation Mutation($postType: String!, $trip: ID!, $transportationType: String, $fromDate: String, $toDate: String, $price: String, $lodgingType: String, $activity: String, $description: String) {
    createPost(postType: $postType, trip: $trip, transportationType: $transportationType, fromDate: $fromDate, toDate: $toDate, price: $price, lodgingType: $lodgingType, activity: $activity, description: $description) {
      _id
      dateCreated
      postType
      trip {
        _id
      }
    }
  }
`