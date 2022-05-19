import { createStore, combineReducers } from 'redux';
import { setcenteren, setcommutertraveldata, setcoords, setdrivertraveldata, setinfotoggle, setinitialPosition, setuserdetails } from '../action/action';

const combiner = combineReducers({
    userdatadetails: setuserdetails,
    initialposition: setinitialPosition,
    coords: setcoords,
    infotoggle: setinfotoggle,
    commutertraveldata: setcommutertraveldata,
    drivertraveldata: setdrivertraveldata,
    centeren: setcenteren
});

const store = createStore(combiner);

export default store;