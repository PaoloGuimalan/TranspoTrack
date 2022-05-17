import { createStore, combineReducers } from 'redux';
import { setcoords, setinitialPosition, setuserdetails } from '../action/action';

const combiner = combineReducers({
    userdatadetails: setuserdetails,
    initialposition: setinitialPosition,
    coords: setcoords
});

const store = createStore(combiner);

export default store;