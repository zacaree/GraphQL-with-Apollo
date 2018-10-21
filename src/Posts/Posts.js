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
        <ul>
          {/* Here's the data from POSTS_QUERY in use via a render prop */}
          <Query query={POSTS_QUERY}>
            {({ loading, data }) => {
              if (loading) return 'Loading...';
              const { posts } = data;
              return posts.map(post => (
                <li key={post.id}>
                  <Link to={`/post/${post.id}`}>
                    <p>{post.title}</p>
                  </Link>
                </li>
              ));
            }}
          </Query>
        </ul>
      </Fragment>
    )
  }
}


// Writing a query
const POSTS_QUERY = gql`
  query allPosts {
    posts(orderBy: createdAt_DESC, first: 3) {
      id
      title
      body
    }
  }
`;