import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import inputReducer from './inputReducer';

const rootReducer = combineReducers({
	inputReducer: inputReducer,
	form: formReducer
})

export default rootReducer;