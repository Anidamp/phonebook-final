import { useState } from 'react';
import s from './ContactForm.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useAddContactMutation} from '../../serviceApi/Api';

export default function ContactForm () {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [addNewContact] = useAddContactMutation();

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case'name' :
       setName(value);
       break;
      case 'number':
        setNumber(value);
        break;
      default: 
      return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const contact = {
      name,
      number,
      id: uuidv4(),
    };
    addNewContact(contact);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('')
  };

  return (
        <form className={s.form} onSubmit={handleSubmit}>
          <label>
            Name
            <input
              className={s.input}
              onChange={handleChange}
              type="text"
              name="name"
              value={name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
            />
          </label>
          <label>
            Number
            <input
              className={s.input}
              onChange={handleChange}
              type="tel"
              name="number"
              value={number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
            />
          </label>
          <button type="submit" className={s.button}>
            Add contact
          </button>
        </form>
    );
}