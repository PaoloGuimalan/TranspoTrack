import { createStore, combineReducers } from 'redux';
import { setbusstopslist, setcenteren, setcommutertraveldata, setcoords, setdriverdestination, setdriverroute, setdrivertraveldata, setinfotoggle, setinitialPosition, setlivebuslist, setneonassistantstatus, setpostslist, setuserdetails } from '../action/action';

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
    driverroute: setdriverroute,
    driverdestination: setdriverdestination,
    neonassistantstatus: setneonassistantstatus,
    livebuslist: setlivebuslist
});

const store = createStore(combiner);

export default store;