import { nanoid } from "nanoid";

export const Mutation = {
  //user
  createUser: (_, { data }, { pubsub, db }) => {
    const userCreated = {
      id: nanoid(),
      ...data,
    };

    db.users.push(userCreated);
    pubsub.publish("userCreated", { userCreated });

    return userCreated;
  },

  updateUser: (_, { id, data }, { db }) => {
    const user_index = db.users.findIndex((user) => user.id == id);

    if (user_index == -1) {
      throw new Error("User not found!");
    }

    const updatedUser = (db.users[user_index] = {
      ...db.users[user_index],
      ...data,
    });

    return updatedUser;
  },

  deleteUser: (_, { id }, { db }) => {
    const user_index = db.users.findIndex((user) => user.id == id);

    if (user_index == -1) {
      throw new Error("User not found!");
    }

    const deletedUser = db.users[user_index];
    db.users.splice(user_index, 1);

    return deletedUser;
  },

  deleteAllUsers: (_, __, { db }) => {
    const count = users.length;

    db.users.splice(0, count);

    return { count };
  },

  //event
  createEvent: (_, { data }, { pubsub, db }) => {
    const eventCreated = {
      id: nanoid(),
      ...data,
    };

    db.events.push(eventCreated);
    pubsub.publish("eventCreated", { eventCreated });

    return eventCreated;
  },

  updateEvent: (_, { id, data }, { db }) => {
    const event_index = db.events.findIndex((event) => event.id == id);

    if (event_index == -1) {
      throw new Error("Event not found!");
    }

    const updatedEvent = (db.events[event_index] = {
      ...db.events[event_index],
      ...data,
    });

    return updatedEvent;
  },

  deleteEvent: (_, { id }, { db }) => {
    const event_index = db.events.findIndex((event) => event.id == id);

    if (event_index == -1) {
      throw new Error("Event not found!");
    }

    const deletedEvent = db.events[event_index];
    db.events.splice(event_index, 1);

    return deletedEvent;
  },

  deleteAllEvents: (_, __, { db }) => {
    const count = events.length;

    db.events.splice(0, count);

    return { count };
  },
};
