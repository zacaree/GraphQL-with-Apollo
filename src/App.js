import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Post from './Posts/Post'
import Posts from './Posts/Posts'
import logo from './logo.svg';
import './App.css';

// This defines the endpoint to our GraphQL server. (It's the location of our API)
const client = new ApolloClient({
  uri: 'https://api-useast.graphcms.com/v1/cjnd6rhce5tvu01dgef5a6juy/master'
});



class App extends Component {
  render() {
    return (

      // Apollo Provider wraps our application
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />

              <Switch>
                <Route exact path="/" component={Posts} />
                <Route path="/post/:id" component={Post} />
              </Switch>

            </header>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
