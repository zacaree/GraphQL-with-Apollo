import React, { Component } from 'react'
import { Query } from 'react-apollo';
// gql takes the query strings and turns them into something we can actually use.
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

export default class Posts extends Component {
  render() {
    return (
      <ul>
        {/* Here's the data from POSTS_QUERY in use via a render prop */}
        <Query query={POSTS_QUERY}>
          {({ loading, data }) => {
            if (loading) return 'Loading...';
            const { posts } = data;
            return posts.map(post => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>
                  <h3>{post.title}</h3>
                </Link>
              </li>
            ));
          }}
        </Query>
      </ul>
    )
  }
}


// Writing a query
const POSTS_QUERY = gql`
  query allPosts {
    posts {
      id
      title
      body
    }
  }
`;