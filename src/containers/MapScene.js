import React, { Component } from 'react';
import 'aframe';
import { Entity, Scene } from 'aframe-react';
import 'aframe-look-at-component';
import 'aframe-orbit-controls-component-2';
import THREELib from "three-js";
import { connect } from 'react-redux';
import * as actions from '../actions';

const THREE = THREELib();
const DEVIDER = 1;
const GRID_SCALE = 0.05

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
				<Scene id="scene">
					<a-assets>
						<img src="assets/grid.png" id="grid" />
					</a-assets>
					<Entity primitive="a-sky" color="black" />

						
						<Entity primitive="a-entity"
										camera="fov: 80; zoom: 1;"
										position={{...targetSystem.coords, y: targetSystem.coords.y + 1, z: targetSystem.coords.z + 2}}
										id="camera"
										events={{componentchanged: this.handleCameraMove.bind(this)}}
										orbit-controls={{
												autoRotate: false,
												target: '#cursor-target',
												enableDamping: true,
												dampingFactor: 0.25,
												rotateSpeed: 0.14,
												minDistance: 1,
												maxDistance: 15
											}} >	

							<Entity cursor={{fuse: false}}
											id="cursor"
											position={{x: 0, y: 0, z: -1}}
											geometry={{primitive: 'circle', radius: 0.02}}
											material={{color: '#10ffff', shader: 'flat'}}
											visible={false} >

								
								

								

							</Entity>

						</Entity>
						

						<Entity id="cursor-target"
										position={targetSystem.coords}>
							<Entity position={zeroPos}
										geometry={{primitive: 'circle', radius: 0.1}}
										rotation="-90 0 0"
										material={{color: '#10ffff', shader: 'flat'}} />

							<Entity primitive="a-plane"
											position={zeroPos}
											scale={{x: GRID_SCALE, y: GRID_SCALE, z: GRID_SCALE}}
											width="10000"
											height="10000"
											rotation="-90 0 0"
											material={{
												src: '#grid',
												repeat: { x: 1000, y: 1000},
												transparent: true
											}} />

							<Entity primitive="a-ring"
											id="cursor-ring"
											color="#10ffff"												
											geometry={{radiusInner: 0.2, radiusOuter: 0.22}}
											position={zeroPos}
											rotation="-90 0 0"
											 />
						</Entity>

						

						{/*
							<Entity primitive="a-plane"
											id="grid"
											position={targetSystem.coords}
											wireframe={true}
											rotation="-90 0 0" />
						*/}

					{/*
						<Scene>
							<Entity text={{value: 'Enter the name of the system you wish to view.', width: 4}}
											position={{x: 0, y: 0, z: -5}} />
						</Scene> 
					*/}

					{ systemList && this.renderSystemList() }

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
		targetSystemName: state.inputReducer.targetSystemName,
		systemList: state.inputReducer.systemList,
		showSystemLabels: state.inputReducer.showSystemLabels,
		showCursor: state.inputReducer.showCursor
	}
}

export default connect(mapStateToProps, actions)(MapScene);

