import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import AddBook from './components/AddBook';
import BookList from './components/BookList';

const client = new ApolloClient({
  uri: 'http://localhost:443/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Reading list</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
