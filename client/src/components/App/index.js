import React, { Component } from 'react';
import { BrowserRouter,Route, Switch, Redirect
} from 'react-router-dom'

import MapBox from '../Map'

class App extends Component {
 
  render() {
    return (
      <BrowserRouter>
        <Route>
          <Switch>
            <Route path="/map" component={MapBox} />

            <Redirect exact from="/" to="/map" />
            <Route render={ () => <h1>404</h1>} />
          </Switch>
        </Route>
      </BrowserRouter>
    )
  }
}

export default App;
