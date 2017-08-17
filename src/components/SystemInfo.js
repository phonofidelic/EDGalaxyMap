import React, { Component } from 'react';

class SystemInfo extends Component {
	render() {
		const { targetSystem } = this.props;
		return (
			<div className="nav-sidebar-info">
				<div className="sidebar-system-name">{targetSystem.name}</div>
				<div className="sidebar-system-info">
					<div>Star type: {targetSystem.primaryStar.type}</div>
					<div>Allegiance: {targetSystem.information.allegiance}</div>
					<div>Economy: {targetSystem.information.economy}</div>
					<div>Gevornment: {targetSystem.information.government}</div>
					<div>Population: {targetSystem.information.population}</div>
				</div>
			</div>			
		);
	}
}

export default SystemInfo;