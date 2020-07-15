import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { LandingPage, UploadPage } from '../pages';

const App = (props) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/upload" component={UploadPage} />
          <Route component={LandingPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
