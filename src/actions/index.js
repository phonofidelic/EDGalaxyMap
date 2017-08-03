import { SEARCH_SYSTEM_NAME } from '../actiontypes';
import axios from 'axios';

const EDSM_SPHERE_SYSTEMS = 'https://www.edsm.net/api-v1/sphere-systems/';

export const searchSystemName = systemName => {
	return dispatch => {
		dispatch({
			type: SEARCH_SYSTEM_NAME,
			systemName: systemName
		});

		axios.get(`${EDSM_SPHERE_SYSTEMS}${systemName}`)
		.then(response => {
			console.log('@ searchSystemName, response:', response);

		})
		.catch(err => {
			console.error('searchSystemName error:', err);
		});
	}
	
}