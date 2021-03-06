import { gql } from "@apollo/client";

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
      title
      desc
      date
      user {
        username
        email
      }
      location {
        name
        lat
        lng
      }
      participants {
        user {
          username
        }
      }
    }
  }
`;
