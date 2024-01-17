import { Component } from "react";
import { nanoid } from "nanoid";
import style from './PhoneForm.module.css'

const INITIAL_STATE = {
        name: '',
        number:''
}

export default class PhoneForm extends Component{
  nameId = nanoid();
  phoneId = nanoid();

  state = { ...INITIAL_STATE }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({...this.state})
    this.setState({...INITIAL_STATE})
  }

  handleChange = ({target}) => {
    const { name, value } = target
    this.setState({
      [name]:value
    })
  }
  
  render() {
      
    const { nameId, phoneId, handleSubmit, handleChange } = this;
    const{name, number} = this.state
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
}