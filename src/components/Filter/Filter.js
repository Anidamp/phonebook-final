import s from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/slice';


export default function Filter() {
  const value = useSelector(state => state.filter);
  const dispatch = useDispatch();
  
  return (
    <label>
      Find contacts by name:
      <input
        className={s.input}
        type="text"
        name="filter"
        value={value}
        onChange={e => dispatch(setFilter(e.target.value))}
      />
    </label>
  );
}