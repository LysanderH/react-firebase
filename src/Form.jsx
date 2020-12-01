import React, { useState } from 'react'
import firebase from './utils/firebaseConfig'

export default function Form(props) {
    const [valInput, setValInput] = useState('');
    const [error, setError] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (valInput !== '') {
            setError('');
            firebase.database().ref('todos').push({ text: valInput, isCompleted: false })
        } else {
            setError('Le todo ne peux pas être vide');
        }
        e.target.content.value = ''
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <label className="error">{ error??'' }</label>
            <label htmlFor="content" className="form__label">Un nouveau todo</label>
            <input type="text" id="content" className="form__input" onChange={e=> setValInput(e.target.value)} placeholder="Contenu de votre todo"/>
            <button type="submit" className="btn">Ajouter</button>
        </form>
    )
}
