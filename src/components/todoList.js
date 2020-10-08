import React from 'react';
import Todo from './todo'

const TodoList = ({ todos, setTodos, filteredTodos }) => {
    return (
        <div className="todo-container">
            <ul className="todo-list">
                {filteredTodos.map(todo => (
                    <Todo 
                        key={todo.id}
                        setTodos={setTodos}                                                
                        todos={todos}
                        todo={todo}
                        text={todo.text}
                    />
                ))}                
            </ul>
        </div>
    );
}

export default TodoList;