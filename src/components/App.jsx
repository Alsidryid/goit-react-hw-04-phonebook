import { Component } from "react";
import { nanoid } from "nanoid";
import ConstactsList from "./ContactsList/ContactsList";
import PhoneForm from "./PhoneForm/PhoneForm";
import Filter from "./Filter/Filter";
import style from "./App.module.css";


export default class App extends Component{
 state = {
   contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
   ],
   filter: ''
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'))
    if (contacts?.length) {
      this.setState({
      contacts,
    })} 
  }
  componentDidUpdate(PraveProps, prevState) {
    const { contacts } = this.state
    if (prevState.contacts.length !== contacts.length) {
        localStorage.setItem("my-contacts", JSON.stringify(this.state.contacts))
    }

}

  isDublicate({ name }) {
    const normalizetName = name.toLowerCase()
    const { contacts } = this.state
    const dublicateName = contacts.find(item => {
    const normalizetCurrentName = item.name.toLowerCase();
      return (normalizetCurrentName === normalizetName)
    })
    return Boolean( dublicateName )
  }

  changeFilter = ({target}) => {
    this.setState({
      filter: target.value
    })
  }

  getFilterContacts() {
    const { filter, contacts } = this.state
    if (!filter) {
      return contacts;
    } 
    return  contacts.filter(({name}) => {
      return(name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    })}

  deleteContact = (id) => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id)
      return { contacts: newContacts }
})
  }

  addContact = (formState) => {
    if (this.isDublicate(formState)) {
      return alert (`${formState.name} is already in contacts`)
    }
  
    this.setState(({contacts}) => {
      const newContact = {
        id: nanoid(),
        ...formState,
      }
      return {
          contacts:  [...contacts, newContact]
      } 
    })
  }

  render() {
    const  contacts  = this.getFilterContacts()
    const { addContact, deleteContact, changeFilter} = this;
    return (
      <div className={style.box}>
        <h1 className={style.title}>Phonebook</h1>
        <PhoneForm onSubmit={addContact} />
        <h2 className={style.title}>Contacts</h2>
        <Filter onChange={changeFilter}  />
        <ConstactsList items={contacts} deleteContact={ deleteContact} />
        </div>
        )
    }
}
