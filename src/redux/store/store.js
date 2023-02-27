import { createStore, combineReducers } from 'redux';
import { setbusstopslist, setcenteren, setcommutertraveldata, setcoords, setdriverroute, setdrivertraveldata, setinfotoggle, setinitialPosition, setpostslist, setuserdetails } from '../action/action';

const combiner = combineReducers({
    userdatadetails: setuserdetails,
    initialposition: setinitialPosition,
    coords: setcoords,
    infotoggle: setinfotoggle,
    commutertraveldata: setcommutertraveldata,
    drivertraveldata: setdrivertraveldata,
    centeren: setcenteren,
    postslist: setpostslist,
    busstopslist: setbusstopslist,
    driverroute: setdriverroute
});

const store = createStore(combiner);

export default store;