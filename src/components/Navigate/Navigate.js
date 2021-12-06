import s from './Navigate.module.css';
import { Link } from 'react-router-dom';
import { useSelector,  useDispatch } from 'react-redux';
import {useLogoutMutation} from '../../serviceApi/Api'
import selectors from '../../redux/selectors';
import {setLogout} from '../../redux/slice'
import {useNavigate} from 'react-router-dom'

export default function Navigate() {
const isLogged =  useSelector(selectors.isLogin)
const name = useSelector(selectors.getName)
const [logOut] = useLogoutMutation();
const dispatch = useDispatch();
const navigate = useNavigate()
const handleLogout=()=> {
  logOut()
  dispatch(setLogout());
navigate('/')
}
  return (

    <div className={s.navBar}>
      <Link  className={s.link} to='/'> <h1 className={s.navTitle}>Phonebook</h1></Link>
     {isLogged && (
       <div className={s.userMenu}>
       <p>
        <span className={s.username}>Hello {name}</span>
       </p>
       <button type="button" onClick ={handleLogout} className={s.logOutButton}>
         Logout
       </button>
     </div>
     )}
      
    </div>
  );
}