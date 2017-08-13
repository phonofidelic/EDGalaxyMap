import React, { Component } from 'react';
import 'aframe';
import { Entity } from 'aframe-react';
import 'aframe-look-at-component';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { DEVIDER } from '../config';

class SystemListEntity extends Component {

	handleSelectSystem(system) {
		const { targetSystem } = this.props;

		if (targetSystem.id !== system.target.id) {
			console.log('System clicked!', system);
			this.props.selectSystem(system.target.id, this.props.systemList);
		}
	}

	render() {
		const { systemList, showSystemLabels } = this.props;
		const labelOffset = {
			x: 0.1,
			y: 0.2,
			z: 0
		}

		return (
			<Entity id="system-list">
				{systemList.map((system, i) => {
					return (
						<Entity key={i}
										id={`${system.id}-container`}
										position={{x:system.coords.x/DEVIDER, y: system.coords.y/DEVIDER, z: system.coords.z/DEVIDER}} >
							<Entity geometry={{primitive: 'sphere', radius: 0.1}}
											material={{color: '#ccc'}}
											id={system.id}
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
}

const mapStateToProps = state => {
	return {
		targetSystem: state.inputReducer.targetSystem,
		systemList: state.inputReducer.systemList,
		showSystemLabels: state.inputReducer.showSystemLabels,
		showCursor: state.inputReducer.showCursor,
		orbitMode: state.inputReducer.orbitMode
	}
}

export default connect(mapStateToProps, actions)(SystemListEntity);