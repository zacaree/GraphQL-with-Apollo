import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';

export default class EditMode extends Component {
  render() {
    const { isEditMode } = this.props;
    return (
      <ApolloConsumer>
        {client => (
          // eslint-disable-next-line
          <a
            onClick={() => {
              client.writeData({ data: { isEditMode: !isEditMode } });
            }}
          >
            <span role="img" aria-label="pencil icon">✏️</span>
            Toggle Edit Mode
          </a>
        )}
      </ApolloConsumer>
    )
  }
}
