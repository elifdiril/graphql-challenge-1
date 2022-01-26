const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { ApolloServer, gql } = require('apollo-server');
const { events, participants, users, locations } = require('./data');
const { nanoid } = require('nanoid');

const typeDefs = gql`

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

  type Mutation {
    createUser(data: inputCreateUser!): User!
    updateUser(id: ID!, data: inputUpdateUser!): User!
    deleteUser(id: ID!): User!
    deleteAllUsers: DeleteAll!

  }

`;

const resolvers = {
    Mutation: {
        createUser: (parent, { data }) => {
            const user = {
                id: nanoid(),
                ...data
            };

            users.push(user);

            return user;
        },

        updateUser: (parent, { id, data }) => {
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

        deleteUser: (parent, { id }) => {
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
        }

    },

    Query: {
        events: () => events,
        event: (parent, args) => {
            const data = events.find((event) => event.id === args.id);
            return data;
        },

        locations: () => locations,
        location: (parent, args) => {
            const data = locations.find((location) => location.id === args.id);
            return data;
        },

        users: () => users,
        user: (parent, args) => {
            const data = users.find((user) => user.id === args.id);
            return data;
        },

        participants: () => participants,
        participant: (parent, args) => {
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


const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
            // options
        })
    ]
});

server.listen().then(({ url }) => console.log(`Apollo server is up to ${url}`));