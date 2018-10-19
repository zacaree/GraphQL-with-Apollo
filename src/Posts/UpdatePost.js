import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PostForm from './PostForm';

export default class UpdatePost extends Component {
  render() {
    const { post } = this.props;
    return (
      <div>
        <Mutation mutation={UPDATE_POST}>
          {/* The function "updatePost" is being passed into this function as an argument so that it can be used in the form. */}
          {updatePost => <PostForm post={post} onSubmit={updatePost} />}
        </Mutation>
      </div>
    )
  }
}

// After "mutation updatePost" we're defining our variables – ($title) is a variable and it expects a (String) and it is required (!)
const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $title: String!, $body: String!) {
    updatePost(
      where: {
        id: $id
      }
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

