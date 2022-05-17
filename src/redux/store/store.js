import { createStore, combineReducers } from 'redux';
import { setuserdetails } from '../action/action';

const combiner = combineReducers({
    userdatadetails: setuserdetails
});

const store = createStore(combiner);

export default store;