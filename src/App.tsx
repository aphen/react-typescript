import React from 'react';

import { Route, Switch } from 'react-router-dom';
import './App.less';
import Login from './pages/login/login';
import SiderBar from './pages/layout';
import PrivateRoute from './componets/PrivateRoute';

function App() {
    return (
        <>
            <Switch>
                <Route exact path="/login" component={Login} />
                <PrivateRoute path="/" component={SiderBar} />
            </Switch>
        </>
    );
}

export default App;
