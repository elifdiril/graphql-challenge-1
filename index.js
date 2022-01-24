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

  type locations {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  type users {
    id: ID!
    username: String!
    email: String!
  }

  type participants {
    id: ID
    user_id: Int!
    event_id: Int!
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
