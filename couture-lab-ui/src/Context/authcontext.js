import { createContext, useState, useEffect, useRef, useCallback } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
    let [user, setUser] = useState(() => 
        (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null));
    let [authTokens, setAuthTokens] = useState(() => 
        (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null));
    let [loading, setLoading] = useState(true);

    const hasPageBeenRendered = useRef(false);

    const navigate = useNavigate();

    let loginUser = async (e) => {
        e.preventDefault();

        // checks if username or target are empty on submit button click
        if (!e.target.username.value || !e.target.password.value) {
            toast.error("Invalid login. Please try again.");
            return;
        }

        const response = await fetch('http://127.0.0.1:8000/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value })
        });

        if (response.ok) {
            // Successful login
            let data = await response.json();
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            navigate('/Dashboard');
        } else {
            // Unsuccessful login
            toast.error("Invalid login. Please try again.");
        }
    }

    let registerUser = async (e) => {
        e.preventDefault();

        // checks if username length is correct
        if (e.target.username.value < 3 || e.target.username.value > 12) {
            toast.error("Username length should be more than 2 and less than 12. Please try again.");
            return;
        }

        // checks if password length is correct
        if (e.target.password.value < 8 || e.target.verifypassword.value < 8 || 
            e.target.username.value > 20 || e.target.password.value > 20 || e.target.verifypassword.value > 20) {
            toast.error("Password length should be more than 7 and less than 20. Please try again.");
            return;
        }

        // checks if passwords are the same
        if (e.target.password.value !== e.target.verifypassword.value) {
            toast.error("Passwords are not the same.");
            return;
        }

        const response = await fetch('http://127.0.0.1:8000/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value, 
                password2: e.target.verifypassword.value })
        });

        if (response.ok) {
            // Successful sign up
            navigate('/SignIn');
            toast.success('Successfully registered account!');
        } else {
            // Unsuccessful sign up
            toast.error("Invalid sign up. Please try again.");
        }
    }

    // automatically redirects to page on start
    let logoutUser = useCallback((e) => {
        localStorage.removeItem('authTokens');
        setAuthTokens(null);
        setUser(null);
        navigate('/SignIn');
    }, [navigate]);

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        registerUser:registerUser,
    }

    useEffect(() => {
        const updateToken = async () => {
            const response = await fetch('http://127.0.0.1:8000/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({refresh:authTokens?.refresh})
            })
    
            const data = await response.json();
            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authTokens',JSON.stringify(data));
            } else {
                logoutUser();
            }
    
            if (loading) {
                setLoading(false);
            }
        }

        if (loading && hasPageBeenRendered.current) {
            updateToken();
        }

        const REFRESH_INTERVAL = 1000 * 60 * 4; // 4 minutes
        let interval = setInterval(()=>{
            if (authTokens) {
                updateToken();
            }
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval);

    },[authTokens, loading, logoutUser])

    return(
        <div>
            <AuthContext.Provider value={contextData}>
                {children}
            </AuthContext.Provider>
            <Toaster />
        </div>
    )
}