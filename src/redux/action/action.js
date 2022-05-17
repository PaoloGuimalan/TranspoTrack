import { USER_DETAILS } from "../types/types";

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