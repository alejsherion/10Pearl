import {
    GET_LIST_CLIENTS,
    DONWLOAD_CLIENTS_SUCCESS,
    DONWLOAD_CLIENTS_ERROR,
    SET_CLIENT,
    SET_CLIENT_SUCCESS,
    SET_CLIENT_ERROR,
    DELETE_CLIENT,
    DELETE_CLIENT_SUCCESS,
    DELETE_CLIENT_ERROR,
    GET_CLIENT_FOR_EDIT,
    GET_CLIENT_FOR_EDIT_SUCCESS,
    GET_CLIENT_FOR_EDIT_ERROR,
    EDIT_CLIENT,
    EDIT_CLIENT_SUCCESS,
    EDIT_CLIENT_ERROR
} from '../types/Index';

import clientAxios from '../config/clientAxios';
import Swal from 'sweetalert2';
import { ResultRequest } from '../models/ResultRequest';

export function getClientsAction() {
    return (dispatch) => {
        dispatch(getClients());

        clientAxios
            .get('/Client/GetAll')
            .then(response => {
                if (response.data.isSuccesful) {
                    dispatch(getClientsSuccess(response.data.result))
                } else {
                    dispatch(getClientsError(response.data))
                }
            })
            .catch(error => dispatch(getClientsError(error)))
    }
}

export function saveClientAction(client) {
    return (dispatch) => {
        dispatch(saveClient());

        clientAxios
            .post('/client', client)
            .then(response => {
                if (response.data.isSuccesful) {
                    Swal.fire('Save', 'Client save success', 'success')
                    
                    dispatch(saveClientSuccess(response.data.result));
                } else {
                    dispatch(saveClientError(response.data))
                }
            })
            .catch(error => dispatch(saveClientError(error)));
    };
}

export function editClientAction(client) {
    return (dispatch) => {
        dispatch(editClient());

        clientAxios
            .put('/client', client)
            .then(response => {
                if (response.data.isSuccesful) {
                    Swal.fire('Update', 'Client update success', 'success')
    
                    dispatch(editClientSuccess(response.data));
                } else {
                    dispatch(editClientError(response.data))
                }
            })
            .catch(error => dispatch(editClientError(error)));
    }
}

export function deleteClientAction(nit) {
    return (dispatch) => {
        dispatch(deleteClient());

        clientAxios
            .delete(`/client?nit=${nit}`)
            .then(response => {
                if (response.data.isSuccesful) {
                    Swal.fire('Delete', 'Client delete success', 'success')
                
                    dispatch(deleteClientSuccess(nit));
                } else {
                    dispatch(deleteClienteError(response.data))
                }
            })
            .catch(error => dispatch(deleteClienteError(error)))
    }
}

export function getEditClientAction(nit) {
    return (dispatch) => {
        dispatch(getClient());

        clientAxios
            .get(`/client?nit=${nit}`)
            .then(response => {
                if (response.data.isSuccesful) {
                    dispatch(getClientSuccess(response.data))
                } else {
                    dispatch(getClientError(response.data))
                }
            })
            .catch(error => dispatch(getClientError(error)))
    }
}

// Const for definition actions
export const getClients = () => ({
    type: GET_LIST_CLIENTS
})
export const getClientsSuccess = (clients) => ({
    type: DONWLOAD_CLIENTS_SUCCESS,
    payload: clients
});
export const getClientsError = (error) => ({
    type: DONWLOAD_CLIENTS_ERROR,
    payload: error
});

export const saveClient = () => ({
    type: SET_CLIENT
})
export const saveClientSuccess = (client) => ({
    type: SET_CLIENT_SUCCESS,
    payload: client
});
export const saveClientError = (error) => ({
    type: SET_CLIENT_ERROR,
    payload: error
});

export const deleteClient = () => ({
    type: DELETE_CLIENT
});
export const deleteClientSuccess = (nit) => ({
    type: DELETE_CLIENT_SUCCESS,
    payload: nit
});
export const deleteClienteError = (error) => ({
    type: DELETE_CLIENT_ERROR,
    payload: error
});

export const getClient = () => ({
    type: GET_CLIENT_FOR_EDIT
});
export const getClientSuccess = (client) => ({
    type: GET_CLIENT_FOR_EDIT_SUCCESS,
    payload: client
});
export const getClientError = (error) => ({
    type:GET_CLIENT_FOR_EDIT_ERROR,
    payload: error
});

export const editClient = () => ({
    type: EDIT_CLIENT
});
export const editClientSuccess = (client) => ({
    type: EDIT_CLIENT_SUCCESS,
    payload: client
});
export const editClientError = (error) => ({
    type: EDIT_CLIENT_ERROR,
    payload: error
});

