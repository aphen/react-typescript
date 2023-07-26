// import React from 'react';
import type { ReactNode } from 'react';
// const Login = React.lazy(() => import('../pages/login'));
// const VideoList = React.lazy(() => import('../pages/video/videoList'));
import Login from '../pages/login';
import VideoList from '../pages/video/videoList';

interface Route {
    path: string;
    name: string;
    element: ReactNode;
    children?: Route[];
    auth?: boolean;
}
export const routes: Route[] = [
    {
        path: '/',
        name: 'login',
        element: <Login />,
        auth: true
    },
    {
        path: '/video',
        name: 'Video',
        element: <VideoList />
    }
];
