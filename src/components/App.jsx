import {  useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import ConstactsList from "./ContactsList/ContactsList";
import PhoneForm from "./PhoneForm/PhoneForm";
import Filter from "./Filter/Filter";
import style from "./App.module.css";

const INITIAL_CONTACTS = [ { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},  
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },]

const App = () => {

  const [contacts, setContacts] = useState(() => {
    const data = JSON.parse(localStorage.getItem("my-contacts"))
    return data || INITIAL_CONTACTS
  })

  const [filter, setFilter] = useState('')

  const firstRender = useRef(true)
  
  useEffect(() => {
    if (!firstRender.current) {
        localStorage.setItem("my-contacts", JSON.stringify(contacts))
    }
  }, [contacts])

useEffect(() => {
   firstRender.current = false
  }, [])

  const isDublicate = ({ name }) => {
    const normalizetName = name.toLowerCase()
    const dublicateName = contacts.find(item => {
      const normalizetCurrentName = item.name.toLowerCase();
      return (normalizetCurrentName === normalizetName)
    })
    return Boolean(dublicateName)
  }
  
  const addContact = (formState) => {
    if (isDublicate(formState)) {
      return alert(`${formState.name} is already in contacts`)
    }
  
    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        ...formState,
      }
      return [...prevContacts, newContact]
    })
  }

   const deleteContact = (id) => {
    setContacts(prevBooks =>  prevBooks.filter(item => item.id !== id))
  }

    const  changeFilter = ({target}) => setFilter( target.value)
  
  
   const  getFilterContacts = () => {
    if (!filter) {
      return contacts;
    } 
    return  contacts.filter(({name}) => {
      return(name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    })}

  
     const  items  = getFilterContacts()
    return (
      <div className={style.box}>
        <h1 className={style.title}>Phonebook</h1>
        <PhoneForm onSubmit={addContact} />
        <h2 className={style.title}>Contacts</h2>
        <Filter onChange={changeFilter}  />
        <ConstactsList items={items} deleteContact={ deleteContact} />
        </div>
        )
}

export default App