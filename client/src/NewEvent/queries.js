import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers {
    users {
      id
      username
    }
  }
`;

export const GET_LOCATIONS = gql`
  query getLocations {
    locations {
      id
      name
    }
  }
`;

export const NEW_EVENT = gql`
  mutation newEvent($data: inputCreateEvent!) {
    createEvent(data: $data) {
      id
      title
    }
  }
`;
