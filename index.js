const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { ApolloServer, gql } = require('apollo-server');
const { events, participants, users, locations } = require('./data');

const typeDefs = gql`
type Event {
    id: Int!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: Int!
    user_id: Int!
    user: User!
    location: Location!
    participants: [Participant!]!
  }

  type Location {
    id: Int!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  type User {
    id: Int!
    username: String!
    email: String!
    events: [Event!]!
  }

  type Participant {
    id: Int!
    user_id: Int!
    user: User!
    event_id: Int!
    event: Event!
  }

  type Query {
    events: [Event!]
    event(id: Int!): Event

    locations: [Location!]
    location(id: Int!): Location

    users: [User!]
    user(id: Int!): User!
    
    participants: [Participant!]
    participant(id: Int!): Participant!
  }

`;

const resolvers = {
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
            const data = participants.find((participant) => participant.id === args.id);
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