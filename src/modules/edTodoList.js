import React, { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa';
import reactLogo from '../assets/images/logo.svg';
import Aside from '../components/Aside'
import Form from '../components/form'
import TodoList from '../components/todoList'
import '../assets/styles/css/index.scss';

const EdTodoList = () => {
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('All')
  const [filteredTodos, setFilteredTodos] = useState([])
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    getLocalTodos();
  }, [])

  useEffect(() => {     
    filterHandler(status)
    saveLocalTodos(todos)
  }, [todos, status])

  const filterHandler = (status) => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos)
        break;
    }
  }

  const saveLocalTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))    
  }

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      const todoLocal = JSON.parse(localStorage.getItem('todos'))
      setTodos(todoLocal)
    }
  }

  return (
    <Aside toggled={toggled} setToggled={setToggled} >
      <main className="index">
        <div className="btn-toggle" onClick={() => setToggled(true)}>
          <FaBars />
        </div>
        <header>
          <h1>
            <img width={80} src={reactLogo} alt="react logo" /> {`Ed's Todo List`}
          </h1>        
        </header>
        <div className="App">
          <Form 
            inputText={inputText}
            setInputText={setInputText}
            todos={todos}
            setTodos={setTodos}     
            setStatus={setStatus} 
          />
          <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} />
	      </div>     
        <footer>
          footer
        </footer>
      </main>     
    </Aside >
  )
}

export default EdTodoList;
