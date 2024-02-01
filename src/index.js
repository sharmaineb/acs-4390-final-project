const { ApolloServer } = require('apollo-server');

const fs = require('fs');
const path = require('path');

// 1
let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
];

const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      feed: () => links,
    },
    Mutation: {
      // 5
      post: (parent, args) => {
        // 6
        const link = {
          id: `link-${links.length}`,
          description: args.description,
          url: args.url,
        };
  
        // 7
        links.push(link);
        return link;
      },
    },
    Link: {
      id: (parent) => parent.id,
      description: (parent) => parent.description,
      url: (parent) => parent.url,
    }
  };
  
// 4
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
});

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );
