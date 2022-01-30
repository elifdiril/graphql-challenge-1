import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query getEvents {
    events {
      id
      title
      desc
      date
    }
  }
`;

export const EVENT_SUBSCRIPTION = gql`
  subscription {
    eventCreated {
      title
      desc
      date
    }
  }
`;
