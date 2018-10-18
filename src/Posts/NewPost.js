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
    const {title, body} = this.state;
    return (
      <Fragment>
        <h3>Create a Post</h3>
        <Mutation
          mutation={NEW_POST}
          variables={{
            title,
            body
            // 14 minutes into lesson 12
          }}
        >
          <form>
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
        </Mutation>
        {/* <PostForm /> */}
      </Fragment>
    )
  }
}

// After addPost we're defining our variables – $title (variable) will be a string and it's required (!)
const NEW_POST = gql`
  mutation addPost($title: String!, $body: String!) {
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
