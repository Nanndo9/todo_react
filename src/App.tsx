import React, { useState } from 'react';

//Components
import Header from './components/Header';
import Footer from './components/Footer';
import styles from "./App.module.css"
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';

//interface

import { ITask } from "./interfaces/Task"

function App() {

  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter(task => {
        return task.id !== id
      })
    )
  }
  const HideShowModal = (display: boolean) => {
    const modal = document.querySelector('#modal')
    if (display) {
      modal!.classList.remove('hide')
    } else {
      modal!.classList.add('hide')
    }
  }

  const editTask = (task: ITask): void => {
    HideShowModal(true)
    setTaskUpdate(task)
  }

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updateTask: ITask = { id, title, difficulty }
    const updatedItems = taskList.map((task) => {
      return task.id === updateTask.id ? updateTask : task


    })

    setTaskList(updatedItems)
    HideShowModal(false)
  }
  return (
    <div>
      <Modal children={<TaskForm btnText='Editar tarefa' taskList={taskList} task={taskToUpdate} handleUpdate={updateTask} />} />
      <Header />
      <div className={styles.main}>
        <div>
          <h2>Oque voce vai fazer?</h2>
          <TaskForm
            btnText='Criar Tarefa'
            taskList={taskList}
            setTaskList={setTaskList}

          />
        </div>
        <div>
          <h2>Suas tarefas</h2>
          <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App;
