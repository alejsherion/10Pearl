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
    EDIT_CLIENT_ERROR,
    GET_CHART_INFO_CLIENT,
    GET_CHART_INFO_CLIENT_SUCCESS,
    GET_CHART_INFO_CLIENT_ERROR,
    GET_CHART_INFO_CLIENTS,
    GET_CHART_INFO_CLIENTS_SUCCESS,
    GET_CHART_INFO_CLIENTS_ERROR
} from '../types/Index';

import clientAxios from '../config/clientAxios';
import notify from 'devextreme/ui/notify';

export function getClientsAction() {
    return (dispatch) => {
        dispatch(getClients());

        clientAxios
            .get('/Client/GetAll')
            .then(response => {
                if (response.data.isSuccesful) {
                    dispatch(getClientsSuccess(response.data.result))
                } else {
                    dispatch(getClientsError({ message: response.data.messages}))
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
                    notify('Client save success', 'success', 1000)
                    
                    dispatch(saveClientSuccess(response.data.result));
                } else {
                    dispatch(saveClientError({ message: response.data.messages}))
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
                    notify('Client update success', 'success', 1000)

                    dispatch(editClientSuccess(response.data));
                } else {
                    dispatch(editClientError({ message: response.data.messages}))
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
                    notify('Client delete success', 'success', 1000)
                
                    dispatch(deleteClientSuccess(nit));
                } else {
                    dispatch(deleteClienteError({ message: response.data.messages}))
                }
            })
            .catch(error => dispatch(deleteClienteError(error)))
    }
}

export function getEditClientAction(nit) {
    return (dispatch) => {
        dispatch(getClient());

        clientAxios
            .get(`/client/get?nit=${nit}`)
            .then(response => {
                if (response.data.isSuccesful) {
                    dispatch(getClientSuccess(response.data.result))
                } else {
                    dispatch(getClientError({ message: response.data.messages}))
                }
            })
            .catch(error => dispatch(getClientError(error)))
    }
}

export function getChartInfoClientsAction() {
    return (dispatch) => {
        dispatch(getChartInfoClients());

        clientAxios
            .get('client/GetCliensCharts')
            .then(response => {
                if (response.data.isSuccesful) {
                    dispatch(getChartInfoClientsSuccess(response.data.result))
                } else {
                    dispatch(getChartInfoClientsError({message: response.data.messages}));
                }
            })
            .catch(error => dispatch(getChartInfoClients(error)));
    };
}

export function getChartInfoClientAction(nit) {
    return (dispatch) => {
        dispatch(getCharInfoClient());

        clientAxios
            .get(`Client/GetClientChar?nit=${nit}`)
            .then(response => {
                if (response.data.isSuccesful) {
                    dispatch(getCharInfoClientSuccess(response.data.result));
                } else {
                    dispatch(getCharInfoClientError({ message: response.data.messages }))
                }
            })
            .catch(error => dispatch(getCharInfoClientError(error)))
    };
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
export const getCharInfoClient = () => ({
    type: GET_CHART_INFO_CLIENT
});
export const getCharInfoClientSuccess = (chartInfo) => ({
    type: GET_CHART_INFO_CLIENT_SUCCESS,
    payload: chartInfo
})
export const getCharInfoClientError = error => ({
    type: GET_CHART_INFO_CLIENT_ERROR,
    error: error
});
export const getChartInfoClients = () => ({
    type: GET_CHART_INFO_CLIENTS
});
export const getChartInfoClientsSuccess = chartInfo => ({
    type: GET_CHART_INFO_CLIENTS_SUCCESS,
    payload: chartInfo
});
export const getChartInfoClientsError = error => ({
    type: GET_CHART_INFO_CLIENTS_ERROR,
    payload: error
});