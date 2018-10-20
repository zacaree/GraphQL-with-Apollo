import React, { Component } from 'react';
import ApolloConsumer from 'react-apollo';

export default class EditMode extends Component {
  render() {
    return (
      <ApolloConsumer>
        <button>Toggle Edit Mode</button>
      </ApolloConsumer>
    )
  }
}
