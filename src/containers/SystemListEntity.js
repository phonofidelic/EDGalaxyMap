import React, { Component } from 'react';
import 'aframe';
import { TWEEN } from 'aframe';
import { Entity } from 'aframe-react';
import 'aframe-look-at-component';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { DEVIDER } from '../config';

class SystemListEntity extends Component {

	handleSelectSystem(system) {
		const { targetSystem } = this.props;

		// if (targetSystem.id !== system.target.id) {
		// 	console.log('System clicked!', system);
		// 	this.props.selectSystem(system.target.id, this.props.systemList);
		// }
	}

	handleFuse(e) {
		const { systemList } = this.props;

		systemList.forEach(system => {
			if (parseInt(e.target.id, 10) === system.id) {
				const element = document.getElementById('hud-display');
				const obj = {opacity: 0};
				const tween = new TWEEN.Tween(obj)
					.to({opacity: 1}, 500)
					.onUpdate(() => {
						element.setAttribute('text', 'opacity', obj.opacity);
						element.setAttribute('text', 'value', system.name);
					})
					.start();
			}
		});
	}

	handleUnfuse(e) {
		console.log('### unfuse:', e.target.id)
		
		const element = document.getElementById('hud-display');
		const obj = {opacity: 1};
		const tween = new TWEEN.Tween(obj)
			.to({opacity: 0}, 500)
			.onUpdate(() => {
				element.setAttribute('text', 'opacity', obj.opacity);
			})
			.start();

		// this.props.updateHud(null);
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
											name={system.name}
											events={{
												click: this.handleSelectSystem.bind(this), 
												fusing: this.handleFuse.bind(this),
												mouseleave: this.handleUnfuse.bind(this)
											}} />								
						</Entity>
					)
				})}
			</Entity>
		);
	}
}

const mapStateToProps = state => {
	// console.log('### state, systemList:', state.inputReducer.systemList)
	return {
		targetSystem: state.inputReducer.targetSystem,
		systemList: state.inputReducer.systemList,
		showSystemLabels: state.inputReducer.showSystemLabels,
		showCursor: state.inputReducer.showCursor,
		orbitMode: state.inputReducer.orbitMode
	}
}

export default connect(mapStateToProps, actions)(SystemListEntity);