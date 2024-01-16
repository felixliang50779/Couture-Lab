import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

import AuthContext from '../Context/authcontext';

export default function ProtectedRoute({children, ...rest}) {
    let { user } = useContext(AuthContext);

    return (
        !user ? <Navigate to='/SignIn'/> : children
    );
}