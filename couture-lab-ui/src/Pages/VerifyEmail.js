import styles from './VerifyEmail.module.css';

export default function VerifyEmail() {
    return (
        <div className={styles['verifyemail-container']}>
            <h1>Please verify your email</h1>
            <h1>You're almost there! We sent an email to you.</h1>
            <h1>Click on the link in the email to complete your signup. Don't see it? 
                You may need to check your spam folder.
            </h1>
            <h1>Still can't find it?</h1>
            {/*have to write further backend for this work*/}
            <button type="button">Resend Verification Email</button>
        </div>
    )
}