import { SET_BUS_STOPS_LIST, SET_CENTER_EN, SET_COMMUTER_TRAVEL_DATA, SET_COORDS, SET_DRIVER_DESTINATION, SET_DRIVER_ROUTE, SET_DRIVER_TRAVEL_DATA, SET_INFO_TOGGLE, SET_INTITIAL_POSITION, SET_LIVE_BUS_LIST, SET_NEON_ASSISTANT_STATUS, SET_POSTS_LIST, USER_DETAILS } from "../types/types";

export const userdatadetailsstate = {
    busID: "",
    busModel: "",
    capacity: "",
    companyID: "",
    dlicense: "",
    driverID: "",
    firstName: "",
    lastName: "",
    locationSharing: false,
    middleName: "",
    plateNumber: "",
    privacy: true,
    routeID: "",
    routeName: "",
    status: false,
    userID: "",
    userType: ""
}

export const setuserdetails = (state = userdatadetailsstate, action) => {
    switch(action.type){
        case USER_DETAILS:
            return action.userdatadetails;
        default:
            return state;
    }
}

export const setinitialPosition = (state = { lat: "", lng: "" }, action) => {
    switch(action.type){
        case SET_INTITIAL_POSITION:
            return action.initialposition;
        default:
            return state;
    }
}

export const setcoords = (state = { lat: "", lng: "" }, action) => {
    switch(action.type){
        case SET_COORDS:
            return action.coords;
        default:
            return state;
    }
}

export const setinfotoggle = (state = false, action) => {
    switch(action.type){
        case SET_INFO_TOGGLE:
            return action.infotoggle;
        default:
            return state;
    }
}

const commutertraveldatastate = {
    userID: "",
    userType: "",
    destination: ""
}

const drivertraveldatastate = {
    userID: "",
    userType: "",
    destination: "",
    destination_one: "",
    destination_two: "",
    vehicle: ""
}

export const setcommutertraveldata = (state = commutertraveldatastate, action) => {
    switch(action.type){
        case SET_COMMUTER_TRAVEL_DATA:
            return action.commutertraveldata;
        default:
            return state;
    }
}

export const setdrivertraveldata = (state = drivertraveldatastate, action) => {
    switch(action.type){
        case SET_DRIVER_TRAVEL_DATA:
            return action.drivertraveldata;
        default:
            return state;
    }
}

export const setcenteren = (state = false, action) => {
    switch(action.type){
        case SET_CENTER_EN:
            return action.centeren;
        default:
            return state;
    }
}

export const setpostslist = (state = [], action) => {
    switch(action.type){
        case SET_POSTS_LIST:
            return action.postslist;
        default:
            return state;
    }
}

export const setbusstopslist = (state = [], action) => {
    switch(action.type){
        case SET_BUS_STOPS_LIST:
            return action.busstopslist;
        default:
            return state;
    }
}

export const driverroutestate = {
    routeID: "",
    routeName: "",
    stationList: [],
    routePath: [],
    dateAdded: "",
    addedBy: "",
    companyID: "",
    privacy: null,
    status: null,
}

export const setdriverroute = (state = driverroutestate, action) => {
    switch(action.type){
        case SET_DRIVER_ROUTE:
            return action.driverroute;
        default:
            return state;
    }
}

export const driverdestinationstate = {
    stationID: "",
    stationName: "",
    index: 0
}

export const setdriverdestination = (state = driverdestinationstate, action) => {
    switch(action.type){
        case SET_DRIVER_DESTINATION:
            return action.driverdestination;
        default:
            return state;
    }
}

export const setneonassistantstatus = (state = false, action) => {
    switch(action.type){
        case SET_NEON_ASSISTANT_STATUS:
            return action.neonassistantstatus;
        default:
            return state;
    }
}

export const setlivebuslist = (state = [], action) => {
    switch(action.type){
        case SET_LIVE_BUS_LIST:
            return action.livebuslist;
        default:
            return state;
    }
}