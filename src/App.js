import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'




function App() {
  const [tasks, setTasks] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)

  const baseUrl = "http://localhost:5000/tasks" 

  useEffect(() => {
    axios.get(baseUrl)
    .then(res => {
      setTasks(res.data)
    })
  }, [])


  const deleteTask = async (id) => {
    axios.delete(`${baseUrl}/${id}`)
    setTasks(tasks.filter(task => (task.id !== id)))
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map(task => task.id === id 
      ? {...task, reminder: !task.reminder} 
      : task))
  }

  const addTask = (task) => {
    axios.post(baseUrl, {...task})
    .then(res => {
      setTasks([res.data, ...tasks])
    })
  }

  

  return (
    <BrowserRouter>
      
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        <Routes>
          <Route path="/" element={
          <>
            {showAddTask ? <AddTask onAdd={addTask}/> : ""}
            { tasks.length > 0 ? <Tasks onToggle={toggleReminder} task={tasks} onDelete={deleteTask}/> 
            : "No Tasks to Show"}
          </>
          }/>
          <Route path="/about" element={<About/>}/>
        </Routes>
        <Footer/>
      </div>
      
    </BrowserRouter>
  )
}

export default App

