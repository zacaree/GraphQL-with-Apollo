import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo';
// gql takes the query strings and turns them into something we can actually use.
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

export default class Posts extends Component {
  render() {
    return (
      <Fragment>
        <h1>Posts</h1>
        <ol>
          {/* Here's the data from POSTS_QUERY in use via a render prop */}
          <Query query={POSTS_QUERY}>
            {({ loading, data, fetchMore }) => {
              if (loading) return 'Loading...';
              const { posts } = data;
              return (
                <Fragment>
                  {posts.map(post => (
                    <li key={post.id}>
                      <Link to={`/post/${post.id}`}>
                        <p>{post.title}</p>
                      </Link>
                    </li>
                  ))}
                  <button onClick={() => fetchMore({
                    variables: {
                      skip: posts.length
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        posts: [...prev.posts, ...fetchMoreResult.posts]
                      });
                    }
                  })}>Load More</button>
                </Fragment>
              )
            }}
          </Query>
        </ol>
      </Fragment>
    )
  }
}


// Writing a query
const POSTS_QUERY = gql`
  query allPosts($skip: Int) {
    posts(orderBy: createdAt_DESC, first: 5, skip: $skip) {
      id
      title
      body
    }
  }
`;