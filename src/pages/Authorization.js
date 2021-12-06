import { Link } from 'react-router-dom';
import s from './Authorization.module.css';



export default function Authorization() {

    return (
        <>    
        <h2>Greetings!</h2>    
        <nav className={s.nav}>
        <Link className={s.link} to="/login">Login</Link>
        <Link className={s.link} to="/register">Register</Link>
            </nav>
        </>

    )
}