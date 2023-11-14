import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@chakra-ui/react";

import styles from './SignUp.module.css';

export default function SignUp() {
    const [password] = useState("");
    
    const handleSignUp = () => {
        console.log(password)
        if (password.length < 6 || password.length > 20) {
            console.log("Password should be 6 to 20 characters long.");
            return;
          }
    }

    return (
        <div className={styles['signup-container']}>
            <h1 className={styles['signup-logo']}>CoutureLab</h1>
            <h1>Let's Start</h1>
            <div className={styles['signup-input-container']}>
                <Input className={styles['signup-input']} placeholder="Username" />
                <Input className={styles['signup-input']} placeholder="Password" />
            </div>
            <button className={styles['signup-button']} onClick={handleSignUp}>Sign Up</button>
            <p className={styles['signup-signin-text']}>
                Already have an account?  
                <Link className={styles['signup-signin-button']} to="/SignIn"> Sign In</Link>
            </p>
        </div>
    )
}