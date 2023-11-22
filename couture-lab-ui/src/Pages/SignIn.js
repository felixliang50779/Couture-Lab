import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@chakra-ui/react';
import toast, { Toaster } from 'react-hot-toast';

import styles from './SignIn.module.css';

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSignIn = () => {
        if (username.length < 3 || password.length > 10) {
            toast.dismiss();
            toast.error("Username should be 3 to 10 characters long.");
            return;
        }
        if (password.length < 6 || password.length > 20) {
            toast.dismiss();
            toast.error("Password should be 6 to 20 characters long.");
            return;
        }
    }

    return (
        <div className={styles['signin-container']}>
            <Link className={styles['signin-logo']} to="/Home">CoutureLab</Link>
            <h1 className={styles['signin-header']}>Welcome back!</h1>
            <div className={styles['signin-input-container']}>
                <Input
                    className={styles['signin-input']}
                    variant="flushed"
                    focusBorderColor="black"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"/>
                <Input
                    className={styles['signin-input']}
                    variant="flushed"
                    focusBorderColor="black"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"/>
            </div>
            <button className={styles['signin-button']} onClick={handleSignIn}>Sign In</button>
            <p className={styles['signin-signup-text']}>
                Don't have an account?  
                <Link className={styles['signin-signup-button']} to="/SignUp"> Sign Up</Link>
            </p>
            <Toaster />
        </div>
    )
}