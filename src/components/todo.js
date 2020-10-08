import React from 'react';

const Todo = ({text, todo, setTodos, todos}) => {
    const deleteHandlerTodo = () => {
        setTodos(todos.filter((item) => item.id !== todo.id))
    }
    const completeHandlerTodo = () => {
        setTodos(todos.map((item) => {
          if(item.id === todo.id) {
              return {
                  ...item, completed: !item.completed
              }
          }  
          return item
        }))
    }

    return (
        <div className="todo">
            <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>{text}</li>
            <button onClick={completeHandlerTodo} className="complete-btn">
                <i className="fas fa-check"></i>
            </button>
            <button onClick={deleteHandlerTodo} className="trash-btn">
                <i className="fas fa-trash"></i>
            </button>
        </div>
    );
}

export default Todo;