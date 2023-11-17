import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";

import styles from './SignUp.module.css';

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSignUp = () => {
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
        <div className={styles['signup-container']}>
            <h1 className={styles['signup-logo']}>CoutureLab</h1>
            <h1>Let's Start</h1>
            <div className={styles['signup-input-container']}>
                <Input className={styles['signup-input']} placeholder="Username" 
                onChange={(e) => setUsername(e.target.value)} />
                <Input className={styles['signup-input']} placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className={styles['signup-button']} onClick={handleSignUp}>Create An Account</button>
            <p className={styles['signup-signin-text']}>
                Already have an account?  
                <Link className={styles['signup-signin-button']} to="/SignIn"> Sign In</Link>
            </p>
            <Toaster />
        </div>
    )
}