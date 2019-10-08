import React from 'react';
// Router Dom
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Devextreme
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import config from 'devextreme/core/config';
// Components
import Header from './components/Header';
import Clients from './components/Clients';
import NewClient from './components/NewClient';
import EditClient from './components/EditClient';
import Chart from './components/Chart';
import ClientChart from './components/ClientChart';
import VisitRegister from './components/VisitRegister';

function App() {
  config({ forceIsoDateParsing: true, defaultCurrency:'COP' });
  
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div className="container mt-5">
          <Switch>
            <Route exact path="/" component={Clients} />
            <Route exact path="/client" component={NewClient} />
            <Route exact path="/client/:nit" component={EditClient} />           
            <Route exact path="/chart" component={Chart} />           
            <Route exact path="/chart/:nit" component={ClientChart} />
            <Route exact path="/visit/:nit" component={VisitRegister} />            
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
