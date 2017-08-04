import { 
	SEARCH_SYSTEM_NAME,
	RECEIVE_SYSTEM_INFO,
	RECEIVE_SYSTEMS_BY_NAME,
	TOGGLE_SIDEBAR,
	SELECT_SYSTEM,
	FETCH_SYSTEM_INFO } from '../actiontypes';
import axios from 'axios';

const INIT_SYSTEM_NAME = 'Merope';
const EDSM_SPHERE_SYSTEMS = 'https://www.edsm.net/api-v1/sphere-systems/';
const EDSM_SYSTEM = 'https://www.edsm.net/api-v1/system/';

const getSystem = systemName => new Promise(resolve => {
	axios.get(`${EDSM_SYSTEM}?systemName=${systemName}&showCoordinates=1&showInformation=1&showPrimaryStar=1`)
	.then(response => {
		console.log('@ getSystem, response:', response);

		// Coppy props to new object
		const targetSystem = {...response.data};

		// Check for undefined props
		targetSystem.primaryStar? null : targetSystem.primaryStar = {type: 'N/A'};

		resolve(targetSystem);
	});
});

const getNearbySystems = systemName => new Promise(resolve => {
	axios.get(`${EDSM_SPHERE_SYSTEMS}?systemName=${systemName}&radius=50&showCoordinates=1&showId=1`)
	.then(response => {
		console.log('@ getNearbySystems, response', response);

		resolve(response.data);
	});
});

export const init = () => {
	return dispatch => {
		dispatch({
			type: FETCH_SYSTEM_INFO
		});
		
		getSystem(INIT_SYSTEM_NAME)
		.then(targetSystem => {
			dispatch({
				type: RECEIVE_SYSTEM_INFO,
				targetSystem: targetSystem
			})
		})
		.catch(err => {
			console.error('getSystem error in init:', err);
		});

		getNearbySystems(INIT_SYSTEM_NAME)
		.then(systems => {
			dispatch({
				type: RECEIVE_SYSTEMS_BY_NAME,
				systemList: systems
			});
		})
		.catch(err => {
			console.error('getNearbySystems error in init:', err);
		});
	}
}

export const searchSystemName = formData => {
	console.log('@ searchSystemName, formData:', formData);
	// const { systemName } = formData;
	return dispatch => {
		dispatch({
			type: SEARCH_SYSTEM_NAME,
			targetSystemName: formData.systemName,
		});

		getSystem(formData.systemName)
		.then(targetSystem => {
			dispatch({
				type: RECEIVE_SYSTEM_INFO,
				targetSystem: targetSystem
			})
		})
		.catch(err => {
			console.error('getSystem error in searchSystemName:', err);
		});

		getNearbySystems(formData.systemName)
		.then(systems => {
			dispatch({
				type: RECEIVE_SYSTEMS_BY_NAME,
				systemList: systems
			});
		})
		.catch(err => {
			console.error('getNearbySystems error in searchSystemName:', err);
		});
	}
};

export const toggleSideBar = () => {
	console.log('### toggleSideBar')
	return dispatch => {
		dispatch({
			type: TOGGLE_SIDEBAR
		});
	}
};

export const selectSystem = (systemId, systemList) => {
	console.log('@ selectSystem, system:', systemId);
	return dispatch => {
		let selectedSystem;

		systemList.forEach(system => {
			console.log('### system.id:', system.id)
			console.log('### systemId:', systemId)
			if (parseInt(systemId) === system.id) {
				console.log('### system match:', system)
				selectedSystem = system;
			}
		});

		getSystem(selectedSystem.name)
		.then(targetSystem => {
			dispatch({
				type: RECEIVE_SYSTEM_INFO,
				targetSystem: targetSystem
			})
		})
		.catch(err => {
			console.error('getSystem error in selectSystem:', err);
		});
	}

	// return dispatch => {
	// 	dispatch({
	// 		type: SELECT_SYSTEM,
	// 		systemId: systemId
	// 	});
	// }
}

