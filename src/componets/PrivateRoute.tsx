//import React, { Props } from 'react';
//import AuthService from './Services/AuthService'
import { Redirect, Route } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PrivateRoute = ({ component: Component, ...rest }: any): JSX.Element => {
    console.log({ ...rest });
    // Add your own authentication on the below line.
    const isLoggedIn = true; //localStorage.token ? true : false; //AuthService.isLoggedIn()
    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    );
};

export default PrivateRoute;
