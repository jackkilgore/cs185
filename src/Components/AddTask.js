import '../default.css'
import {useState} from 'react';

const AddTask = ({onAdd}) => {
    const [title, setTitle] = useState('')
    const [day, setDay] = useState('')
    const [textInfor, setTextInfor] = useState('')
    const [important, setImportant] = useState(false)

    const onSubmit = (e) => {
			e.preventDefault()
			onAdd({title, day, important, textInfor})
			setTitle('')
			setDay('')
			setTextInfor('')
			setImportant(false)
    }

	return(
	<div>
	<form className='add-form' onSubmit={onSubmit}>
		<div className='form-atom'>
			<label>Meeting</label>
			<input type='text'
			value={day} onChange={(e) => setTitle(e.target.value)}/>
		</div>
	</form>

	</div>
	)

}
export default AddTask;