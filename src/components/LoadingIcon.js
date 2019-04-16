import React, { Component } from 'react';
import EDLoader from '../assets/EDLoader1.svg';

class LoadingIcon extends Component {
	render() {
		return (
			<div className="loading-icon">
				<img src={EDLoader} alt="loading..."/>
			</div>
		);
	}
}

export default LoadingIcon;