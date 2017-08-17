import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import 'aframe';
import { Entity, Scene } from 'aframe-react';
// import { GRID_SCALE } from '../config';
import SystemListEntity from './SystemListEntity';
import HudDisplayEntity from '../components/HudDisplayEntity';

class PanModeContainer extends Component {

	handleFuse() {
		console.log('### fused');
	}

	render() {

		const { targetSystem, showCursor, systemList, hudDisplay } = this.props;
		const zeroPos = {x: 0, y: 0, z: 0};
		return (
			<Scene id="scene">
				<a-assets>
					<img src="assets/grid.png" id="grid" />
				</a-assets>

				<Entity primitive="a-sky" color="black" />

				<Entity primitive="a-camera"
								position={{...targetSystem.coords, z: targetSystem.coords.z + 2}}
								id="camera"
								>

					{ 
						showCursor &&
						<Entity cursor={{fuse: true, fuseTimeout: 500}}	
										position={{...zeroPos, z: -1}}
										geometry={{primitive: 'ring', radiusOuter: 0.02, radiusInner: 0.015}}
										material={{color: '#10ffff'}} />
					}


					<HudDisplayEntity />


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
		showCursor: state.inputReducer.showCursor
	}
}

export default connect(mapStateToProps, actions)(PanModeContainer);