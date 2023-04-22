import React from 'react'
import '../css/Account.css'
import DriverDefaultImg from '../imgs/defaultimg.png'
import { useSelector } from 'react-redux';

function Account() {

  const userDataDetails = useSelector(state => state.userdatadetails);

  const userdatadetailsstate = {
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

  return (
    <div id='div_account_main'>
      <div id='div_driverdefaultimg_holder'>
        <img src={DriverDefaultImg} id='img_driver_default_img' />
      </div>
      <div id='div_personalinfo_container'>
        <p id='p_personalinfo_label'>Account Information</p>
        <div id='div_info_holder'>
          <div className='div_indv_info_holder'>
            <p className='p_indv_info_label'>Name</p>
            <p className='p_ind_info_data'>{userDataDetails.firstName} {userDataDetails.middleName == "N/A"? "" : userDataDetails.middleName} {userDataDetails.lastName}</p>
          </div>
          <div className='div_indv_info_holder'>
            <p className='p_indv_info_label'>Driver ID</p>
            <p className='p_ind_info_data'>{userDataDetails.driverID}</p>
          </div>
          <div className='div_indv_info_holder'>
            <p className='p_indv_info_label'>Company ID</p>
            <p className='p_ind_info_data'>{userDataDetails.companyID}</p>
          </div>
          <div className='div_indv_info_holder'>
            <p className='p_indv_info_label'>Driver's License</p>
            <p className='p_ind_info_data'>{userDataDetails.dlicense}</p>
          </div>
        </div>
        <p id='p_personalinfo_label'>Driver Route</p>
        <div id='div_info_holder'>
          <div className='div_indv_info_holder'>
            <p className='p_indv_info_label'>Route ID</p>
            <p className='p_ind_info_data'>{userDataDetails.routeID}</p>
          </div>
          <div className='div_indv_info_holder'>
            <p className='p_indv_info_label'>Route Name</p>
            <p className='p_ind_info_data'>{userDataDetails.routeName}</p>
          </div>
        </div>
        <p id='p_personalinfo_label'>Bus Assigned</p>
        <div id='div_info_holder'>
          <div className='div_indv_info_holder'>
            <p className='p_indv_info_label'>Bus ID</p>
            <p className='p_ind_info_data'>{userDataDetails.busID}</p>
          </div>
          <div className='div_indv_info_holder'>
            <p className='p_indv_info_label'>Plate Number</p>
            <p className='p_ind_info_data'>{userDataDetails.plateNumber}</p>
          </div>
          <div className='div_indv_info_holder'>
            <p className='p_indv_info_label'>Capacity</p>
            <p className='p_ind_info_data'>{userDataDetails.capacity}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account