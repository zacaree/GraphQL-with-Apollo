import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PostForm from './PostForm'

export default class NewPost extends Component {
  state = {
    title: '',
    body: ''
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { title, body } = this.state;
    return (
      <Fragment>
        <h3>Create a Post</h3>
        <Mutation
          mutation={NEW_POST}
          // These variables have a "$" below but we don't want that here.
          variables={{
            title: this.state.title,
            body: this.state.body
          }}
        >
          {/* The function "createPost" is being passed into this function so that it can be used in the form. */}
          {createPost => (
            // The submission returns a promise. Then we want to clear the form.
            <form onSubmit={(e) => {
              e.preventDefault();
              createPost().then(() => {
                this.setState({
                  title: '',
                  body: ''
                });
              }).catch(e => console.log(e));
            }}>
              <input
                type="text"
                name="title"
                onChange={this.handleInput}
                value={title}
                placeholder="Post title"
              />
              <textarea
                type="text"
                name="body"
                onChange={this.handleInput}
                value={body}
                placeholder="Post body"
              />
              <button>Submit</button>
            </form>
          )}
        </Mutation>
        {/* <PostForm /> */}
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
