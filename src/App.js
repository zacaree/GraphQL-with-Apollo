import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Post from './Posts/Post'
import Posts from './Posts/Posts'
import NewPost from './Posts/NewPost'
import logo from './logo.svg';
import './App.css';


const defaultState = {
  isEditMode: false
};


// This defines the endpoint to our GraphQL server. (It's the location of our API)
const client = new ApolloClient({
  uri: 'https://api-useast.graphcms.com/v1/cjnd6rhce5tvu01dgef5a6juy/master',
  clientState: {
    defaults: defaultState,
    resolvers: {}
  }
});


class App extends Component {
  render() {
    return (

      // Apollo Provider wraps our application
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <header className="App-header">
              <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
              <Link to="/post/new" className="newPostLink">New Post</Link>
            </header>
            <main>
              <Switch>
                <Route exact path="/" component={Posts} />
                <Route path="/post/new" component={NewPost} />
                <Route path="/post/:id" component={Post} />
              </Switch>
            </main>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
