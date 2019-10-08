import { combineReducers } from 'redux';
import ClientsReducer from './ClientsReducer';
import VisitsReducer from './VisitReducer';
import SalesRepresentative from './SalesRepresentativeReducer';

// Reducers
export default combineReducers({
    clients: ClientsReducer,
    visits: VisitsReducer,
    salesRepresentative: SalesRepresentative
});