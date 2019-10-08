import {
    GET_SALES_REPRESENTATIVE,
    GET_SALES_REPRESENTATIVE_SUCCESS,
    GET_SALES_REPRESENTATIVE_ERROR
} from '../types/Index';
import clientAxios from '../config/clientAxios';

export function getSalesRepresentativeAction() {
    return (dispatch) => {
        dispatch(getSalesRepresentative());

        clientAxios
            .get('SalesRepresetative/GetAll')
            .then(response => {
                if (response.data.isSuccesful) {
                    dispatch(getSalesRepresentativeSuccess(response.data.result));
                } else {
                    dispatch(getSalesRepresentativeError({ message: response.data.messages}));
                }
            })
            .catch(error => dispatch(getSalesRepresentativeError(error)));
    }
}

export const getSalesRepresentative = () => ({
    type: GET_SALES_REPRESENTATIVE
});
export const getSalesRepresentativeSuccess = salesRepresentatives => ({
    type: GET_SALES_REPRESENTATIVE_SUCCESS,
    payload: salesRepresentatives
});
export const getSalesRepresentativeError = error => ({
    type: GET_SALES_REPRESENTATIVE_ERROR,
    payload: error
});