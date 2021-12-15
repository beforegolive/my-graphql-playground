import pkg from 'graphql'
import fetch from 'node-fetch'

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } = pkg

const BASE_URL = 'http://localhost:3000'
function fetchResponseByURL(relativeURL) {
  return fetch(`${BASE_URL}${relativeURL}`).then((res) => res.json())
}

function fetchPeople(params) {
  return fetchResponseByURL('/people').then((json) => json)
}

function fetchPersonByURL(relativeURL) {
  return fetchResponseByURL(relativeURL).then((json) => json)
}

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'Somebody that you used to know',
  fields: () => ({
    firstName: {
      type: GraphQLString,
      resolve: (person) => person.first_name,
    },
    lastName: {
      type: GraphQLString,
      resolve: (person) => person.last_name,
    },
    email: { type: GraphQLString },
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    friends: {
      type: new GraphQLList(PersonType),
      resolve: (person) => person.friends.map((pid) => fetchPersonByURL(`/people/${pid}`)),
    },
  }),
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of All... queries.',
  fields: () => ({
    allPeople: {
      type: new GraphQLList(PersonType),
      resolve: fetchPeople,
    },
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => fetchPersonByURL(`/people/${args.id}/`),
    },
  }),
})

const graphQlSchemaObj = new GraphQLSchema({
  query: QueryType,
})
export default graphQlSchemaObj

export { graphQlSchemaObj }

// export default {}
