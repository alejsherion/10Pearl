import {
    GET_SALES_REPRESENTATIVE,
    GET_SALES_REPRESENTATIVE_ERROR,
    GET_SALES_REPRESENTATIVE_SUCCESS
} from '../types/Index';

const initialState = {
    salesRepresentatives: [],
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SALES_REPRESENTATIVE:
            return {
                ...state,
                error: null
            };
        case GET_SALES_REPRESENTATIVE_SUCCESS:
            return {
                ...state,
                salesRepresentatives: action.payload
            };
        case GET_SALES_REPRESENTATIVE_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}

