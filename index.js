const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { ApolloServer, gql } = require('apollo-server');
const { events, pariticipants, users, locations } = require('./data');

const typeDefs = gql`
type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: Int!
    user_id: Int!
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
  }

  type Participant {
    id: ID
    user_id: Int!
    event_id: Int!
  }

  type Query {
    events: [Event!]
    event(id: ID): Event!

    locations: [Location!]
    location(id: ID): Location!

    users: [User!]
    user(id: ID): User!
    
    participants: [Participant!]
    participant: Participant!
  }

`;

const resolvers = {
    Query: {

    },
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
