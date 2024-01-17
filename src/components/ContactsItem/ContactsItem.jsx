import style from "./ContactsItem.module.css"

export default function ConstactsItem({ id, name, number, deleteContact }) {
    return (
        <li  className={style.item} >
            <p className={style.text}> name: {name}, number: {number}</p>
            <button className={style.btn} type="button" onClick={() => deleteContact(id)}>Delete</button>
        </li>
    )}