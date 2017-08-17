import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import 'aframe';
import 'aframe-orbit-controls-component-2';
import { Scene, Entity } from 'aframe-react';
import { GRID_SCALE } from '../config';
import SystemListEntity from './SystemListEntity';

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

						{ showCursor &&
							<Entity cursor={{fuse: true, fuseTimeout: 500}}
											position={{...zeroPos, z: -1}}
											geometry={{primitive: 'circle', radius: 0.02}}
											material={{color: '#10ffff'}} />
						}

						{
							hudDisplay &&
							<Entity primitive="a-text"
											position={{x: 0.2, y: 0.2, z: -1}}
											width="0.8"
											opacity="0"
											font="https://cdn.aframe.io/fonts/KelsonSans.fnt"
											value={hudDisplay} >

								<a-animation attribute="opacity"
													   dur="1000"
														 to="1" />
							</Entity>
						}

					</Entity>

					<Entity id="cursor-target"
									position={targetSystem.coords}>
						<Entity position={zeroPos}
										cursor={{fuse: true, fuseTimeout: 500}}
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
		orbitMode: state.inputReducer.orbitMode,
		hudDisplay: state.inputReducer.hudDisplay
  }
}

export default connect(mapStateToProps, actions)(OrbitModeContainer);

