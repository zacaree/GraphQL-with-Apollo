import React, { Component } from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UpdatePost from './UpdatePost';

export default class Post extends Component {
  render() {
    const { match } = this.props;
    return (
      <Query query={POST_QUERY} variables={{ id: match.params.id }}>
        {({ data, loading }) => {
          if (loading) return 'Loading...';
          const { post, isEditMode } = data;
          return (
            <div>
              {isEditMode ? (
                <section className="section__editPost">
                  <h4>Edit Post</h4>
                  <UpdatePost post={post} />
                </section>
              ) : (
                  <section>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                  </section>
              )}
            </div>
          )
        }}
      </Query>
    )
  }
}

// Grabbing a specific post based on the url params (params are equal to the post id).
// For a refresher on how this works, watch GraphQL with Apollo lesson 10 – Scott Tolinski
const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      body
    }
    isEditMode @client
  }
`;