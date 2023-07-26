import { useRoutes } from 'react-router-dom';
import React from 'react';
import './App.less';
// import Login from './pages/login';
// import SiderBar from './pages/layout';
// import PrivateRoute from './componets/PrivateRoute';
import { routes } from './routes';
import { RouterBeforeEach } from './componets/RouterBeforeEach';

function App(): JSX.Element {
    const elements = useRoutes(routes);
    return (
        <React.Suspense>
            <RouterBeforeEach>{elements}</RouterBeforeEach>
        </React.Suspense>
        // <>
        //     <Routes>
        //         <Route path="/login" element={<Login />} />
        //         <PrivateRoute path="/" element={<SiderBar />} />
        //     </Routes>
        // </>
    );
}

export default App;
