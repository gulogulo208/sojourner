import { gql } from '@apollo/client';

export const SIGN_UP = gql `
mutation Mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    token
    user {
      _id
    }
  }
}
`

export const LOG_IN = gql `
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      email
      password
    }
  }
}
`
export const CREATE_TRIP = gql`
mutation Mutation($tripName: String!) {
  createTrip(tripName: $tripName) {
    tripName
    _id
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
  }
}
`

export const CREATE_POST = gql `
mutation CreatePost($postType: String!, $tripId: ID!, $transportationType: String, $fromDate: String, $toDate: String, $price: Float, $lodgingType: String, $activity: String, $description: String) {
  createPost(postType: $postType, tripId: $tripId, transportationType: $transportationType, fromDate: $fromDate, toDate: $toDate, price: $price, lodgingType: $lodgingType, activity: $activity, description: $description) {
    _id
    dateCreated
    postType
  }
}
`