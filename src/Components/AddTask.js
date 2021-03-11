import '../default.css'
import {is_before_cur_time, is_valid_zoom} from './ErrorHandling'
import {useState, useEffect} from 'react';

const AddTask = ({onAdd, create_meeting_state}) => {

    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
	const [time, setTime] = useState('')
    const [textInfor, setTextInfor] = useState('')
    const [important, setImportant] = useState(false)

	const is_create_meeting = create_meeting_state[0]
	const set_create_meeting = create_meeting_state[1]

	const onCancel = () => {
		set_create_meeting(false);
	}

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
			// Convert time
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
			onAdd({title, day, important, textInfor});
			
			setTitle('')
			setDate('')
			setTime('')
			setTextInfor('')
			setImportant(false)
			set_create_meeting(false)
    }

	const is_important = () => {
		if(important === true) {
			return {border:"3px solid #405c3d"};
		} 
		return {};
	}


	return(
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
export default AddTask;