import '../default.css'

import React, {Component, useEffect} from 'react'

function MeetingsTitle() {
  	return (<div><h1 align = 'center' className = 'title'>Zoom Meeting Manager</h1></div>);
}

class MeetingsBody extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			loading: null,
			singledata: []
		};
	}

	getMeetings() {
		this.setState({ loading: true }, () => {
		fetch('http://localhost:5000/tasks')
			.then(resp => {
				if (!resp.ok) {
					throw new Error("HTTP error " + resp.status);
				}
				return resp.json();
			})	
			.then(data => {
				this.setState({tasks: data, loading: false});
			})
			.catch(console.log)
		});
	}

	createMeeting(meeting_data) {
		fetch('http://localhost:5000/tasks', {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json"
		  },
		  body: JSON.stringify(meeting_data)
		}).then(
		  this.setState({
			singledata: {
			  id: -1,
			  title: "",
			  day: "",
			  textInfor: "",
			  important: null,
			}
		  })
		);
		this.getMeetings();
	}

	modifyMeeting(meeting_data, id) {
		fetch('http://localhost:5000/tasks/' + id, {
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json"
		  },
		  body: JSON.stringify(meeting_data)
		}).then(
		  this.setState({
			singledata: {
			  id: -1,
			  title: "",
			  day: "",
			  textInfor: "",
			  important: null,
			}
		  })
		);
		this.getMeetings();
	}

	deleteMeeting(meeting_data, id) {
		fetch('http://localhost:5000/tasks/' + id, {
		  method: "DELETE",
		  headers: {
			"Content-Type": "application/json"
		  },
		  body: JSON.stringify(meeting_data)
		}).then(
		  this.setState({
			singledata: {
			  id: -1,
			  title: "",
			  day: "",
			  textInfor: "",
			  important: null,
			}
		  })
		);
		this.getMeetings();
	}

	componentDidMount() {
		this.getMeetings();
	};

	render() 
		// if(this.state.loading === false) {
		// 	console.log(this.state.tasks);
		// 	var meeting_data = {
		// 		id: 5,
		// 		title: "yeet",
		// 		day: "dsksfdsfsa",
		// 		textInfor: "sdifiaosf",
		// 		important: true
		// 	}
		// 	this.createMeeting(meeting_data);
		// } 
		
		return (
			<div id='Meeting Content'>      
			</div>
		);
	}
}

export {
  MeetingsTitle,
  MeetingsBody,
}