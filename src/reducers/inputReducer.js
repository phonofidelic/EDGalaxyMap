import { SEARCH_SYSTEM_NAME } from '../actiontypes';

const INITIAL_STATE = {
	targetSystemName: null
};

const inputReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case SEARCH_SYSTEM_NAME:
			return {
				...state,
				targetSystemName: action.targetSystemName
			}

		default: return state;
	}
}

export default inputReducer;