import React, {Component} from 'react';

export default class ScrollButton extends React.Component {
	state = {
		visible: false,
	  }
	
	  scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" })
	  }

	  
	toggleVisibility = () => {
		var height = document.documentElement.offsetHeight;
		if (window.pageYOffset/height > 0.25) {
		  this.setState({
			visible: true,
		  })
		} else {
		  this.setState({
			visible: false,
		  })
		}
	  }

	componentDidMount() {
		document.addEventListener("scroll", this.toggleVisibility)
	}
	
	componentWillUnmount() {
		document.removeEventListener("scroll", this.toggleVisibility)
	}
	
	render () {
		if(this.state.visible === true)
		{

			return (<button onClick="topFunction()" id="to_top_btn"
			onClick={ () => { this.scrollToTop(); }}
			style={{display: 'block'}}>
		   Top</button>);
		} else {
			return <button onClick="topFunction()" id="to_top_btn"
			onClick={ () => { this.scrollToTop(); }}>
		   Top</button>;
		}
		
	 }
} 