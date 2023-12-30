import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import styles from './SignIn.module.css';

const sendToken = (token) => {
    fetch('http://localhost:8000/dj-rest-auth/google/',
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ access_token: token })
        }).then(response => {
            if (response.ok) {
                console.log('POST request successful');
                return response.json(); // returns Promise
            } else {
                console.log('POST request failed');
            }
        }).then(data => {
            console.log(data); 
            // redirects:
            //window.location.href = '/Dashboard';
        }).catch(error => {
            console.error('Fetch error:', error);
        });
};

const onSuccess = (response) => {
    console.log("Success");
    sendToken(response.credential);
};

const onFailure = () => {
    console.log("Authentication failed");
}

export default function SignIn() {
    const google = window.google;
    
    useEffect(() => {
        function handleCallbackResponse(response) {
            // encoded jwt token
            console.log(response.credential);
            if (response) {
                onSuccess(response);
            }
            else {
                onFailure();
            }
        }

        google.accounts.id.initialize({
            client_id: "515162456588-rk2olvkgrbo6r48t4jr6cng3sgs5uahu.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });
        // middle google login button
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: 'outline', size: 'large' }
        );
        // side google login button
        google.accounts.id.prompt();
    }, [google.accounts.id]);

    return (
        <div className={styles['signin-container']}>
            <Link className={styles['signin-logo']} to="/Home">CoutureLab</Link>
            <h1 className={styles['signin-header']}>Welcome back!</h1>
            <div id="signInDiv"></div>
        </div>
    )
}