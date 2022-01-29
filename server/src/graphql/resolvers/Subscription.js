import { withFilter } from "graphql-yoga";

export const Subscription = {
  userCreated: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator("userCreated"),
      (payload, variables) => {
        console.log(payload, variables);
        return variables.id ? payload.userCreated.id === variables.id : true;
      }
    ),
  },

  eventCreated: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator("eventCreated"),
      (payload, variables) => {
        console.log(payload, variables);
        return variables.id ? payload.eventCreated.id === variables.id : true;
      }
    ),
  },
};

