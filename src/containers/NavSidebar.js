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

	renderDebug() {		
		return(
			<div>Debug</div>
		);
	}

	render() {
		const { handleSubmit } = this.props;
		return(
			<div className="nav-sidebar">
				<h2>Sidebar</h2>
				<form onSubmit={handleSubmit(this.handleSearchSubmit.bind(this))}>
					<Field name="system-name" type="text" component="input"/>
					<button type="submit">Search</button>
				</form>
				{this.renderDebug()}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		targetSystemName: state.inputReducer.targetSystemName
	}
}

export default connect(mapStateToProps, actions)(form(NavSidebar));