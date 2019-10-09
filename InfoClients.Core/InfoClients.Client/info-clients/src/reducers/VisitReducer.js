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

const initialState = {
    visits: [],
    error: null,
    isSuccessful: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_VISIT:
            return {
                ...state,
                error: null,
                isSuccessful: false
            };
        case SAVE_VISIT_SUCCESS:
            return {
                ...state,
                isSuccessful: true,
                visits: [...state.visits, action.payload]
            };
        case SAVE_VISIT_ERROR:
            return {
                ...state,
                isSuccessful: false,
                error: action.payload
            };
        case GET_VISIT_BY_CLIENT:
            return {
                ...state,
                isSuccessful: false,
                error: null
            }
        case GET_VISIT_BY_CLIENT_SUCCESS:
            return {
                ...state,
                visits: action.payload
            }
        case GET_VISIT_BY_CLIENT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case GET_ALL_VISITS:
            return {
                ...state,
                isSuccessful: false
            };
        case GET_ALL_VISITS_SUCCESS:
            return {
                ...state,
                visits: action.payload
            };
        case GET_ALL_VISITS_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return {
                ...state
            };
    }
}