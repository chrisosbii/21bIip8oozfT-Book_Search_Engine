import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});
/*
function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}
*/

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
