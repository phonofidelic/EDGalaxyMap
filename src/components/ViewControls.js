import React, { Component } from 'react';

class ViewControls extends Component {
	render() {
		return (
			<div className="view-controls">
				<button className="btn-toggle-cursor " onClick={() => {this.props.toggleCursor()}}>Toggle Cursor</button>
				<button className="btn-toggle-view-mode view-control" onClick={() => {this.props.toggleViewMode()}}>Toggle View Mode</button>
			</div>
		);
	}
}

export default ViewControls;