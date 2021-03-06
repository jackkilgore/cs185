import './default.css'

import React from 'react';
import {useEffect, useState} from 'react';


import TabList from './Components/TabList'
import BackToTop from './Components/BackToTop'
import {BodyTitle, Body} from './Body'


function App() {
	const [active, set_active] = useState(0)
	const tabs = [
		{id: 0, title: 'Home'}, {id: 1, title: 'Text'}, {id: 2, title: 'Image'},
		{id: 3, title: 'Video'}, {id: 4, title: 'Table'}, {id: 5, title: 'Email'},
		{id: 6, title: 'Meetings'}
	]

	const change_tab =(id) => {
		set_active(id)
	}
  
	return (
		<div className='App'>
			<BackToTop scrollStepInPx="60" delayInMs="10"/>

			<BodyTitle active_tab={active}/>

			<div className='tab-bar'>
				<TabList tabs={tabs} active_tab = {active} ctab={change_tab}/>
			</div>

			<Body active_tab={active}/>
		</div>
  );
}

export default App;
