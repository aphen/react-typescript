//import React, { Props } from 'react';
//import AuthService from './Services/AuthService'
// import { Navigate, Route } from 'react-router-dom';

// // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// const PrivateRoute = ({ element: Component, ...rest }: any): JSX.Element => {
//     console.log({ ...rest });
//     // Add your own authentication on the below line.
//     const isLoggedIn = true; //localStorage.token ? true : false; //AuthService.isLoggedIn()
//     return (
//         <Route
//             {...rest}
//             render={(props: any) =>
//                 isLoggedIn ? (
//                     <Component {...props} />
//                 ) : (
//                     <Navigate to={{ pathname: '/login' }} />
//                 )
//             }
//         />
//     );
// };

// export default PrivateRoute;
