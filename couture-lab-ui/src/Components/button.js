import { useNavigate } from 'react-router-dom';
import styles from './button.module.css';

export default function Button(props) {
    let navigate = useNavigate();
    const handleClick = () => {
        navigate('../Dashboard')
    }

    return (
        <button onClick={handleClick} className={styles.button}>{props.text}</button>
    )
}