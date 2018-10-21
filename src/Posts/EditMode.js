import React, { Component } from 'react';
import {ApolloConsumer} from 'react-apollo';

export default class EditMode extends Component {
  render() {
    const {isEditMode} = this.props;
    return (
      <ApolloConsumer>
        {client => (
          <a
            onClick={() => {
              client.writeData({ data: { isEditMode: !isEditMode }});
            }}
          >
            ✏️ Toggle Edit Mode
          </a>
        )}
      </ApolloConsumer>
    )
  }
}
