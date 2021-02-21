import React from "react";
import "../default.css";
export default class ImageComp extends React.Component {

  constructor(props) {
    super(props);
  }
  state = { isOpen: false };

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i)
    var comp=this.props.src;
    var expand = comp.substr(comp.lastIndexOf('/') + 1);
    expand = 'assets/' + expand;
    return (
      <div>
        <div style={{height: this.props.height}}>
        <img
          className="small"
          src= {comp}
          onClick={this.handleShowDialog}
          alt="no image"
        />
        </div>
        {this.state.isOpen && !isMobile &&(
          <div id="Lightbox" className="modal" style={{display : 'block'}} onClick={this.handleShowDialog}>
			      <img id="sick" src={expand} className="zoom"   />
		      </div>
        )}
         
      </div>
    );
  }
}