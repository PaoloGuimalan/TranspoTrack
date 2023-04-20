import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../css/InfoMap.css'
import Axios from 'axios';
import { URL_TWO } from '../../../variables';
import { SET_DRIVER_DESTINATION, SET_DRIVER_ROUTE } from '../../../redux/types/types';
import DriverIconOld from '../imgs/drivericon.png';
import DriverIcon from '../imgs/livebus.png';
import { motion } from 'framer-motion'
import BusIcon from '@material-ui/icons/DirectionsBus'
import CommutersIcon from '@material-ui/icons/PeopleAltRounded'

function InfoMap() {

  const userDataDetails = useSelector(state => state.userdatadetails);
  const driverroute = useSelector(state => state.driverroute);
  const coords = useSelector(state => state.coords);
  const driverdestination = useSelector(state => state.driverdestination)
  const dispatch = useDispatch()

  const [targetBusStop, settargetBusStop] = useState("");
  const [distanceBarpercentage, setdistanceBarpercentage] = useState(0)
  const [waitingList, setwaitingList] = useState([])

  const [expandDMDW, setexpandDMDW] = useState(false)

  useEffect(() => {
    // initDriverRoute()
    // initIteratordistanceBar()
  },[userDataDetails])

  useEffect(() => {
    initWaitingCount()

    return () => {
        initWaitingCount = () => {  }
    }
  },[])

  const initIteratordistanceBar = () => {
    setInterval(() => {
        // setdistanceBarpercentage((e) => e + 2)
    },1000)
  }

  const setDriverDestinationDispatch = (stationIDDispatch, stationNameDispatch, indexDispatch) => {
    dispatch({type: SET_DRIVER_DESTINATION, driverdestination: {
        stationID: stationIDDispatch,
        stationName: stationNameDispatch,
        index: indexDispatch
    }})
  }

//   const initDriverRoute = () => {
//     Axios.get(`${URL_TWO}/getDriverRoutes`, {
//         headers: {
//             "x-access-tokendriver": localStorage.getItem("tokendriver")
//         }
//     }).then((response) => {
//         if(response.data.status){
//             // console.log(response.data.result)
//             dispatch({ type: SET_DRIVER_ROUTE, driverroute: response.data.result })
//             settargetBusStop(`${response.data.result.stationList[0].stationID}_0`)
//         }
//         else{
//             console.log(response.data.message)
//         }
//     }).catch((err) => {
//         console.log(err);
//     })
//   }

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

    // console.log(d)

    return finalPercentage;
  }

  var initWaitingCount = () => {
    Axios.get(`${URL_TWO}/getWaitingCount`, {
        headers:{
            "x-access-tokendriver": localStorage.getItem("tokendriver")
        }
    }).then((response) => {
        if(response.data.status){
            // console.log(response.data.result)
            setwaitingList(response.data.result)
        }
        else{
            console.log(response.data.message)
        }
        setTimeout(() => {
            initWaitingCount()
        },30000)
    }).catch((err) => {
        console.log(err)
        setTimeout(() => {
            initWaitingCount()
        },30000)
    })
  }

  return (
    <div id='div_infomap'>
        <motion.div id='div_driver_mapdetails_window'
            animate={{
            top: expandDMDW? "60%" : "92%"
            }}
            transition={{
            bounce: 0,
            duration: 0.1
            }}
        >
            <div id='div_draggable_bar_container'>
                <div id='div_draggable_bar_hold' onClick={() => {
                    setexpandDMDW(!expandDMDW)
                }}></div>
            </div>
        </motion.div>
        <div id='div_header_infomap'>
            {/* <p id='p_infomap_label'>Info Map</p> */}
        </div>
        <div id='div_route_info'>
            <p className='p_route_info_label'>{userDataDetails.routeName}</p>
            <p className='p_route_info_label'>From: {driverdestination.stationID} | {driverdestination.stationName}</p>
            <p className='p_route_info_label'>Bus ID: {userDataDetails.busID}</p>
            <p className='p_route_info_label'>Capacity: {userDataDetails.capacity}</p>
        </div>
        <div id='div_stationList'>
            {driverroute.stationList.map((st, i) => {
                return(
                    <div className='div_stationIndv' key={`${st.stationID}_${i}`}>
                        <div className='div_bar_container'>
                            {driverdestination.stationID == `${st.stationID}`? (
                                driverdestination.index == i? (
                                    <motion.div
                                    initial={{
                                        height: `0%`,
                                        backgroundColor: "#2B4273"
                                    }}
                                    animate={{
                                        height: `${computeDistance(st.coordinates[1], st.coordinates[0],coords.lat, coords.lng, i)}%`
                                    }}
                                    id='div_insidebar_iconholder'>
                                        <img src={DriverIcon} id='img_drivericon' />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                    initial={{
                                        height: `0%`,
                                        backgroundColor: "#2B4273"
                                    }}
                                    animate={{
                                        height: driverdestination.index > i? "100%" : "0%"
                                    }}
                                    transition={{
                                        duration: 0
                                    }}
                                    id='div_insidebar_iconholder'>
                                    </motion.div>
                                )
                            ) : (
                                <motion.div
                                initial={{
                                    height: `0%`,
                                    backgroundColor: "#2B4273"
                                }}
                                animate={{
                                    height: driverdestination.index > i? "100%" : "0%"
                                }}
                                transition={{
                                    duration: 0
                                }}
                                id='div_insidebar_iconholder'>
                                </motion.div>
                            )}
                        </div>
                        <div className='div_stationInfo_container'>
                            <motion.div
                            initial={{
                                backgroundColor: "#404040",
                                color: driverdestination.stationID == `${st.stationID}`? driverdestination.index == i? "white" : "#272727" : "#272727"
                            }}
                            animate={{
                                backgroundColor: driverdestination.stationID == `${st.stationID}`? driverdestination.index == i? "#2B4273" : "#B7B7B7" : "#B7B7B7",
                                color: driverdestination.stationID == `${st.stationID}`? driverdestination.index == i? "white" : "#272727" : "#272727"
                            }}
                            className='div_stationInside_container' onClick={() => { 
                                // settargetBusStop(`${st.stationID}_${i}`)
                                setDriverDestinationDispatch(st.stationID, st.stationName, i) 
                            }}>
                                <div id='div_stationHeader_icon'>
                                    <BusIcon style={{fontSize: "25px"}} />
                                    <div>
                                        <p id='p_stationName'>{st.stationName}</p>
                                        <p id='p_stationName'>{st.stationID}</p>
                                    </div>
                                </div>
                                <div className='flexed_div'/>
                                {/* <motion.p
                                animate={{
                                    color: driverdestination.stationID == `${st.stationID}`? driverdestination.index == i? "white" : "#272727" : "#272727"
                                }}
                                id='p_waitingNumber'><b>Waiting Commuters:</b> {
                                    JSON.stringify(waitingList.filter((cnt, i) => cnt._id == st.stationID)[0]?.count? waitingList.filter((cnt, i) => cnt._id == st.stationID)[0]?.count : 0)
                                }</motion.p> */}
                                <div id='div_stationHeader_icon'>
                                    <CommutersIcon style={{fontSize: "25px"}} />
                                    <div>
                                        <motion.p
                                        animate={{
                                            color: driverdestination.stationID == `${st.stationID}`? driverdestination.index == i? "white" : "#272727" : "#272727"
                                        }}
                                        id='p_waitingNumber'>{
                                            JSON.stringify(waitingList.filter((cnt, i) => cnt._id == st.stationID)[0]?.count? waitingList.filter((cnt, i) => cnt._id == st.stationID)[0]?.count : 0)
                                        } waiting commuter/s</motion.p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )
            })}
        </div>
        {/* <div id='div_headway_container'>
            <div id="div_headway_label">
                <p id='p_headway_label'>Headway</p>
            </div>
            <div id='div_headway_content'>
                <p id='p_route_info_label'><b>Front Distance:</b> Bus ID | Distance</p>
                <p id='p_route_info_label'><b>Rear Distance:</b> Bus ID | Distance</p>
            </div>
        </div> */}
    </div>
  )
}

export default InfoMap