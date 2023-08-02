import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import type { ReactNode } from 'react';
import { routes } from '../routes';

interface Route {
    path: string;
    name: string;
    element: ReactNode;
    children?: Route[];
    auth?: boolean;
}

type Router = any;

const getCurrentRouterMap = (routers: Router[], path: string): Route => {
    for (const router of routers) {
        if (router.path == path) return router;
        if (router.children) {
            const childRouter = getCurrentRouterMap(router.children, path);
            if (childRouter) return childRouter;
        }
    }
    return routes[routes.length - 1];
};

export const RouterBeforeEach = ({ children }: any) => {
    const location = useLocation();
    const navigator = useNavigate();

    useEffect(() => {
        const isLogin = localStorage.getItem('token');
        const router = getCurrentRouterMap(routes, location.pathname);
        if (!isLogin && router.auth) {
            navigator('/login');
        }
    }, [location.pathname, navigator]);
    return children;
};
