import { useState, useMemo } from "react";
import { nanoid } from "nanoid";
import style from './PhoneForm.module.css'

const INITIAL_STATE = {
        name: '',
        number:''
}

const PhoneForm = ({ onSubmit }) => {
  const [state, setState] = useState({...INITIAL_STATE})
  const nameId = useMemo(() => nanoid(), []);
  const phoneId = useMemo(() => nanoid(), []);
  
    const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({...state})
    setState({...INITIAL_STATE})
  }

  const handleChange = ({target}) => {
    const { name, value } = target
    setState({...state,[name]:value })

  }

   const{name, number} = state
    return (
          <form className={style.form} onSubmit = {handleSubmit}>
              <div>
                <label className={style.label}  htmlFor={nameId}>Name</label>
                <input
                  className={style.input}
                  value={name}
                  name='name'
                  type="text"
                  onChange={handleChange} id={nameId}
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan" required/>
              </div>
              <div>
                <label className={style.label} htmlFor={phoneId}>Number</label>
                <input
                  className={style.input}
                  value={number}
                  name='number'
                  type="tel"
                  onChange={handleChange}
                  id={phoneId}
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"  required/>
              </div>
              <button className={style.btn} type ="submit">Add contact</button>
        </form>
        )
}

export default PhoneForm