import { 
	SEARCH_SYSTEM_NAME,
	RECEIVE_SYSTEMS_BY_NAME } from '../actiontypes';

const INITIAL_STATE = {
	targetSystemName: null,
	systemList: null
};

const inputReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case SEARCH_SYSTEM_NAME:
			return {
				...state,
				targetSystemName: action.targetSystemName
			}

		case RECEIVE_SYSTEMS_BY_NAME:
			return {
				...state,
				systemList: action.systemList
			}

		default: return state;
	}
}

export default inputReducer;