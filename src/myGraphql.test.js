import util from 'util'
import myGraphql from './myGraphql'
// import { graphql } from 'graphql'

it('test my graphql ', () => {
  const json = `query BlogPostBySlug($slug: String!) {
		site {
			siteMetadata {
				title
			}
		}
  }`
  const result = myGraphql.parse(json)

  console.log(util.inspect(result, { color: true }))
  // console.log(result)
  expect(myGraphql.parse(json)).not.toBe(null)
  // console.log(graphql)
  // expect(graphql(json)).not.toBe(null)
})
