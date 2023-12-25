import {Navigate, useRoutes} from 'react-router-dom'
import NotFound from "./app/notFound/NotFound";
import UserList from "./app/users/UserList";

export default function AppRoutes() {
    return useRoutes([
        { path: '/', element: <Navigate to="/users" /> },
        { path: '/users', element: <UserList /> },
        { path: '*', element: <NotFound /> },
    ])
}
