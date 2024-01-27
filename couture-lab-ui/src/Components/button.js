import { useNavigate } from 'react-router-dom';
import styles from './button.module.css';

export default function Button(props) {
    let navigate = useNavigate();
    const handleClick = () => {
        navigate('../dashboard')
    }

    return (
        <button onClick={handleClick} className={styles.button}>{props.text}</button>
    )
}