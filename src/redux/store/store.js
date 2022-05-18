import { createStore, combineReducers } from 'redux';
import { setcoords, setinfotoggle, setinitialPosition, setuserdetails } from '../action/action';

const combiner = combineReducers({
    userdatadetails: setuserdetails,
    initialposition: setinitialPosition,
    coords: setcoords,
    infotoggle: setinfotoggle
});

const store = createStore(combiner);

export default store;