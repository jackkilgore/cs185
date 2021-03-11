import '../default.css'
import React from 'react';
import Task from './Task';
import {useEffect, useState} from 'react';

const TaskList = ({tasks, onDelete, onUpdate}) => {

	const [modder_mutex, incrModderMutex] = useState(0)

	return(
	<div>
		{tasks.length===0 && <p>No scheduled meetings.</p>}
		{
			
			tasks.map((task) => (<Task global_modders={[modder_mutex, incrModderMutex]} task={task} onDelete={onDelete} onUpdate={onUpdate}/>))
		}
	</div>
	)

}
export default TaskList;