import { lazy } from 'react';
import type { ReactNode } from 'react';
// eslint-disable-next-line react-refresh/only-export-components
const Login = lazy(() => import('../pages/login'));
// const VideoList = React.lazy(() => import('../pages/video/videoList'));
// import Login from '../pages/login';
import Sidebar from '../pages/layout';
import Blog from '../pages/blog';
import Video from '../pages/video/videoList';

interface Route {
    path: string;
    name: string;
    element: ReactNode;
    children?: Route[];
    auth?: boolean;
}
export const routes: Route[] = [
    {
        path: '/login',
        name: 'login',
        element: <Login />
    },
    {
        path: '/',
        name: 'layout',
        element: <Sidebar />,
        children: [
            {
                path: '/video',
                name: 'Video',
                element: <Video />,
                auth: true
            },
            {
                path: '/blog',
                name: 'Blog',
                element: <Blog />
            },
            {
                path: '/nav3',
                name: 'Blog',
                element: ''
            }
        ]
    }
];
