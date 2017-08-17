import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import 'aframe';
import 'aframe-orbit-controls-component-2';
import { Scene, Entity } from 'aframe-react';
import { GRID_SCALE } from '../config';
import SystemListEntity from './SystemListEntity';
import HudDisplayEntity from '../components/HudDisplayEntity';
import OrbitCursorTargetEntity from '../components/OrbitCursorTargetEntity';

class OrbitModeContainer extends Component {

	render() {
		const { targetSystem, showCursor, systemList, hudDisplay } = this.props;
		const zeroPos = {x: 0, y: 0, z: 0};
		return (
			<Scene id="scene">
				<a-assets>
					<img src="assets/grid.png" id="grid" />
				</a-assets>

				<Entity primitive="a-sky" color="black" />	
						
				<Entity>
					<Entity primitive="a-entity"
									camera="fov: 80; zoom: 1;"
									position={{...targetSystem.coords, y: targetSystem.coords.y + 1, z: targetSystem.coords.z + 2}}
									id="camera"
									orbit-controls={{
											autoRotate: false,
											target: '#cursor-target',
											enableDamping: true,
											dampingFactor: 0.25,
											rotateSpeed: 0.14,
											minDistance: 1,
											maxDistance: 15
										}} >	

						{ 
							showCursor &&
							<Entity cursor={{fuse: true, fuseTimeout: 500}}
											position={{...zeroPos, z: -1}}
											geometry={{primitive: 'circle', radius: 0.02}}
											material={{color: '#10ffff'}} />
						}

						<HudDisplayEntity />

					</Entity>

					<OrbitCursorTargetEntity targetSystem={targetSystem} />
				</Entity>
				{ systemList && <SystemListEntity /> }
			</Scene>
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

export default connect(mapStateToProps, actions)(OrbitModeContainer);

