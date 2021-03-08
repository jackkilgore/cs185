import '../default.css'
import {useState} from 'react';

const Task = ({task, onDelete, onUpdate}) => {

	const [isModify, setModify] = useState(false)

	const is_important = () => {
		if(task.important === true) {
			return {border:"3px solid #405c3d"};
		} 

		return {};
	}


  return(
		<div onDoubleClick= {() => {onUpdate(task); setModify(true)}}>
		<div className="meeting_div" style={is_important()}>
		{!isModify && <h3> {task.title} 
			<div className="mdelete_btn" onClick={() => onDelete(task.id)}>
            <a>Delete</a>
      </div>
		</h3>}
		{isModify && <h3> {task.title} 
			<div className="mdelete_btn" onClick={() => onDelete(task.id)}>
            <a>Delete</a>
      </div>
		</h3>}
		<p className="meeting">Time: {task.day}</p>
		Link: <a href={task.textInfor}>{task.textInfor}n</a>

		</div>
		</div>
	)
}

export default Task;