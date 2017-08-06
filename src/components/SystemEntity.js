import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import 'aframe';
import { Entity } from 'aframe-react';
import 'aframe-look-at-component';

class SystemEntity extends Component {
	render() {
		const { id, name, coords, distance } = this.props;
		return (
			<Entity id={id}
							position={{
									x: coords.x/DEVIDER, 
									y: coords.y/DEVIDER, 
									z: coords.z/DEVIDER
							}} >
				<Entity geometry={{primitive: 'sphere', radius: 0.1}}
								material={{color: '#ccc'}}
								id={`${id}-sphere`}
								events={{click: this.props.selectSystem.(id)}} />

				{
					distance <= 10 && <Entity text={{value: name, color: '#fff', width: 4}}
																		position={{x: 2, y: 0.3, z: 0}}
																		look-at="#camera" />
				}
			</Entity>
		);
	}
}

const mapStateToProps = state => {
	return {
		systemList: state.inputReducer.systemList
	}
}

export default connect(mapStateToProps, actions)(SystemEntity);