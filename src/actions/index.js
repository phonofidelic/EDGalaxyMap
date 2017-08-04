import { 
	SEARCH_SYSTEM_NAME,
	RECEIVE_SYSTEM_INFO,
	RECEIVE_SYSTEMS_BY_NAME,
	TOGGLE_SIDEBAR,
	SELECT_SYSTEM } from '../actiontypes';
import axios from 'axios';

const EDSM_SPHERE_SYSTEMS = 'https://www.edsm.net/api-v1/sphere-systems/';
const EDSM_SYSTEM = 'https://www.edsm.net/api-v1/system/';

export const searchSystemName = formData => {
	console.log('@ searchSystemName, formData:', formData);
	// const { systemName } = formData;
	return dispatch => {
		dispatch({
			type: SEARCH_SYSTEM_NAME,
			targetSystemName: formData.systemName
		});

		axios.get(`${EDSM_SYSTEM}?systemName=${formData.systemName}&showCoordinates=1&showInformation=1&showPrimaryStar=1`)
		.then(response => {
			console.log('@ searchSystemName, target system response:', response);

			// Coppy props to new object
			const targetSystem = {...response.data};

			// Check for undefined props
			targetSystem.primaryStar? null : targetSystem.primaryStar = {type: 'N/A'};

			dispatch({
				type: RECEIVE_SYSTEM_INFO,
				targetSystem: targetSystem
			})
		})

		axios.get(`${EDSM_SPHERE_SYSTEMS}?systemName=${formData.systemName}&radius=50&showCoordinates=1&showId=1`)
		.then(response => {
			console.log('@ searchSystemName, radius response:', response);

			dispatch({
				type: RECEIVE_SYSTEMS_BY_NAME,
				systemList: response.data
			});
		})
		.catch(err => {
			console.error('searchSystemName error:', err);
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

		axios.get(`${EDSM_SYSTEM}?systemName=${selectedSystem.name}&showCoordinates=1&showInformation=1&showPrimaryStar=1`)
		.then(response => {
			console.log('@ selectSystem, response:', response);

			// Coppy props to new 	TODO: remove repetition
			const targetSystem = {...response.data};

			// Check for undefined props
			targetSystem.primaryStar? null : targetSystem.primaryStar = {type: 'N/A'};

			dispatch({
				type: RECEIVE_SYSTEM_INFO,
				targetSystem: targetSystem
			})
		})
		.catch(err => {
			console.error('selectSystem error:', err);
		});
	}

	// return dispatch => {
	// 	dispatch({
	// 		type: SELECT_SYSTEM,
	// 		systemId: systemId
	// 	});
	// }
}

