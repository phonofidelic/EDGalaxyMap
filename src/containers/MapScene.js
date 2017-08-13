import React, { Component } from 'react';
import 'aframe';
import { Entity, Scene } from 'aframe-react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import OrbitModeContainer from './OrbitModeContainer';
import PanModeContainer from './PanModeContainer';

class MapScene extends Component {

	constructor(props) {
		super(props);
		this.props.init();
	}


	handleUserMove(evt) {
		console.log('system heard you move!', evt)
	}

	handleCameraMove(evt) {
		// const {systemList} = this.props;
		// if (evt.detail.name === 'position') {
			// console.log('@ handleCameraMove, evt:', evt)
			// // evt.target.emit('usermoved')
			// if (systemList) {
			// 	this.props.calculateDistance(systemList, evt.detail.newData);
			// }
		// }
	}

	render() {
		const { targetSystem, systemList, orbitMode } = this.props;

		// let userPos = {x: 0, y: 0, z: 0}
		// if (targetSystem) {
		// 	userPos = {
		// 		x: targetSystem.coords.x/DEVIDER, 
		// 		y: targetSystem.coords.y/DEVIDER, 
		// 		z: targetSystem.coords.z/DEVIDER + 1
		// 	}
		// }
		if (targetSystem) {
			return (
				<div>


					{ orbitMode && <OrbitModeContainer /> }
					{ !orbitMode && <PanModeContainer /> }

					{/*
						<Scene>
							<Entity text={{value: 'Enter the name of the system you wish to view.', width: 4}}
											position={{x: 0, y: 0, z: -5}} />
						</Scene> 
					*/}

					

				</div>
			);
		} else { 
			return(
				null
			);
		}
	}
}

const mapStateToProps = state => {
	// if (state.inputReducer.targetSystem) {
	// 	console.log('MapScene state:', state.inputReducer.targetSystem)
	// }
	return {
		targetSystem: state.inputReducer.targetSystem,
		systemList: state.inputReducer.systemList,
		showSystemLabels: state.inputReducer.showSystemLabels,
		showCursor: state.inputReducer.showCursor,
		orbitMode: state.inputReducer.orbitMode
	}
}

export default connect(mapStateToProps, actions)(MapScene);

