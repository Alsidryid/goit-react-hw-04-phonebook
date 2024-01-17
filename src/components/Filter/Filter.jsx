import style from "./Filter.module.css"

export default function Filter({ onChange }) {
    
    return (
        <label className={style.label}>Find contacts by name
        <input className={style.input} onChange={onChange} name='filter' placeholder="search" />
    </label>
    )}