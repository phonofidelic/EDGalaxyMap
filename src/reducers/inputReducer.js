import { 
	SEARCH_SYSTEM_NAME,
	RECEIVE_SYSTEM_INFO,
	RECEIVE_SYSTEMS_BY_NAME,
	TOGGLE_SIDEBAR,
	SELECT_SYSTEM } from '../actiontypes';

const INITIAL_STATE = {
	targetSystem: null,
	targetSystemName: null,
	systemList: null,
	showSidebar: true
};

const inputReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case SEARCH_SYSTEM_NAME:
			return {
				...state,
				targetSystemName: action.targetSystemName
			}

		case RECEIVE_SYSTEM_INFO:
			return {
				...state,
				targetSystem: action.targetSystem
			}

		case RECEIVE_SYSTEMS_BY_NAME:
			return {
				...state,
				systemList: action.systemList
			}

		case TOGGLE_SIDEBAR:
			return {
				...state,
				showSidebar: !state.showSidebar
			}

		case SELECT_SYSTEM:
		const selectedSystem = state.systemList.map(system => {
			if (system.id === action.systemId) {
				return system 
			}
		});

			return {
				...state,
				targetSystem: selectedSystem
			}

		default: return state;
	}
}

export default inputReducer;