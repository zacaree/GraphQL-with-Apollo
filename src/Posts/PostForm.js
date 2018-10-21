import React, { Component } from 'react'
import PropTypes from 'prop-types';


export default class PostForm extends Component {
  state = {
    id: this.props.post.id || '',
    title: this.props.post.title || '',
    body: this.props.post.body || ''
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { onSubmit, onSuccess } = this.props;
    const { title, body } = this.state;

    return (
      // The submission returns a promise. Then we want to clear the form.
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          // These variables have a "$" in the gql mutation but we don't use the "$" here.
          variables: {
            id: this.state.id,
            title: this.state.title,
            body: this.state.body
          }
        })
          .then(() => {
            onSuccess();
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

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    post: PropTypes.object
  };

  // This says, hey if there's no post prop coming in to this component, then set post to an empty object.
  static defaultProps = {
    post: {},
    onSuccess: () => null
  };

}
