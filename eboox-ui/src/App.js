import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import './App.css';
import Books from './components/Books';
import Edit from './components/Edit'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Books} />
          <Route path="/update/:bookId" component={({ match }) => <Edit bookId={match.params.bookId} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;