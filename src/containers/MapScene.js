import React, { Component } from 'react';
import 'aframe';
import { Entity, Scene } from 'aframe-react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import OrbitModeContainer from './OrbitModeContainer';
import PanModeContainer from './PanModeContainer';

class MapScene extends Component {

	constructor(props) {
		super(props);
		this.props.init();
	}

	render() {
		const { targetSystem, orbitMode } = this.props;

		if (targetSystem) {
			return (
				<div>

					{ orbitMode && <OrbitModeContainer /> }
					{ !orbitMode && <PanModeContainer /> }
					
				</div>
			);
		} else { 
			return(
				<Scene>
					<Entity text={{value: 'Enter the name of the system you wish to view.', width: 4}}
									position={{x: 0, y: 0, z: -5}} />
				</Scene> 
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		targetSystem: state.inputReducer.targetSystem,
		showSystemLabels: state.inputReducer.showSystemLabels,
		showCursor: state.inputReducer.showCursor,
		orbitMode: state.inputReducer.orbitMode
	}
}

export default connect(mapStateToProps, actions)(MapScene);

