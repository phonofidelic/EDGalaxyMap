import React, { Component } from 'react';
import 'aframe';
import {Entity, Scene} from 'aframe-react';

class MapScene extends Component {
	render() {
		return(
			<Scene>
				{<Entity primitive="a-sky" color="black" />}
				<Entity geometry={{'primitive': 'box'}} material={{color: 'red'}} position={{x: 0, y: 0, z: -5}} />
				<Entity text={{value: 'Hello, WebVR!'}}/>
			</Scene>
		);
	}
}

export default MapScene;