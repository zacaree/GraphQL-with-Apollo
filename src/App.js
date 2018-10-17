import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
// gql takes the query strings and turns them into something we can actually use.
import gql from 'graphql-tag';
import logo from './logo.svg';
import './App.css';

// This defines the endpoint to our GraphQL server. (It's the location of our API)
const client = new ApolloClient({
  uri: 'https://api-useast.graphcms.com/v1/cjnd6rhce5tvu01dgef5a6juy/master'
});

// Writing a query
const POSTS_QUERY = gql`
  {
    posts {
      id
      createdAt
      title
      body
    }
  }
`;

class App extends Component {
  render() {
    return (

      // Apollo Provider wraps our application
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />

            {/* Here's the data from POSTS_QUERY in use via a render prop */}
            <Query query={POSTS_QUERY}>
              {({loading, data}) => {
                if (loading) return 'Loading...';
                const { posts } = data;
                return posts.map(post => (
                  <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                  </div>
                ))
              }}
            </Query>

          </header>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
