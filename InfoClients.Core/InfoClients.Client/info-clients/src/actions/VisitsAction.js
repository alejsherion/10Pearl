import {
    SAVE_VISIT,
    SAVE_VISIT_SUCCESS,
    SAVE_VISIT_ERROR,
    GET_VISIT_BY_CLIENT,
    GET_VISIT_BY_CLIENT_SUCCESS,
    GET_VISIT_BY_CLIENT_ERROR,
    GET_ALL_VISITS,
    GET_ALL_VISITS_SUCCESS,
    GET_ALL_VISITS_ERROR
} from '../types/Index';

import clientAxios from '../config/clientAxios';
import Swal from 'sweetalert2';

export function getAllVisitAction() {
    return dispatch => {
        dispatch(getAllVisit());

        clientAxios
            .get('/visit/getall')
            .then(response => {
                if (response.data.isSuccesful) {
                    dispatch(getAllVisitSuccess(response.data.result));
                } else {
                    dispatch(getAllVisitError({message: response.data.messages}));
                }
            })
            .catch(error => dispatch(getAllVisitError(error)))
    }
}

export function getVisitAction(nit) {
    return (dispatch) => {
        dispatch(getVisitByClient());

        clientAxios
            .get(`/Visit/GetByClient?nit=${nit}`)
            .then(response => {
                if (response.data.isSuccesful) {
                    dispatch(getVisitByClientSuccess(response.data.result))
                } else {
                    dispatch(getVisitByClientError({ message: response.data.messages}))
                }
            })
            .catch(error => dispatch(getVisitByClientError(error)))
    }
}

export function saveVisitAction(visit) {
    return (dispatch) => {
        dispatch(saveVisit());
        
        clientAxios
            .post('/visit', visit)
            .then(response => {
                if (response.data.isSuccesful) {
                    Swal.fire('Save', 'Visit save success', 'success');

                    dispatch(saveVisitSuccess(response.data.result));
                } else {
                    dispatchEvent(saveVisitError({ message: response.data.messages}))
                }
            })
            .catch(error => dispatch(saveVisitError(error)))
    }
}

export const saveVisit = () => ({
    type: SAVE_VISIT
});
export const saveVisitSuccess = (visit) => ({
    type: SAVE_VISIT_SUCCESS,
    payload: visit
});
export const saveVisitError = (error) => ({
    type: SAVE_VISIT_ERROR,
    payload: error
});
export const getVisitByClient = () => ({
    type: GET_VISIT_BY_CLIENT
});
export const getVisitByClientSuccess = (visits) => ({
    type: GET_VISIT_BY_CLIENT_SUCCESS,
    payload: visits
});
export const getVisitByClientError = (error) => ({
    type: GET_VISIT_BY_CLIENT_ERROR,
    payload: error
});
export const getAllVisit = () => ({
    type: GET_ALL_VISITS
});
export const getAllVisitSuccess = visits => ({
    type: GET_ALL_VISITS_SUCCESS,
    payload: visits
});
export const getAllVisitError = error => ({
    type: GET_ALL_VISITS_ERROR,
    payload: error
});