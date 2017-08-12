import React, { Component } from 'react';
import 'aframe';
import { Entity, Scene } from 'aframe-react';
import 'aframe-look-at-component';
import 'aframe-orbit-controls-component-2';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { DEVIDER } from '../config';
import OrbitModeContainer from './OrbitModeContainer';
import SystemListEntity from './SystemListEntity';

// const DEVIDER = 1;
// const GRID_SCALE = 0.05

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
		const { targetSystem, systemList, showCursor, orbitMode } = this.props;
		const zeroPos = {x: 0, y: 0, z: 0};

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
				<Scene id="scene">
					<a-assets>
						<img src="assets/grid.png" id="grid" />
					</a-assets>

					<Entity primitive="a-sky" color="black" />

						<OrbitModeContainer />

					{/*
						<Scene>
							<Entity text={{value: 'Enter the name of the system you wish to view.', width: 4}}
											position={{x: 0, y: 0, z: -5}} />
						</Scene> 
					*/}

					{ systemList && <SystemListEntity /> }

				</Scene>
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

