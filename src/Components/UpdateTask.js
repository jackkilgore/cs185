import '../default.css'
import {useState, useEffect} from 'react';

const UpdateTask = ({task, onUpdate}) => {
	if(task === null) {
		task = {title: '', day: '', textInfor: '', important: false, id: -1}
	}
	const [title, setTitle] = useState(task.title)
	const [day, setDay] = useState(task.day)
	const [textInfor, setTextInfor] = useState(task.textInfor)
	const [important, setImportant] = useState(task.important)
	const [id, setId] = useState(task.id)

	const onSubmit = (e) => {
		e.preventDefault()
		onUpdate({id,title, day, important, textInfor})
		setTitle('')
		setDay('')
		setTextInfor('')
		setImportant(false)
	}
	
	useEffect( () => { 
		setTitle(task.title)
		setDay(task.day)
		setTextInfor(task.textInfor)
		setImportant(task.important)
		setId(task.id)
		
	},[task.id !== id])

	return(
	
	<div>
	<form className='add-form' onSubmit={onSubmit}>
		<div className='form-atom'>
			<label>Title</label>
			<input type='text'
			value={title} onChange={(e) => setTitle(e.target.value)}/>
		</div>
		<div className='form-atom'>
			<label>Date</label>
			<input type='text'
			value={day} onChange={(e) => setDay(e.target.value) }/>
		</div>
		<div className='form-atom'>
			<label>Zoom Link</label>
			<input type='text'
			value={textInfor} onChange={(e) => setTextInfor(e.target.value)}/>
		</div>
		<div className='form-atom'>
			<label>Important</label>
			<input type='checkbox'
			value={important} onChange={(e) => setImportant(e.target.value)}/>
		</div>
		<input type='submit' value='Save' className='button'/>
	</form>

	</div>
	)

}
export default UpdateTask;