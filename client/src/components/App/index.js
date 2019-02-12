import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect
} from 'react-router-dom'

import MapBox from '../Map'

class App extends Component {
 
  render() {
    return (
      <HashRouter>
        <Route>
          <Switch>
            <Route path="/" component={MapBox} />

            <Redirect from="/*" to="/" />
            <Route render={ () => <h1>404</h1>} />
          </Switch>
        </Route>
      </HashRouter>
    )
  }
}

export default App;
