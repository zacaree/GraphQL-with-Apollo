import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PostForm from './PostForm'

export default class NewPost extends Component {


  render() {

    return (
      <Fragment>
        <h3>Create a Post</h3>
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

// After addPost we're defining our variables – $title (variable) will be a string and it's required (!)
const NEW_POST = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost(data: {
      status: PUBLISHED
      title: $title
      body: $body
    }) {
      title
      body
      id
    }
  }
`;
