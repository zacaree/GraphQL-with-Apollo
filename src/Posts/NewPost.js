import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PostForm from './PostForm'

export default class NewPost extends Component {
  render() {
    return (
      <Fragment>
        <h2>Create a new post</h2>
        <Mutation mutation={NEW_POST}>
          {/* The function "createPost" is being passed into this function so that it can be used in the form. */}
          {createPost => (
            <PostForm onSubmit={createPost} />
          )}
        </Mutation>
      </Fragment>
    )
  }
}

// After "mutation createPost" we're defining our variables – ($title) is a variable and it expects a (String) and it is required (!)
const NEW_POST = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost(
      data: {
        status: PUBLISHED
        title: $title
        body: $body
      }
    ) {
      title
      body
      id
    }
  }
`;
