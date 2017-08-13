import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import 'aframe';
import { Entity, Scene } from 'aframe-react';
// import { GRID_SCALE } from '../config';
import SystemListEntity from './SystemListEntity';

class PanModeContainer extends Component {
	render() {
		const { targetSystem, showCursor, systemList } = this.props;
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

					{ showCursor &&
							<Entity cursor={{fuse: false}}
											position={{...zeroPos, z: -1}}
											geometry={{primitive: 'circle', radius: 0.02}}
											material={{color: '#10ffff'}} />
						}
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