import React, { Component } from 'react'

export default class PostForm extends Component {
  state = {
    title: '',
    body: ''
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { onSubmit } = this.props;
    const { title, body } = this.state;

    return (
      // The submission returns a promise. Then we want to clear the form.
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          // These variables have a "$" below but we don't want that here.
          variables: {
            title: this.state.title,
            body: this.state.body
          }
        })
          .then(() => {
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
    )
  }
}
