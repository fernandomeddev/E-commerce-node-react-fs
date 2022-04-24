/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Router, Switch, Route, Redirect} from 'react-router'
import { createBrowserHistory } from "history";

import LoginPage from "../pages/LoginPage/index";
import Home from '../components/home/Home'
import User from '../components/user/UserCrud'

const history = createBrowserHistory()
export default props =>


    <Router history={history}>
        <Switch>
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/' component={Home} />
            <Route path='/users' component={User} />
            <Redirect from='*' to='/' />
        </Switch>
    </Router>
    