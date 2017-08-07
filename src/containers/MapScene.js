import React, { Component } from 'react';
import 'aframe';
import { Entity, Scene } from 'aframe-react';
import 'aframe-look-at-component';
import { connect } from 'react-redux';
import * as actions from '../actions';

const DEVIDER = 1;

class MapScene extends Component {

	constructor(props) {
		super(props);
		this.props.init();
	}

	handleSelectSystem(system) {
		console.log('System clicked!', system);
		this.props.selectSystem(system.target.id, this.props.systemList);
	}

	handleUserMove(evt) {
		console.log('system heard you move!', evt)
	}

	renderSystemList() {
		const { showSystemLabels } = this.props;
		const labelOffset = {
			x: 0.1,
			y: 0.2,
			z: 0
		}
		console.log('## renderSystemList is called')
		return (
			<Entity id="system-list">
				{this.props.systemList.map((system, i) => {

					// add event listener for camera position chganges
					// const systemEntity = document.querySelector('#'+system.id);
					// if (systemEntity) {
					// 	systemEntity.addEventListener('usermoved', evt => {
					// 		console.log('system heard you move')
					// 	})
					// }
					// console.log('### system.distance:', system.distance)
					// console.log('### system node', document.querySelector('#'+system.id))
					return (
						<Entity key={i}
										id={system.id}
										events={{componentchanged: this.handleUserMove.bind(this)}}
										position={{x:system.coords.x/DEVIDER, y: system.coords.y/DEVIDER, z: system.coords.z/DEVIDER}} >
							<Entity geometry={{primitive: 'sphere', radius: 0.1}}
											material={{color: '#ccc'}}
											id={`${system.id}-sphere`}
											events={{click: this.handleSelectSystem.bind(this)}}
											 />

							{/* 
								Calculate distance between system entity and camera entity:
								
								square root of system coords - camera coords

								const userPos = document.querySelector('#user-pos').object3D.position;
								Math.sqrt(Math.pow(system.coods.x - userPos.x, 2) + Math.pow(system.coods.y - userPos.y, 2) + Math.pow(system.coods.z - userPos.z, 2))

								If the resulting distance is greater then some set constant,
								do not render the systems text label entity.
							*/}

							{ 
								showSystemLabels && 
								<Entity>
									<Entity primitive="a-plane"
													position={labelOffset}
													color="#000"
													look-at="#camera"
													height="auto"
													width="auto"
													text={{
														value: system.name, 
														color: '#fff', 
														align: 'center'
													}} />
									<Entity line={{
										start: {x: 0, y: 0, z: 0}, 
										end: labelOffset, 
										color: '#fff'}} />
								</Entity>
							}
								
						</Entity>
					)
				})}
			</Entity>
		);
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
		const { targetSystem, systemList } = this.props;

		return (
			<Scene>
				<Entity primitive="a-sky" color="black" />

				{targetSystem && 
				
						<Entity primitive="a-camera" id="camera" position={{
															x: targetSystem.coords.x/DEVIDER, 
															y: targetSystem.coords.y/DEVIDER, 
															z: targetSystem.coords.z/DEVIDER + 1
														}}
										events={{componentchanged: this.handleCameraMove.bind(this)}} >
							<Entity cursor={{fuse: false}}
											position={{x: 0, y: 0, z: -1}}
											geometry={{primitive: 'ring', radiusInner: 0.02, radiusOuter: 0.03}}
											material={{color: '#fff', shader: 'flat'}} />
						</Entity>

				}

				{ !targetSystem && 
					<Entity text={{value: 'Enter the name of the system you wish to view.', width: 4}}
									position={{x: 0, y: 0, z: -5}} />
				}

				{ systemList && this.renderSystemList() }
				{ systemList && console.log('# system distance #', systemList[0].distance)}

			</Scene>
		);
	}
}

const mapStateToProps = state => {
	if (state.inputReducer.targetSystem) {
		console.log('MapScene state:', state.inputReducer.targetSystem)
	}
	return {
		targetSystem: state.inputReducer.targetSystem,
		targetSystemName: state.inputReducer.targetSystemName,
		systemList: state.inputReducer.systemList,
		showSystemLabels: state.inputReducer.showSystemLabels
	}
}

export default connect(mapStateToProps, actions)(MapScene);