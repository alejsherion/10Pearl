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

const initialState = {
    clients: [],
    client: null,
    chartInfo: [],
    error: null,
    isSuccessfull: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LIST_CLIENTS:
            return {
                ...state,
                error: null,
                isSuccessfull: false,
                clients: []
            };
        case DONWLOAD_CLIENTS_SUCCESS:
            return {
                ...state,
                error: null,
                clients: action.payload,
            };
        case DONWLOAD_CLIENTS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SET_CLIENT:
            return {
                ...state,
                error: null,
                isSuccessfull: false
            };
        case SET_CLIENT_SUCCESS:
            return {
                ...state,
                error: null,
                clients: [...state.clients, action.payload],
                isSuccessfull : true
            };
        case SET_CLIENT_ERROR:
            return {
                ...state,
                error: action.payload,
                isSuccessfull: false
            };
        case DELETE_CLIENT:
            return {
                ...state,
                error: null,
                isSuccessfull: false
            };
        case DELETE_CLIENT_SUCCESS:
            return {
                ...state,
                error: null,
                clients: [...state.clients.filter(c => c.nit !== action.payload)],
                isSuccessfull: true
            };
        case DELETE_CLIENT_ERROR:
            return {
                ...state,
                error: action.payload,
                isSuccessfull: false
            };
        case GET_CLIENT_FOR_EDIT:
            return {
                ...state,
                client: {}
            };
        case GET_CLIENT_FOR_EDIT_SUCCESS:
            return {
                ...state,
                client: action.payload
            };
        case GET_CLIENT_FOR_EDIT_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case EDIT_CLIENT:
            return {
                ...state,
                isSuccessfull: false,
                error: null
            };
        case EDIT_CLIENT_SUCCESS:
            return {
                ...state,
                client: action.payload,
                isSuccessfull: true
            };
        case EDIT_CLIENT_ERROR:
            return {
                ...state,
                error: action.payload,
                isSuccessfull: false
            };
        case GET_CHART_INFO_CLIENT:
            return {
                ...state,
                isSuccessfull: false,
                error: null
            };
        case GET_CHART_INFO_CLIENT_SUCCESS:
            return {
                ...state,
                chartInfo: action.payload
            };
        case GET_CHART_INFO_CLIENT_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case GET_CHART_INFO_CLIENTS: 
            return {
                ...state
            };
        case GET_CHART_INFO_CLIENTS_SUCCESS: 
            return {
                ...state,
                chartInfo: action.payload
            };
        case GET_CHART_INFO_CLIENTS_ERROR: 
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}