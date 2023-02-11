import { SET_CENTER_EN, SET_COMMUTER_TRAVEL_DATA, SET_COORDS, SET_DRIVER_TRAVEL_DATA, SET_INFO_TOGGLE, SET_INTITIAL_POSITION, USER_DETAILS } from "../types/types";

export const userdatadetailsstate = {
    userID: '',
    userType: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNumber: '',
    email: ''
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