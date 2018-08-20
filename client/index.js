import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route  } from 'react-router-dom';

import HomePage from './components/home/HomePage';
import Profile from './components/profile/Profile';
import App from './components/App';
import dashboardStyle from '../template/styles/dashboard.css';
import generalStyle from '../template/styles/general.css';

render((
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/all-events" component={App}/>
            <Route path="/profile" component={Profile}/>
        </Switch>
    </BrowserRouter>
    ),
    document.getElementById('root')
);
