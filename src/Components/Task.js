import '../default.css'
import {useEffect, useState} from 'react';
import {is_before_cur_time, is_valid_zoom} from './ErrorHandling'



const Task = ({task, onDelete, onUpdate, global_modders}) => {

	var modder_mutex = global_modders[0]
	var incrModderMutex = global_modders[1]
	const TaskModify = ({task, onUpdate}) => {

		const [title, setTitle] = useState(task.title)
		var [date, setDate] = useState(task.day.split("T")[0])
		const [time, setTime] = useState(task.day.split("T")[1])
		const [textInfor, setTextInfor] = useState(task.textInfor)
		const [important, setImportant] = useState(task.important)
		const [id, setId] = useState(task.id)
		const [open, setOpen] = useState(isModify)

		const onSubmit = (e) => {
			e.preventDefault()
			var error = "";

			// BEGIN Error Checking
			// title
			if(title.length <= 0) {
				error += "TITLE: Title length must be non-empty.\n";
			}

			if(title.length >30) {
				error += "TITLE: Title length must be less than 30 characters\n";
			}

			// date
			if(is_before_cur_time(date,time)){
				error += "TIME: Meeting time must be after the current time\n";
			}

			if(!is_valid_zoom(textInfor)) {
				error += "LINK: Not a valid zoom link\n";
			} 

			if(error.length != 0) {
				alert(error);
				return;
			} 

			var day = date + "T" + time;
			onUpdate({id,title, day, important, textInfor})
			setTitle('')
			setDate('')
			setTime('')
			setTextInfor('')
			setImportant(false)
			setModify(false)
			setOpen(false)
			incrModderMutex(modder_mutex - 1)
	
    	}

		
		const onCancel = () => {
			setModify(false); 
			setOpen(false);
			incrModderMutex(modder_mutex - 1);
		}
	
		const is_important = () => {
			if(important === true) {
				return {border:'3px solid #405c3d'};
			} 
			return {};
		}

		useEffect( () => {
			setImportant(task.important)
			setOpen(true)
		  },[!open && isModify])
	
		return (
			<form onSubmit={onSubmit}>
			<div className='meeting_div' style={is_important()}>	
			<h3>
				<label>Title: </label>
				<input type='text'
					style={{width:"60%"}} value={title} onChange={(e) => setTitle(e.target.value)}/>
				<div className='msubmit_btn' onClick={(e) => onSubmit(e)}>
					<a>Submit</a>
				  </div>
			</h3>
				<label>Time: </label>
				
			<input type='date' style={{marginLeft:"6px"}}
				value={date} onChange={(e) => setDate(e.target.value) }/>
			<input type='time' step='60'
				value={time} onChange={(e) => setTime(e.target.value) }/>
			<div className="button" style={{float:"right"}} onClick={(e) => onCancel()}>
				<a>Cancel</a>
			</div><br></br><br></br>
				  
			Link: <input type='text' style={{width:"60%",marginLeft:"8px"}} value={textInfor} onChange={(e) => setTextInfor(e.target.value) }/>
			<label style={{float:'right'}}>Important</label>
			<input type='checkbox' style={{float:"right" }}
			value={true} checked={important} onChange={() => {setImportant(!important)}}/>
				
			</div>
			</form>
		)
	}

	const TaskRead = ({task, onDelete}) => {

		const is_important = () => {
			if(task.important === true) {
				return {border:'3px solid #405c3d'};
			} 
			return {};
		}
	
		return(
			<div className='meeting_div' style={is_important()}>
			<h3> {task.title} 
				<div className='mdelete_btn' onClick={() => onDelete(task.id)}>
				<a>Delete</a>
				  </div>
			</h3>
			<p className="meeting">Day: {task.day.split("T")[0]} Time: {task.day.split("T")[1]}</p>
			Link: <a href={task.textInfor}>{task.textInfor}n</a>
	
			</div>
		) 
	}

	const CheckModify = () => {
		var temp_mod = modder_mutex + 1;
		if(temp_mod >= 2) {
			setModify(false);
		} else {
			incrModderMutex(temp_mod);
			setModify(true);
		}

		console.log(modder_mutex)
	}

	const [isModify, setModify] = useState(false)

  	return(
		<div>
		{!isModify && <div onDoubleClick= {() => {CheckModify();}}><TaskRead task={task} onDelete={onDelete}/></div>}
		{isModify && <TaskModify task={task} onUpdate={onUpdate}/>}
		</div>
	)
}

export default Task;