import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import {
  LandingPage, UploadPage, AnonymizePage, DisplayPage,
} from '../pages';

const App = (props) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/upload" component={UploadPage} />
          <Route path="/anonymize" component={AnonymizePage} />
          <Route path="/:id" component={DisplayPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
