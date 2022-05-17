import { SET_COORDS, SET_INTITIAL_POSITION, USER_DETAILS } from "../types/types";

const userdatadetailsstate = {
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