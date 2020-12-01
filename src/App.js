import React, { useState, useEffect } from 'react';
import Form from './Form';
import Todo from './Todo';
import firebase from './utils/firebaseConfig';

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const db = firebase.database().ref('todos');
    db.on("value", snap => {
      const dbData = snap.val();
      const temporaryArray = [];
      for (let id in dbData) {
        temporaryArray.push({ id: id, ...dbData[id] });
      }
      setTodos(temporaryArray)
    })
  }, [])

  const deleteTodo = (id) => {
    const db = firebase.database().ref('todos').child(id);
    db.remove();
  }

  const setCompleted = (index, id, isCompleted, text) => {
    const db = firebase.database().ref('todos').child(id);
    isCompleted = !isCompleted;
    db.set({
      isCompleted: isCompleted,
      text: text
    });
  }

  return (
    <React.Fragment>
      <Form setTodos={setTodos} todos={todos} />
      <ul className="todo__list">
        {
          todos ? todos.map((todo, index) =>
            < Todo
              key={index}
              text={todo.text}
              isCompleted={todo.isCompleted}
              index={todo.index}
              id={todo.id}
              setCompleted={setCompleted}
              deleteTodo={deleteTodo}
            />
          ) : "Pas de todos pour l'instant"
        }
      </ul>
    </React.Fragment>
  );
}