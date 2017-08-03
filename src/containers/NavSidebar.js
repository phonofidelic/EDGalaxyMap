import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';

const form = reduxForm({
	form: 'systemName'
});

class NavSidebar extends Component {

	handleSearchSubmit(formProps) {
		this.props.searchSystemName(formProps);
	}

	renderInfo() {
		const { targetSystem } = this.props;

		if (targetSystem) {
			return (
				<div className="nav-sidebar-info">
					<div className="sidebar-system-name">{targetSystem.name}</div>
					<div>Star type: {targetSystem.primaryStar.type}</div>
					<div>Allegiance: {targetSystem.information.allegiance}</div>
					<div>Economy: {targetSystem.information.economy}</div>
					<div>Gevornment: {targetSystem.information.government}</div>
					<div>Population: {targetSystem.information.population}</div>
				</div>
			);
		}
	}

	render() {
		const { handleSubmit, showSidebar } = this.props;
		return(
			<div className="nav-sidebar">
				<button onClick={() => {this.props.toggleSideBar()}}>Toggle sidebar</button>
				{showSidebar &&
					<div>
						<div className="nav-sidebar-header">
							<h2>Sidebar Header</h2>
						</div>				 
					
						<form onSubmit={handleSubmit(this.handleSearchSubmit.bind(this))}>
							<Field name="systemName" type="text" component="input"/>
							<button type="submit">Search</button>
						</form>
						{this.renderInfo()}
					</div>
				}
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log('NavSidebar, state:', state.inputReducer.showSidebar)
	return {
		targetSystem: state.inputReducer.targetSystem,
		targetSystemName: state.inputReducer.targetSystemName,
		showSidebar: state.inputReducer.showSidebar
	}
}

export default connect(mapStateToProps, actions)(form(NavSidebar));