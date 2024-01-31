import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from './authcontext';

export default function PrivateRoute({children}) {
    let { currentUser } = useContext(AuthContext);

    return (
        !currentUser ? <Navigate to='/signin'/> : children
    );
}