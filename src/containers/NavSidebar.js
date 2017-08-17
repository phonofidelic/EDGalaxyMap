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

	renderViewControls() {
		return (
			<div>
				<div><button onClick={() => {this.props.toggleSystemLabels()}}>Toggle System Labels</button></div>
				<div><button onClick={() => {this.props.toggleCursor()}}>Toggle Cursor</button></div>
				<div><button onClick={() => {this.props.toggleViewMode()}}>Toggle View Mode</button></div>
			</div>
		);
	}

	renderLoadingIcon() {
		return (
			<div className="loading-icon">
				<img src="assets/EDLoader1.svg" alt="loading..."/>
			</div>
		);
	}

	render() {
		const { handleSubmit, showSidebar, fetching } = this.props;
		return(
			<div className="nav-sidebar">
				<button className="btn" onClick={() => {this.props.toggleSideBar()}}>Toggle sidebar</button>
				{showSidebar &&
					<div>
						<div className="nav-sidebar-header">
							<img className="carto-logo" src="assets/universal-cartographics.svg" alt="Logo"/>
							<div className="nav-sidebar-title">
								<div className="sub-title-text">Universal</div>
								<h2 className="main-title-text">CARTOGRAPHICS</h2>
							</div>
						</div>				 
					
						<form className="search-form" onSubmit={handleSubmit(this.handleSearchSubmit.bind(this))}>
							<Field className="search-input" name="systemName" type="text" component="input"/>
							<button className="btn-search" type="submit">Search</button>
						</form>
						{ this.renderInfo() }
						{ this.renderViewControls() }
					</div>
				}
				{fetching && this.renderLoadingIcon()}
			</div>
		);
	}
}

const mapStateToProps = state => {
	// console.log('NavSidebar, state:', state.inputReducer.fetching)
	return {
		targetSystem: state.inputReducer.targetSystem,
		targetSystemName: state.inputReducer.targetSystemName,
		showSidebar: state.inputReducer.showSidebar,
		fetching: state.inputReducer.fetching
	}
}

export default connect(mapStateToProps, actions)(form(NavSidebar));