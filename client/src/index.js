
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from "redux";
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import history from "./history";
import requireAuth from "./utils/requireAuth";
import checkIfAuth from "./utils/checkIfAuth";
import setAuthorizationToken from "./utils/setAuthorizationToken";
import {SIGN_IN} from "./actions/types";
import jwtDecode from "jwt-decode";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
)

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch({type: SIGN_IN, user: jwtDecode(localStorage.jwtToken)});
}

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
            <Route path="/admin" component={requireAuth(AdminLayout)} />
            <Route path="/auth" component={checkIfAuth(AuthLayout)} />
            <Redirect from="/" to="/auth/login" />
        </Switch>
      </Router>
    </Provider>,
  document.getElementById("root")
);
