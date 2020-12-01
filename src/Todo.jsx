import React from 'react'

export default function Todo(props) {
    return (
        <li className={props.isCompleted ? "completed" : "remaining"}>
            {props.text}
            <button onClick={()=>props.deleteTodo(props.id)}>Supprimer</button>
            <input type="checkbox"
                onChange={() => props.setCompleted(props.index, props.id, props.isCompleted, props.text)}
                checked={props.isCompleted ? "checked" : ""}
            />
        </li>
    )
}
