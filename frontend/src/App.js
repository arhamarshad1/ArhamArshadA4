import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Parts from './components/Parts';
import SubmitPO from './components/SubmitPO';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React, { useEffect} from "react";
import ListPO from './components/ListPO';
import ListLines from './components/ListLines';

function App() {
  useEffect(() => {
    document.title = "Advanced Database Systems";  
  }, []);

  return (
    <Router>
      <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Parts" exact component={Parts} />
            <Route path="/SubmitPO" exact component={SubmitPO} />
            <Route path="/ListPO" exact component={ListPO} />
            <Route path="/ListLines" exact component={ListLines} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
