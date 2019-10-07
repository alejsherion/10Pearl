import { combineReducers } from 'redux';
import ClientsReducer from './ClientsReducer';
import VisitsReducer from './VisitReducer';

// Reducers
export default combineReducers({
    clients: ClientsReducer,
    visits: VisitsReducer
});