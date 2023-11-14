import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@chakra-ui/react";

import styles from './SignIn.module.css';

export default function SignIn() {
    const [password] = useState("");
    
    const handleSignIn = () => {
        console.log(password)
        if (password.length < 6 || password.length > 20) {
            console.log("Password should be 6 to 20 characters long.");
            return;
          }
    }

    return (
        <div className={styles['signin-container']}>
            <h1 className={styles['signin-logo']}>CoutureLab</h1>
            <h1>Welcome back!</h1>
            <div className={styles['signin-input-container']}>
                <Input className={styles['signin-input']} placeholder="Username" />
                <Input className={styles['signin-input']} placeholder="Password" />
            </div>
            <button className={styles['signin-button']} onClick={handleSignIn}>Sign In</button>
            <p className={styles['signin-signup-text']}>
                Don't have an account?  
                <Link className={styles['signin-signup-button']} to="/SignUp"> Sign Up</Link>
            </p>
        </div>
    )
}