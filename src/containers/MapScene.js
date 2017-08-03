import React, { Component } from 'react';
import 'aframe';
import {Entity, Scene} from 'aframe-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MapScene extends Component {

	renderTargetSystem() {
		const { targetSystemName } = this.props;
		return(
			<Entity position={{x: 0, y: 0, z: -5}}>
				<Entity geometry={{primitive: 'sphere', radius: 0.2}}
								material={{color: '#fff'}} />

				<Entity text={{value: targetSystemName, color: '#fff', width: 4}}
								position={{x: 2, y: 0.5, z: 0}} />
			</Entity>
		);
	}

	render() {
		const { targetSystemName, systemList } = this.props;
		return(
			<Scene>
				<Entity primitive="a-sky" color="black" />

				{targetSystemName ? 
					this.renderTargetSystem() : 
					<Entity text={{value: 'Enter the name of the system you wish to view.', width: 4}}
									position={{x: 0, y: 0, z: -5}} />
				}

			</Scene>
		);
	}
}

const mapStateToProps = state => {
	console.log('MapScene state:', state)
	return {
		targetSystemName: state.inputReducer.targetSystemName,
		systemList: state.inputReducer.systemList
	}
}

export default connect(mapStateToProps, actions)(MapScene);