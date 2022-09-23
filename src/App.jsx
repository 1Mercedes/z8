import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

const initialTasks = [
  {
    text: 'Learn React',
    finished: false,
  },
  {
    text: 'Learn Redux',
    finished: false,
  },
  {
    text: 'Learn Gulp',
    finished: true,
  },
]

function App() {
  const [name, setName] = useState('')
  const [tasks, setTasks] = useState(initialTasks)
  const editName = (event) => setName(event.target.value)
  const addTask = (event) => {
    event.preventDefault()
    setTasks((prevState) => {
      const newTask = {
        text: name,
        finished: false,
      }
      return [...prevState, newTask]
    })
    setName('')
  }

  const deleteTask = (number) => {
    if (window.confirm('Do you want delete this task')) {
      setTasks((prevState) => prevState.filter((_, index) => index !== number))
    }
  }

  const changeTask = (number, completed) => {
    setTasks((prevState) =>
      prevState.map((task, index) => (number === index ? { text: task.text, finished: !completed } : task))
    )
  }
  return (
    <div className="App">
      <header className="header container">
        <img src={logo} alt="React Logo" className="header__logo" />
        <h1 className="header__title">Todo App</h1>
      </header>
      <div className="todo container">
        <form className="todo__form" onSubmit={addTask}>
          <input type="text" className="todo__input" value={name} onInput={editName} />
          <button className="todo__button">Add new task</button>
        </form>
        <div className="todo__list">
          {tasks.map((task, index) => (
            <div className="todo__task" key={task.text + index}>
              <span className="todo__num">{index + 1}.</span>
              <p className={`todo__text ${task.finished ? 'finished' : ''}`}>{task.text}</p>
              <input
                type="checkbox"
                className="todo__check"
                defaultChecked={task.finished}
                onChange={() => changeTask(index, task.finished)}
              />
              <button className="todo__delete" onClick={() => deleteTask(index)}>
                Delete task
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
