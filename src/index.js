import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import schema from './schema.js'
const app = express()
app.use(
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

app.listen(5000, () => {
  console.log('=== http://localhost:5000')
})
