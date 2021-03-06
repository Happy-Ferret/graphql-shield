const { GraphQLServer } = require('graphql-yoga')
const { shield } = require('graphql-shield')

const typeDefs = `
  type Query {
    hello(name: String): String!
    secret(agent: String!, code: String!): String
  }
`

const resolvers = {
   Query: {
      hello: (_, { name }) => `Hello ${name || 'World'}`,
      secret: (_, { agent }) => `Hello agent ${agent}`,
   },
}

const permissions = {
   Query: {
      hello: () => true,
      secret: (_, { code }) => code === 'donttellanyone'
   }
}

const server = new GraphQLServer({
   typeDefs,
   resolvers: shield(resolvers, permissions, { debug: true })
})

server.start(() => console.log('Server is running on http://localhost:4000'))