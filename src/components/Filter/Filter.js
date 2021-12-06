import s from './Filter.module.css';
import { useState } from 'react';


export default function Filter() {
  const [filter, setFilter] = useState("");

    const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
    };
  
  return (
    <label>
      Find contacts by name:
      <input
        className={s.input}
        type="text"
        name="filter"
        value={filter}
        onChange={changeFilter}
      />
    </label>
  );
}