import React, { Component } from 'react';
import 'aframe';
import {Entity, Scene} from 'aframe-react';
import 'aframe-look-at-component';
import { connect } from 'react-redux';
import * as actions from '../actions';

const DEVIDER = 1;

class MapScene extends Component {

	constructor(props) {
		super(props);
		this.props.init();
	}

	handleClick(system) {
		console.log('System clicked!', system);
		this.props.selectSystem(system.target.id, this.props.systemList);
	}

	renderSystemList() {
		const { systemList } = this.props;		
		
		return (
			<Entity>
				{systemList.map((system, i) => {
									return (
										<Entity key={i} position={{x:system.coords.x/DEVIDER, y: system.coords.y/DEVIDER, z: system.coords.z/DEVIDER}}>
											<Entity geometry={{primitive: 'sphere', radius: 0.1}}
															material={{color: '#ccc'}} 
															events={{click: this.handleClick.bind(this)}}
															id={system.id} />

											<Entity text={{value: system.name, color: '#fff', width: 4}}
															position={{x: 2, y: 0.3, z: 0}}
															look-at="#camera" />
										</Entity>
									)
				})}
			</Entity>
		);
	}

	render() {
		const { targetSystemName, targetSystem, systemList } = this.props;
		return (
			<Scene>
				<Entity primitive="a-sky" color="black" />

				{targetSystem && 
					<Entity position={{x: targetSystem.coords.x/DEVIDER, y: targetSystem.coords.y/DEVIDER, z: targetSystem.coords.z/DEVIDER}}>
						<Entity primitive="a-camera" id="camera" position={{x: 0, y: 0, z: 2}}>
							<Entity cursor={{fuse: false}}
											position={{x: 0, y: 0, z: -1}}
											geometry={{primitive: 'ring', radiusInner: 0.02, radiusOuter: 0.03}}
											material={{color: '#fff', shader: 'flat'}} />
						</Entity>
					</Entity>
				}

				{ !targetSystemName && 
					<Entity text={{value: 'Enter the name of the system you wish to view.', width: 4}}
									position={{x: 0, y: 0, z: -5}} />
				}

				{ systemList && this.renderSystemList() }

			</Scene>
		);
	}
}

const mapStateToProps = state => {
	// console.log('MapScene state:', state)
	return {
		targetSystem: state.inputReducer.targetSystem,
		targetSystemName: state.inputReducer.targetSystemName,
		systemList: state.inputReducer.systemList
	}
}

export default connect(mapStateToProps, actions)(MapScene);