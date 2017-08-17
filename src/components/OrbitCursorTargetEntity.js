import React, { Component } from 'react';
import 'aframe';
import { Entity } from 'aframe-react';
import { GRID_SCALE } from '../config';

class OrbitCursorTargetEntity extends Component {
	render() {
		const { targetSystem } = this.props;
		const zeroPos = {x: 0, y: 0, z: 0};
		return (
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
		);
	}
}

export default OrbitCursorTargetEntity;