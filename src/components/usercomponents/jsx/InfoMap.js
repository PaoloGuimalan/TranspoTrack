import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../css/InfoMap.css'
import Axios from 'axios';
import { URL_TWO } from '../../../variables';
import { SET_DRIVER_ROUTE } from '../../../redux/types/types';
import DriverIcon from '../imgs/drivericon.png';
import { motion } from 'framer-motion'

function InfoMap() {

  const userDataDetails = useSelector(state => state.userdatadetails);
  const driverroute = useSelector(state => state.driverroute);
  const dispatch = useDispatch()

  const [targetBusStop, settargetBusStop] = useState("");
  const [distanceBarpercentage, setdistanceBarpercentage] = useState(0)

  useEffect(() => {
    initDriverRoute()
    initIteratordistanceBar()
  },[userDataDetails])

  const initIteratordistanceBar = () => {
    setInterval(() => {
        setdistanceBarpercentage((e) => e + 2)
    },1000)
  }

  const initDriverRoute = () => {
    Axios.get(`${URL_TWO}/getDriverRoutes`, {
        headers: {
            "x-access-tokendriver": localStorage.getItem("tokendriver")
        }
    }).then((response) => {
        if(response.data.status){
            // console.log(response.data.result)
            dispatch({ type: SET_DRIVER_ROUTE, driverroute: response.data.result })
            settargetBusStop(response.data.result.stationList[0].stationID)
        }
        else{
            console.log(response.data.message)
        }
    }).catch((err) => {
        console.log(err);
    })
  }

  return (
    <div id='div_infomap'>
        <div id='div_header_infomap'>
            <p id='p_infomap_label'>Info Map</p>
        </div>
        <div id='div_route_info'>
            <p id='p_route_info_label'><b>Bus ID:</b> {userDataDetails.busID}</p>
            <p id='p_route_info_label'><b>Capacity:</b> {userDataDetails.capacity}</p>
            <p id='p_route_info_label'><b>Current Route:</b> {userDataDetails.routeName}</p>
        </div>
        <div id='div_stationList'>
            {driverroute.stationList.map((st, i) => {
                return(
                    <div className='div_stationIndv' key={st.stationID}>
                        <div className='div_bar_container'>
                            {targetBusStop == st.stationID? (
                                <motion.div
                                initial={{
                                    height: `0%`
                                }}
                                animate={{
                                    height: `${distanceBarpercentage}%`
                                }}
                                id='div_insidebar_iconholder'>
                                    <img src={DriverIcon} id='img_drivericon' />
                                </motion.div>
                            ) : null}
                        </div>
                        <div className='div_stationInfo_container'>
                            <div className='div_stationInside_container' onClick={() => { settargetBusStop(st.stationID) }}>
                                <p id='p_stationName'>{st.stationName}</p>
                                <p id='p_stationName'>{st.stationID}</p>
                                <div className='flexed_div'/>
                                <p id='p_waitingNumber'><b>Waiting Commuters:</b> 0</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default InfoMap