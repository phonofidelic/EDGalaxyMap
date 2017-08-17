import React, { Component } from 'react';
import 'aframe';
import { Entity } from 'aframe-react';

class HudDisplayEntity extends Component {
	render() {
		return(
			<Entity id="hud-display">
				<Entity primitive="a-text"
								id="hud-system-name"
								position={{x: 0.1, y: 0.1, z: -1}}
								width="0.8"
								opacity="0"
								font="https://cdn.aframe.io/fonts/KelsonSans.fnt"
								value="" />
			</Entity>
		);
	}
}

export default HudDisplayEntity;