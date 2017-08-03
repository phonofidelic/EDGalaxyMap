import { 
	SEARCH_SYSTEM_NAME,
	RECEIVE_SYSTEMS_BY_NAME } from '../actiontypes';
import axios from 'axios';

const EDSM_SPHERE_SYSTEMS = 'https://www.edsm.net/api-v1/sphere-systems/';

export const searchSystemName = formData => {
	console.log('@ searchSystemName, formData:', formData);
	// const { systemName } = formData;
	return dispatch => {
		dispatch({
			type: SEARCH_SYSTEM_NAME,
			targetSystemName: formData.systemName
		});

		axios.get(`${EDSM_SPHERE_SYSTEMS}?systemName=${formData.systemName}&showCoordinates=1`)
		.then(response => {
			console.log('@ searchSystemName, response:', response);

			dispatch({
				type: RECEIVE_SYSTEMS_BY_NAME,
				systemList: response.data
			});
		})
		.catch(err => {
			console.error('searchSystemName error:', err);
		});
	}
	
}