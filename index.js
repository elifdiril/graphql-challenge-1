const { GraphQLServer, PubSub, withFilter } = require('graphql-yoga');
const { events, participants, users, locations } = require('./data');
const { nanoid } = require('nanoid');

const typeDefs = `
type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: String!
    user_id: String!
    user: User!
    location: Location!
    participants: [Participant!]!
  }

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    events: [Event!]!
  }

  type Participant {
    id: ID!
    user_id: String!
    user: User!
    event_id: String!
    event: Event!
  }

  type Query {
    events: [Event!]
    event(id: ID!): Event

    locations: [Location!]
    location(id: ID!): Location

    users: [User!]
    user(id: ID!): User
    
    participants: [Participant!]
    participant(id: ID!): Participant
  }

  type DeleteAll{
      count: Int!
  }

  input inputCreateUser {
    username: String!
    email: String!
  }

  input inputUpdateUser {
    username: String
    email: String
  }

  input inputCreateEvent {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: String!
    user_id: String!
  }

  input inputUpdateEvent {
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: String
    user_id: String
  }

  type Mutation {
    createUser(data: inputCreateUser!): User!
    updateUser(id: ID!, data: inputUpdateUser!): User!
    deleteUser(id: ID!): User!
    deleteAllUsers: DeleteAll!

    createEvent(data: inputCreateEvent!): Event!
    updateEvent(id: ID!, data: inputUpdateEvent!): Event!
    deleteEvent(id: ID!): Event!
    deleteAllEvents: DeleteAll!

  }

  type Subscription {
    userCreated(id: ID): User!
    eventCreated(id: ID): Event!
    participantAdded(id: ID): Participant!
  }

`;

const resolvers = {
    Subscription: {
        userCreated: {
            subscribe: withFilter((_, __, { pubsub }) => pubsub.asyncIterator('userCreated'),
                (payload, variables) => {
                    console.log(payload, variables)
                    return variables.id ? (payload.userCreated.id === variables.id) : true;
                })
        },

        eventCreated: {
            subscribe: withFilter((_, __, { pubsub }) => pubsub.asyncIterator('eventCreated'),
                (payload, variables) => {
                    console.log(payload, variables)
                    return variables.id ? (payload.eventCreated.id === variables.id) : true;
                })
        },
    },

    Mutation: {
        //user
        createUser: (_, { data }, { pubsub }) => {
            const user = {
                id: nanoid(),
                ...data
            };

            users.push(user);
            pubsub.publish('userCreated', { userCreated: user });

            return user;
        },

        updateUser: (_, { id, data }) => {
            const user_index = users.findIndex(user => user.id == id);

            if (user_index == -1) {
                throw new Error("User not found!");
            }

            const updatedUser = (users[user_index] = {
                ...users[user_index],
                ...data
            });

            return updatedUser;
        },

        deleteUser: (_, { id }) => {
            const user_index = users.findIndex(user => user.id == id);

            if (user_index == -1) {
                throw new Error("User not found!");
            }

            const deletedUser = users[user_index];
            users.splice(user_index, 1);

            return deletedUser;
        },

        deleteAllUsers: () => {
            const count = users.length;

            users.splice(0, count);

            return { count };
        },

        //event

        createEvent: (_, { data }, { pubsub }) => {
            const event = {
                id: nanoid(),
                ...data
            };

            events.push(event);
            pubsub.publish('eventCreated', { eventCreated: event });

            return event;
        },

        updateEvent: (_, { id, data }) => {
            const event_index = events.findIndex(event => event.id == id);

            if (event_index == -1) {
                throw new Error("Event not found!");
            }

            const updatedEvent = (events[event_index] = {
                ...events[event_index],
                ...data
            });

            return updatedEvent;
        },

        deleteEvent: (_, { id }) => {
            const event_index = events.findIndex(event => event.id == id);

            if (event_index == -1) {
                throw new Error("Event not found!");
            }

            const deletedEvent = events[event_index];
            events.splice(event_index, 1);

            return deletedEvent;
        },

        deleteAllEvents: () => {
            const count = events.length;

            events.splice(0, count);

            return { count };
        }

    },

    Query: {
        events: () => events,
        event: (_, args) => {
            const data = events.find((event) => event.id === args.id);
            return data;
        },

        locations: () => locations,
        location: (_, args) => {
            const data = locations.find((location) => location.id === args.id);
            return data;
        },

        users: () => users,
        user: (_, args) => {
            const data = users.find((user) => user.id === args.id);
            return data;
        },

        participants: () => participants,
        participant: (_, args) => {
            const data = participants.find((participant) => participant.id == args.id);
            return data;
        }
    },

    User: {
        events: (parent) => events.filter((event) => event.user_id === parent.id)
    },

    Event: {
        user: (parent) => users.find((user) => user.id === parent.user_id),
        location: (parent) => locations.find((location => location.id === parent.location_id)),
        participants: (parent) => participants.filter((participant) => participant.event_id === parent.id)
    },

    Participant: {
        user: (parent) => users.find((user) => user.id === parent.user_id),
        event: (parent) => events.find((event) => event.id === parent.event_id)
    }

};


const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });

server.start(() => console.log('Server is running on http://localhost:4000/'));
