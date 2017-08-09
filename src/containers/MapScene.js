import React, { Component } from 'react';
import 'aframe';
import { Entity, Scene } from 'aframe-react';
import 'aframe-look-at-component';
import 'aframe-orbit-controls-component-2';
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
		const { targetSystem, systemList, showCursor } = this.props;
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
			<Scene>
				<Entity primitive="a-sky" color="black" />

				{ targetSystem && 
					
						<Entity primitive="a-entity"
										camera="fov: 80; zoom: 1;"
										position={{...targetSystem.coords, z: targetSystem.coords.z + 2}}
										id="camera"
										events={{componentchanged: this.handleCameraMove.bind(this)}}
										orbit-controls={{
												autoRotate: false,
												target: '#cursor-target',
												enableDamping: true,
												dampingFactor: 0.25,
												rotateSpeed: 0.14,
												minDistance: 2,
												maxDistance: 15
											}} >	

							<Entity cursor={{fuse: false}}
											id="cursor"
											position={{x: 0, y: 0, z: -1}}
											geometry={{primitive: 'circle', radius: 0.02}}
											material={{color: '#10ffff', shader: 'flat'}}
											visible={{showCursor}}
											 >

								<Entity primitive="a-ring"
												id="cursor-ring"
												color="#10ffff"												
												geometry={{radiusInner: 0.045, radiusOuter: 0.05}}
												position={{x: 0, y: 0, z: 0}} >
								</Entity>

							</Entity>

						</Entity>
					
				}

				{ targetSystem && 
					<Entity id="cursor-target"
									position={targetSystem.coords}
									geometry={{primitive: 'circle', radius: 0.02}}
									material={{color: '#10ffff', shader: 'flat'}}>
					</Entity>
				}

				{/*	targetSystem &&
					<Entity primitive="a-camera" 
												position={{...targetSystem.coords, z: targetSystem.coords.z + 2}}
												orbit-controls={{
													autoRotate: false,
													target: '#target',
													enableDamping: true,
													dampingFactor: 0.25,
													rotateSpeed: 0.14,
													minDistance: 2,
													maxDistance: 15
												}} >
					</Entity>
				*/}

				{/* targetSystem &&
					<Entity id="target" primitive="a-box" position={targetSystem.coords}></Entity>
				*/}


				{ !targetSystem && 
					<Entity text={{value: 'Enter the name of the system you wish to view.', width: 4}}
									position={{x: 0, y: 0, z: -5}} />
				}

				{ systemList && this.renderSystemList() }
				{ systemList && console.log('# system distance #', systemList[0].distance)}

			</Scene>
		);
	} else { return(null)}
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
		showSystemLabels: state.inputReducer.showSystemLabels,
		showCursor: state.inputReducer.showCursor
	}
}

export default connect(mapStateToProps, actions)(MapScene);

