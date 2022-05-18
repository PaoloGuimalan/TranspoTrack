import { createStore, combineReducers } from 'redux';
import { setcommutertraveldata, setcoords, setdrivertraveldata, setinfotoggle, setinitialPosition, setuserdetails } from '../action/action';

const combiner = combineReducers({
    userdatadetails: setuserdetails,
    initialposition: setinitialPosition,
    coords: setcoords,
    infotoggle: setinfotoggle,
    commutertraveldata: setcommutertraveldata,
    drivertraveldata: setdrivertraveldata
});

const store = createStore(combiner);

export default store;