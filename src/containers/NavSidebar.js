import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import SystemInfo from '../components/SystemInfo';
import ViewControls from '../components/ViewControls';
import LoadingIcon from '../components/LoadingIcon';

const form = reduxForm({
	form: 'systemName'
});

class NavSidebar extends Component {

	handleSearchSubmit(formProps) {
		this.props.searchSystemName(formProps);
	}

	render() {
		const { targetSystem, handleSubmit, showSidebar, fetching } = this.props;
		return(
			<div className="nav-sidebar">
				<button className="btn" onClick={() => {this.props.toggleSideBar()}}>Toggle sidebar</button>
				{
					showSidebar &&
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
						{ targetSystem && <SystemInfo targetSystem={targetSystem} /> }
						<ViewControls toggleCursor={this.props.toggleCursor} toggleViewMode={this.props.toggleViewMode}/>
					</div>
				}

				{ fetching && <LoadingIcon /> }
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