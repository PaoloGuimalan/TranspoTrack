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
  const coords = useSelector(state => state.coords);
  const dispatch = useDispatch()

  const [targetBusStop, settargetBusStop] = useState("");
  const [distanceBarpercentage, setdistanceBarpercentage] = useState(0)

  useEffect(() => {
    initDriverRoute()
    initIteratordistanceBar()
  },[userDataDetails])

  const initIteratordistanceBar = () => {
    setInterval(() => {
        // setdistanceBarpercentage((e) => e + 2)
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
            settargetBusStop(`${response.data.result.stationList[0].stationID}_0`)
        }
        else{
            console.log(response.data.message)
        }
    }).catch((err) => {
        console.log(err);
    })
  }

  const computeDistanceStops = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = parseFloat(lat1) * Math.PI/180;
    const φ2 = parseFloat(lat2) * Math.PI/180;
    const Δφ = (parseFloat(lat2) - parseFloat(lat1)) * Math.PI/180;
    const Δλ = (parseFloat(lon2) - parseFloat(lon1)) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c;

    // console.log(previousStation)

    return d;
  }

  const computeDistance = (lat1, lon1, lat2, lon2, index) => {
    const R = 6371e3;
    const φ1 = parseFloat(lat1) * Math.PI/180;
    const φ2 = parseFloat(lat2) * Math.PI/180;
    const Δφ = (parseFloat(lat2) - parseFloat(lat1)) * Math.PI/180;
    const Δλ = (parseFloat(lon2) - parseFloat(lon1)) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c;

    const previousStation = index == 0? driverroute.stationList[0] : driverroute.stationList[index - 1]
    const prevStationLat = previousStation.coordinates[1];
    const previousStationLng = previousStation.coordinates[0];
    const distanceOfPrevAndCurStop = computeDistanceStops(lat1, lon1, prevStationLat, previousStationLng);
    const finalPercentage = 100 - (distanceOfPrevAndCurStop / d * 100) < 0? 0 : 100 - (distanceOfPrevAndCurStop / d * 100)

    // console.log(100 - (distanceOfPrevAndCurStop / d * 100))

    return finalPercentage;
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
                    <div className='div_stationIndv' key={`${st.stationID}_${i}`}>
                        <div className='div_bar_container'>
                            {targetBusStop == `${st.stationID}_${i}`? (
                                <motion.div
                                initial={{
                                    height: `0%`,
                                    backgroundColor: "orange"
                                }}
                                animate={{
                                    height: `${computeDistance(st.coordinates[1], st.coordinates[0],coords.lat, coords.lng, i)}%`
                                }}
                                id='div_insidebar_iconholder'>
                                    <img src={DriverIcon} id='img_drivericon' />
                                </motion.div>
                            ) : null}
                        </div>
                        <div className='div_stationInfo_container'>
                            <motion.div
                            initial={{
                                backgroundColor: "orange"
                            }}
                            className='div_stationInside_container' onClick={() => { settargetBusStop(`${st.stationID}_${i}`) }}>
                                <p id='p_stationName'>{st.stationName}</p>
                                <p id='p_stationName'>{st.stationID}</p>
                                <div className='flexed_div'/>
                                <p id='p_waitingNumber'><b>Waiting Commuters:</b> 0</p>
                            </motion.div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default InfoMap