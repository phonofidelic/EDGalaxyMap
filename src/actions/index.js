import { 
	SEARCH_SYSTEM_NAME,
	RECEIVE_SYSTEM_INFO,
	RECEIVE_SYSTEMS_BY_NAME,
	TOGGLE_SIDEBAR,
	FETCH_SYSTEM_INFO,
	SET_SYSTEM_DISTANCE,
	TOGGLE_SYSTEM_LABELS,
	TOGGLE_CURSOR,
	TOGGLE_VIEW_MODE,
	UPDATE_HUD } from '../actiontypes';
import axios from 'axios';

const INIT_SYSTEM_NAME = 'Merope';
const EDSM_SPHERE_SYSTEMS = 'https://www.edsm.net/api-v1/sphere-systems/';
const EDSM_SYSTEM = 'https://www.edsm.net/api-v1/system/';

const getSystem = systemName => new Promise(resolve => {
	axios.get(`${EDSM_SYSTEM}?systemName=${systemName}&showCoordinates=1&showInformation=1&showPrimaryStar=1&showId=1`)
	.then(response => {
		console.log('@ getSystem, response:', response);

		// Coppy props to new object
		const targetSystem = {...response.data};

		// Check for undefined props
		if (!targetSystem.primaryStar) {
			targetSystem.primaryStar = {type: 'N/A'};
		}

		resolve(targetSystem);
	});
});

const getNearbySystems = systemName => new Promise(resolve => {
	axios.get(`${EDSM_SPHERE_SYSTEMS}?systemName=${systemName}&radius=50&showCoordinates=1&showId=1`)
	.then(response => {
		console.log('@ getNearbySystems, response', response);
		response.data.forEach(system => {
			// system.id = system.id.toString();

			system.labelVisible = false;

			// // Attatch this to each system dom node
			// system.addEventListener('usermoved', (evt => {
			// 	console.log('system heard you move!')
			// }))
		})
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
			if (parseInt(systemId, 10) === system.id) {
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

export const hoverSystem = systemName => {
	return dispatch => {
		getSystem(systemName)
		.then(systemData => {
			console.log('@ hoverSystem, systemData:', systemData)
			dispatch({
				type: UPDATE_HUD,
				hudDisplayData: systemData
			});
		})
	}
}

export const calculateDistance = (systemList, userPos) => {
	console.log('@ calculateDistance')
	return dispatch => {
		systemList.forEach(system => {
			const xPow = Math.pow(system.coords.x - userPos.x, 2),
						yPow = Math.pow(system.coords.y - userPos.y, 2),
						zPow = Math.pow(system.coords.z - userPos.z, 2);

			const sumCoords = (xPow + yPow + zPow);

			system.distance = Math.sqrt(sumCoords);
		});

		dispatch({
			type: SET_SYSTEM_DISTANCE,
			systemList: systemList
		});
	}
}


export const toggleSystemLabels = () => {
	return dispatch => {
		dispatch({
			type: TOGGLE_SYSTEM_LABELS
		});
	}
}

export const toggleCursor = () => {
	return dispatch => {
		dispatch({
			type: TOGGLE_CURSOR
		});
	}
}

export const toggleViewMode = () => {
	return dispatch => {
		dispatch({
			type: TOGGLE_VIEW_MODE
		});
	}
}

export const updateHud = (systemName) => {
	return dispatch => {
		dispatch({
			type: UPDATE_HUD,
			hudDisplay: systemName
		});
	}
}

