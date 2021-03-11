import '../default.css'
import TaskList from '../Components/TaskList'
import AddTask from '../Components/AddTask'

import React, {useState, useEffect} from 'react'

function MeetingsTitle() {
  return (<div><h1 align = 'center' className = 'title'>Zoom Meeting Manager</h1></div>);
}

const MeetingsBody = () => {
	const [tasks, setTasks] = useState([])
  const [is_create_meeting, set_create_meeting] = useState(false)
  
  useEffect( () => {
    const getTasks = async () => {
      const tasks_from_server = await fetchTasks()
      setTasks(tasks_from_server)
    }
    getTasks();
  },[])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch('http://localhost:5000/tasks' + id)
    const data = await res.json()
    return data
  }

	const deleteTask = async (id) => {
    const res = fetch('http://localhost:5000/tasks/'+id,
    {method: 'DELETE'})
    setTasks(tasks.filter((task) => task.id !== id))
	}

  const addTask = async (task) => {
    delete task["id"]
    const res = await fetch('http://localhost:5000/tasks/', {
      method: "POST",
      headers: {
      "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks,data])
    set_create_meeting(false)
  }

  const updateTask = async (upd_task) => {
    const res = await fetch('http://localhost:5000/tasks/'+upd_task.id, {
      method: "PUT",
      headers: {
      "Content-type": "application/json"
      },
      body: JSON.stringify(upd_task)
    })

    const data = await res.json()
    setTasks(tasks.map((task) =>
      task.id === upd_task.id ? upd_task : task
      )
    )
	}

  if(!is_create_meeting) {
    return (
      <div id='Meeting Content'>
      <div className= "content-line">
        <div className="button" style={{marginTop: "10px", border:"2px solid #405c3d"}} onClick={() => set_create_meeting(true)}>
          <a>Create Meeting</a>
      </div>
      </div>
      <div style={{overflow:"hidden"}}>
        <div style={{overflow: "hidden"}}>
        <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask}/>
        </div>
      </div>
      </div>
    )
  }
  return (
    <div id='Meeting Content'>
    <div className="content-line">
      <div className="button"  style={{marginTop: "10px", border:"2px solid #405c3d"}} onClick={() => set_create_meeting(false)}>
        <a>Full Schedule</a>
    </div>
    </div>
    <AddTask onAdd={addTask} task={null} create_meeting_state={[is_create_meeting, set_create_meeting]}/>
    </div>
  )
}

export {
  MeetingsTitle,
  MeetingsBody,
}