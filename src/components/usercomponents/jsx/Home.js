import React, { useState, useEffect } from 'react'
import '../css/Home.css';
import Axios from 'axios';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, Circle, InfoWindow, Polyline, Polygon } from 'react-google-maps'
import Toggle from '@material-ui/icons/Menu'
import Minimize from '@material-ui/icons/ArrowLeft'
import { motion } from 'framer-motion';
import HomeToggle from '@material-ui/icons/HomeOutlined'
import LogoutToggle from '@material-ui/icons/ExitToApp'
import AccountToggle from '@material-ui/icons/PersonOutline'
import AvRoutesToggle from '@material-ui/icons/Directions'
import InfoToggleOn from '@material-ui/icons/Label'
import InfoToggle from '@material-ui/icons/LabelOutlined'
import CenterOn from '@material-ui/icons/CenterFocusStrong'
import InfoMapIcon from '@material-ui/icons/AccountTreeOutlined'
import { Link, useNavigate, Routes, Route, useParams, useLocation } from 'react-router-dom';
import CommuterIcon from '../imgs/commutericon.png';
import DriverIconOld from '../imgs/drivericon.png';
import DriverIcon from '../imgs/livebus.png';
import { logoutSocket, returnValueArray, socketIdentifier } from '../../../socket/socket';
import { URL_TWO } from '../../../variables';
import { useDispatch, useSelector } from 'react-redux';
import { SET_BUS_STOPS_LIST, SET_CENTER_EN, SET_COMMUTER_TRAVEL_DATA, SET_COORDS, SET_DRIVER_DESTINATION, SET_DRIVER_ROUTE, SET_DRIVER_TRAVEL_DATA, SET_INFO_TOGGLE, SET_INTITIAL_POSITION, SET_LIVE_BUS_LIST, SET_NEON_ASSISTANT_STATUS, USER_DETAILS } from '../../../redux/types/types';
import RoutesConfig from './RoutesConfig';
import Account from './Account';
import { userdatadetailsstate } from '../../../redux/action/action';
import Feed from './Feed';
import MapIcon from '@material-ui/icons/MapOutlined'
import APIIcon from '@material-ui/icons/Assistant'
import OpennedIcon from '../imgs/DriverRouteStations.png'
import CurrentStopIcon from '../imgs/DriverRouteStations_current.png'
import InfoMap from './InfoMap';
import QCPath from '../../../resources/json/cityboundary.json'
import DriverDefaultImg from '../imgs/defaultimg.png'
import LoadingIcon from '@material-ui/icons/SyncOutlined'
import PrevIcon from '@material-ui/icons/ArrowBackRounded'
import NextIcon from '@material-ui/icons/ArrowForwardRounded'

function Map(){

  // const [coords, setcoords] = useState({ lat: "", lng: "" });
  // const [initialPosition, setinitialPosition] = useState({ lat: "", lng: "" });

  const google = window.google;

  //NEED TO BE MOVED TO HOME MAIN COMPONENT AND ACCESS DATA THROUGH REDUX
  
  // const [userDataDetails, setuserDataDetails] = useState({
  //   userID: '',
  //   userType: '',
  //   firstName: '',
  //   middleName: '',
  //   lastName: '',
  //   mobileNumber: '',
  //   email: ''
  // });

  const dispatch = useDispatch();
  const initialPosition = useSelector(state => state.initialposition);
  const coords = useSelector(state => state.coords);
  const infotoggle = useSelector(state => state.infotoggle);
  const userDataDetails = useSelector(state => state.userdatadetails);
  const busstopslist = useSelector(state => state.busstopslist)
  const driverroute = useSelector(state => state.driverroute);
  const driverdestination = useSelector(state => state.driverdestination)

  const [livelist, setlivelist] = useState([]);
  const [selectedMarker, setselectedMarker] = useState("")
  const [waitingList, setwaitingList] = useState([])

  const commuter = localStorage.getItem('tokencommuter');
  const driver = localStorage.getItem('tokendriver');

  useEffect(() => {
    initWaitingCount()

    return () => {
        initWaitingCount = () => {  }
    }
  },[])

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

  useEffect(() => {
    setInterval(() => {
      // console.log(returnValueArray());
      setlivelist(returnValueArray());
    }, 1000);
  }, [])

  // useEffect(() => {
  //   if((commuter != "" || commuter != null) && (driver == "" || driver == null)){
  //       Axios.get(`https://${URL_TWO}/userData`, {
  //         headers:{
  //           "x-access-tokencommuter": localStorage.getItem('tokencommuter')
  //         }
  //       }).then((response) => {
  //         // console.log(response.data);
  //         // setuserDataDetails(response.data);
  //         dispatch({type: USER_DETAILS, userdatadetails: response.data})
  //       }).catch((err) => {
  //         console.log(err);
  //       })
  //   }
  //   else if((commuter == "" || commuter == null) && (driver != "" || driver != null)){
  //     Axios.get(`https://${URL_TWO}/userData`, {
  //       headers:{
  //         "x-access-tokendriver": localStorage.getItem('tokendriver')
  //       }
  //     }).then((response) => {
  //       // console.log(response.data);
  //       // setuserDataDetails(response.data);
  //       dispatch({type: USER_DETAILS, userdatadetails: response.data})
  //     }).catch((err) => {
  //       console.log(err);
  //     })
  //   }
  // }, [driver, commuter])

  // useEffect(() => {
  //   setInterval(() => {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setinitialPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
  //       setcoords({ lat: position.coords.latitude, lng: position.coords.longitude })
  //       // console.log({ lat: position.coords.latitude, lng: position.coords.longitude });
  //       socketIdentifier({
  //         userID: userDataDetails.userID,
  //         userType: userDataDetails.userType,
  //         address: "Commonwealth, Quezon City",
  //         destination: "Lagro",
  //         coordinates: { lat: position.coords.latitude, lng: position.coords.longitude }
  //       }, userDataDetails.userType)
  //     })
  //   }, 1500);
  // }, [userDataDetails]);

  // useEffect(() => {
  //   navigator.geolocation.watchPosition((position) => {
  //     // console.log(position.coords.latitude);
  //     setcoords({ lat: position.coords.latitude, lng: position.coords.longitude })
  //     console.log({ lat: position.coords.latitude, lng: position.coords.longitude })
  //   })
  // }, [coords]);

  return(
      <>
        {initialPosition.lat != "" && initialPosition.lng != ""? (
          <GoogleMap 
            defaultZoom={17} 
            defaultCenter={initialPosition}
            // center={coords}
            options={{
              gestureHandling:'greedy',
              zoomControlOptions: { position: 3 },
              streetViewControl:false,
              fullscreenControl:true,
              labels: true,
              // mapTypeId: google.maps.MapTypeId.HYBRID
              mapTypeId: 'satellite' //roadmap, satellite, terrain, hybrid
            }}
          >
            <Polygon
              draggable={false}
              editable={false}
              paths={[QCPath.coordinates[0][0], QCPath.coordinates[0][0]]}
              options={{
                fillColor: "transparent",
                strokeColor: "orange"
              }}
            />
            <Marker 
              title='Your Location'
              position={coords} 
              icon={{
                url: userDataDetails.userType == "Commuter"? CommuterIcon : DriverIcon,
                anchor: new google.maps.Point(13, 15),
                scaledSize: userDataDetails.userType == "Commuter"? new google.maps.Size(25, 27) : new google.maps.Size(27, 27),
              }}  
            />
            <Circle
              center={coords} 
              radius={100}
              options={{
                strokeColor: userDataDetails.userType == "Commuter"? "lime" : "#ff914d"
              }}
            />
            {livelist.map((ls) => {
              return(
                userDataDetails.userID != ls.userID? userDataDetails.userType != ls.userType? (
                  <>
                    <Marker 
                      key={ls.userID}
                      title={ls.userID}
                      position={ls.coordinates} 
                      icon={{
                        url: ls.userType == "Commuter"? CommuterIcon : DriverIcon,
                        anchor: new google.maps.Point(13, 15),
                        scaledSize: ls.userType == "Commuter"? new google.maps.Size(25, 27) : new google.maps.Size(27, 27),
                      }}  
                    />
                    {infotoggle? (
                    <InfoWindow position={ls.coordinates} options={{disableAutoPan: true}}>
                      <nav className='infowindow_user'>
                        <li>
                          <p className='p_labels'><b>{ls.userType == "Commuter"? "Commuter:" : "Driver:"}</b> {ls.userID}</p>
                        </li>
                        <motion.li
                        animate={{
                          display: ls.userType == "Driver"? "block" : "none"
                        }}
                        >
                          <p className='p_labels'><b>Route: </b> {ls.route == " - "? "...loading" : ls.route}</p>
                        </motion.li>
                        <motion.li
                        animate={{
                          display: ls.userType == "Driver"? "block" : "none"
                        }}
                        >
                          <p className='p_labels'><b>Vehicle: </b> {ls.vehicle == ""? "...loading" : ls.vehicle}</p>
                        </motion.li>
                        <li>
                          <p className='p_labels'><b>Destination: </b> {ls.destination == ""? "...loading" : ls.destination}</p>
                        </li>
                      </nav>
                    </InfoWindow>) : ""}
                  </>
                ) : "" : ""
              )
            })}
            {/* {busstopslist.map((data, i) => {
              return(
                <Marker
                  icon={{
                    url: OpennedIcon,
                    anchor: new google.maps.Point(25, 25),
                    scaledSize: new google.maps.Size(25, 25),
                  }}
                  onClick={() => { 
                    // dispatch({ type: SET_SELECTED_MARKER, selectedmarker: data.busStopID }) 
                  }}
                  key={i}
                  position={{lat: parseFloat(data.coordinates.latitude), lng: parseFloat(data.coordinates.longitude)}}
                >
                  
                </Marker>
              )
            })} */}
            {driverroute.stationList.map((data, i) => {
              if(data.stationID == selectedMarker){
                return(
                  <InfoWindow
                  onCloseClick={() => {
                    setselectedMarker("")
                  }}
                  position={{lat: parseFloat(data.coordinates[1]), lng: parseFloat(data.coordinates[0])}} options={{disableAutoPan: true}}>
                    <div id='div_infowindow_station_details'>
                      <p className='p_station_details'>{data.stationID} {driverdestination.stationID == data.stationID? driverdestination.index == i? "(Current/Previous Station)" : "" : ""}</p>
                      <p className='p_station_details'>{data.stationName}</p>
                      <p className='p_station_details'>Waiting Commuters: {JSON.stringify(waitingList.filter((cnt, i) => cnt._id == data.stationID)[0]?.count? waitingList.filter((cnt, i) => cnt._id == data.stationID)[0]?.count : 0)}</p>
                    </div>
                  </InfoWindow>
                )
              }
            })}
            {driverroute.stationList.map((data, i) => {
              return(
                <Marker
                  icon={{
                    url: driverdestination.stationID == data.stationID? driverdestination.index == i? CurrentStopIcon : OpennedIcon : OpennedIcon,
                    anchor: new google.maps.Point(12, 0),
                    scaledSize: new google.maps.Size(25, 25),
                  }}
                  onClick={() => { 
                    setselectedMarker(data.stationID) 
                  }}
                  key={i}
                  position={{lat: parseFloat(data.coordinates[1]), lng: parseFloat(data.coordinates[0])}}
                >
                  
                </Marker>
              )
            })}
            {driverroute != null? (
              <Polyline
                draggable={false}
                editable={false}
                path={driverroute.routePath}
                options={{
                  fillColor: "transparent",
                  strokeColor: "lime",
                  strokeWeight: 4
                }}
              />
            ) : null}
          </GoogleMap>
        ) : ""}
      </>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const MapRoute = () => {

  const userDataDetails = useSelector(state => state.userdatadetails);
  const driverdestination = useSelector(state => state.driverdestination)
  const driverroute = useSelector(state => state.driverroute);
  const coords = useSelector(state => state.coords);

  const commutertraveldata = useSelector(state => state.commutertraveldata);
  const alltraveldata = useSelector(state => state.drivertraveldata);

  const [loaderInMap, setloaderInMap] = useState(false);
  const [expandDMDW, setexpandDMDW] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    // console.log(driverroute.stationList.filter((sn, i) => sn.stationID == driverdestination.stationID && i == driverdestination.index))
  },[])

  const NextStationAction = () => {
    // alert("Next")
    if(driverdestination.index == driverroute.stationList.length - 1){
      dispatch({type: SET_DRIVER_DESTINATION, driverdestination: {
        stationID: driverroute.stationList[0].stationID,
        stationName: driverroute.stationList[0].stationName,
        index: 0
      }})
    }
    else{
      dispatch({type: SET_DRIVER_DESTINATION, driverdestination: {
        stationID: driverroute.stationList[driverdestination.index + 1].stationID,
        stationName: driverroute.stationList[driverdestination.index + 1].stationName,
        index: driverdestination.index + 1
      }})
    }
  }

  const PrevStationAction = () => {
    // alert("Prev")
    if(driverdestination.index == 0){
      dispatch({type: SET_DRIVER_DESTINATION, driverdestination: {
        stationID: driverroute.stationList[driverroute.stationList.length - 1].stationID,
        stationName: driverroute.stationList[driverroute.stationList.length - 1].stationName,
        index: driverroute.stationList.length - 1
      }})
    }
    else{
      dispatch({type: SET_DRIVER_DESTINATION, driverdestination: {
        stationID: driverroute.stationList[driverdestination.index - 1].stationID,
        stationName: driverroute.stationList[driverdestination.index - 1].stationName,
        index: driverdestination.index - 1
      }})
    }
  }

  return(
    <div style={{ width: "100%", height: "calc(100% - 50px)"}}>
      <motion.div id='div_driver_mapdetails_window'
        animate={{
          top: expandDMDW? "73%" : "87%"
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
        <div id='div_route_details'>
          <p id='p_routename_label'>{userDataDetails.routeName}</p>
          <p id='p_stationName_label'>{driverroute.stationList.filter((sn, i) => sn.stationID == driverdestination.stationID && i == driverdestination.index)[0]?.stationName}</p>
        </div>
        <div id='div_latlng_container'>
          <span className='span_latlng_holder'>Lat: {coords.lat}</span>
          <span className='span_latlng_holder'>Lng: {coords.lng}</span>
        </div>
        <div id='div_navigations_stations'>
          <button className='btn_navigations_stations' onClick={() => {
            PrevStationAction()
          }}><PrevIcon /></button>
          <p id='p_stationName_ind'>{driverroute.stationList.filter((sn, i) => sn.stationID == driverdestination.stationID && i == driverdestination.index)[0]?.stationName}</p>
          <button className='btn_navigations_stations' onClick={() => {
            NextStationAction()
          }}><NextIcon /></button>
        </div>
      </motion.div>
      <WrappedMap 
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAeogbvkQJHv5Xm0Ph_O_ehNWBxkdr_1CU`}
        loadingElement={<div style={{height: '100%'}} />}
        containerElement={<div style={{height: '100%'}} />}
        mapElement={<div style={{height: '100%'}} />}
         />
    </div>
  )
}

function Home() {

  const [togglemenu, settogglemenu] = useState(false);

  const navigate = useNavigate();

  const commuter = localStorage.getItem('tokencommuter');
  const driver = localStorage.getItem('tokendriver');

  const dispatch = useDispatch();
  const userDataDetails = useSelector(state => state.userdatadetails);
  const initialPosition = useSelector(state => state.initialposition);
  const coords = useSelector(state => state.coords);
  const infotoggle = useSelector(state => state.infotoggle);
  const centeren = useSelector(state => state.centeren);

  const commutertraveldata = useSelector(state => state.commutertraveldata);
  const alltraveldata = useSelector(state => state.drivertraveldata);
  const busstopslist = useSelector(state => state.busstopslist)

  const driverdestination = useSelector(state => state.driverdestination)
  const driverroute = useSelector(state => state.driverroute);

  const neonassistantstatus = useSelector(state => state.neonassistantstatus);

  const pageIdentifier = useLocation()
  const [currentPageId, setcurrentPageId] = useState("")

  useEffect(() => {
    // console.log(pageIdentifier.pathname.split("/")[2])
    if(pageIdentifier.pathname.split("/")[2] == undefined){
      setcurrentPageId("")
    }
    else{
      setcurrentPageId(pageIdentifier.pathname.split("/")[2])
    }
  },[pageIdentifier])

  useEffect(() => {
    if((commuter == "" || commuter == null) && (driver == "" || driver == null)){
        navigate("/login");
        return;
    }
  }, [driver, commuter])

  useEffect(() => {
    initBusStopsList()
    initDriverRoute()
  }, [])
  

  const userDataFetch = () => {
      Axios.get(`${URL_TWO}/userData`, {
          headers:{
            "x-access-tokencommuter": localStorage.getItem('tokencommuter')
          }
        }).then((response) => {
          // console.log(response.data);
          // setuserDataDetails(response.data);
          dispatch({type: USER_DETAILS, userdatadetails: response.data})
        }).catch((err) => {
          console.log(err);
      })
  }

  const userDataDriverFetch = () => {
    Axios.get(`${URL_TWO}/userData`, {
        headers:{
          "x-access-tokendriver": localStorage.getItem('tokendriver')
        }
      }).then((response) => {
        // console.log(response.data);
        // setuserDataDetails(response.data);
        if(response.data.status){
          // console.log(response.data.result)
          dispatch({type: USER_DETAILS, userdatadetails: response.data.result})
        }
        else{
          if(response.data.reestablish){
            // logoutfunc()
            dispatch({type: USER_DETAILS, userdatadetails: userdatadetailsstate})
            // logoutSocket(userDataDetails.userID);
            localStorage.removeItem('tokencommuter');
            localStorage.removeItem('tokendriver');
            navigate("/login");
          }
        }
      }).catch((err) => {
        console.log(err);
        // logoutfunc()
      })
  }

  useEffect(() => {
    if((commuter != "" || commuter != null) && (driver == "" || driver == null)){
        userDataFetch()
    }
    else if((commuter == "" || commuter == null) && (driver != "" || driver != null)){
        setTimeout(() => {
          userDataDriverFetch()
        }, 2000)
    }
  }, [driver, commuter])

  useEffect(() => {
    userDataDriverFetch()
    if((commuter != "" || commuter != null) && (driver == "" || driver == null)){
      Axios.get(`${URL_TWO}/userTravel/${"Commuter"}`, {
        headers:{
          "x-access-tokencommuter": localStorage.getItem('tokencommuter')
        }
      }).then((response) => {
        if(response.data.status){
          dispatch({type: SET_DRIVER_TRAVEL_DATA, drivertraveldata: response.data.result});
          // console.log(response.data);
        }
      }).catch((err) => {
        //alert error
        console.log(err);
      })
    }
    else if((commuter == "" || commuter == null) && (driver != "" || driver != null)){
      Axios.get(`${URL_TWO}/userTravel/${"Driver"}`, {
        headers:{
          "x-access-tokendriver": localStorage.getItem('tokendriver')
        }
      }).then((response) => {
        if(response.data.status){
          dispatch({type: SET_DRIVER_TRAVEL_DATA, drivertraveldata: response.data.result});
          // console.log(response.data);
        }
      }).catch((err) => {
        //alert error
        console.log(err);
        // logoutfunc()
      })
    }
    // console.log(alltraveldata)
  }, [driver, commuter])

  useEffect(() => {
    // var timeoutSetter;
    // if(userDataDetails.userID != ''){
    //   setInterval(() => {
        
    //     // console.log(alltraveldata);
    //   }, 2000);
    // }
    // else{
    //   clearInterval(timeoutSetter)
    // }

    // return () => {
    //   clearInterval(timeoutSetter)
    // }
    // console.log("Changed");

    if(userDataDetails.userID != ''){
      shareLocationTrigger()
    }

    return () => {
      shareLocationTrigger = () => {  }
    }

  }, [userDataDetails, infotoggle, driverdestination]);

  const computeDistance = (lat2, lon2) => {
    var lat1 = driverdestination.index == driverroute.stationList.length - 1? driverroute.stationList[0].coordinates[1] : driverroute.stationList[driverdestination.index + 1].coordinates[1]
    var lon1 = driverdestination.index == driverroute.stationList.length - 1? driverroute.stationList[0].coordinates[0] : driverroute.stationList[driverdestination.index + 1].coordinates[0]

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

    // console.log(d)

    return d;
  }

  var shareLocationTrigger = () => {
    //userDataDetails.userID != ''
    if(true){
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch({type: SET_INTITIAL_POSITION, initialposition:{ lat: position.coords.latitude, lng: position.coords.longitude } })
        dispatch({type: SET_COORDS, coords:{ lat: position.coords.latitude, lng: position.coords.longitude }})
        // setinitialPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
        // setcoords({ lat: position.coords.latitude, lng: position.coords.longitude })
        // console.log({ lat: position.coords.latitude, lng: position.coords.longitude });
        // socketIdentifier({
        //   userID: userDataDetails.userID,
        //   userType: userDataDetails.userType,
        //   destination: alltraveldata.destination,
        //   route: `${alltraveldata.destination_one} - ${alltraveldata.destination_two}`,
        //   vehicle: alltraveldata.vehicle,
        //   coordinates: { lat: position.coords.latitude, lng: position.coords.longitude }
        // }, userDataDetails.userType)
        var distanceListener = computeDistance(position.coords.latitude, position.coords.longitude)
        if(distanceListener < 50){
          if(driverdestination.index == driverroute.stationList.length - 1){
            dispatch({type: SET_DRIVER_DESTINATION, driverdestination: {
              stationID: driverroute.stationList[0].stationID,
              stationName: driverroute.stationList[0].stationName,
              index: 0
            }})
          }
          else{
            dispatch({type: SET_DRIVER_DESTINATION, driverdestination: {
              stationID: driverroute.stationList[driverdestination.index + 1].stationID,
              stationName: driverroute.stationList[driverdestination.index + 1].stationName,
              index: driverdestination.index + 1
            }})
          }
        }
        Axios.get(`${URL_TWO}/activeDriversRoute/${driverdestination.stationID}/${driverdestination.stationName}/${driverdestination.index}/${position.coords.latitude}/${position.coords.longitude}/${infotoggle}`, {
          headers:{
            "x-access-tokendriver": localStorage.getItem('tokendriver')
          }
        }).then((response) => {
          //do nothing
          if(response.data.status){
            // console.log(Object.values(response.data.result))
            var livebuslistresponsearray = Object.values(response.data.result)
            var livebuslistfilter = livebuslistresponsearray.filter((lbl, i) => lbl.userID != userDataDetails.driverID && lbl.routeID == userDataDetails.routeID && lbl.busNo != 0)
            dispatch({type: SET_LIVE_BUS_LIST, livebuslist: livebuslistfilter})
            setTimeout(() => {
              shareLocationTrigger()
            },1500)
          }
          else{
            console.log(response.data.message)
            setTimeout(() => {
              shareLocationTrigger()
            },1500)
          }
        }).catch((err) => {
          console.log(err)
          setTimeout(() => {
              shareLocationTrigger()
            },1500)
        })
      })
    }
  }

  const logoutfunc = () => {
    Axios.get(`${URL_TWO}/clearLiveDataDriver`, {
      headers:{
        "x-access-tokendriver": localStorage.getItem('tokendriver')
      }
    }).then((response) => {
      if(response.data.status){
        locationSharing(false)
        dispatch({type: USER_DETAILS, userdatadetails: userdatadetailsstate})
        // logoutSocket(userDataDetails.userID);
        localStorage.removeItem('tokencommuter');
        localStorage.removeItem('tokendriver');
        navigate("/login");
      }
      else{
        console.log("LOGOUT", response.data.message)
        locationSharing(false)
        dispatch({type: USER_DETAILS, userdatadetails: userdatadetailsstate})
        // logoutSocket(userDataDetails.userID);
        localStorage.removeItem('tokencommuter');
        localStorage.removeItem('tokendriver');
        navigate("/login");
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  let cancelAxios;

  useEffect(() => {
    subscribeLiveDataListener()
  },[])

  const subscribeLiveDataListener = () => {
    if(typeof cancelAxios != typeof undefined){
      cancelAxios.cancel()
    }
    else{
      cancelAxios = Axios.CancelToken.source()
      Axios.get(`${URL_TWO}/subscribeDataDriver`,{
        headers:{
          "x-access-tokendriver": localStorage.getItem('tokendriver')
        },
        cancelToken: cancelAxios.token
      }).then((response) => {
        //nothing to do
        if(response.data.status){
          //run init commands
          cancelAxios = undefined
          subscribeLiveDataListener()
        }
        else{
          //also run init commands
          // cancelAxios()
          // subscribeMessages()
          if(response.data.message == "Token Denied!"){
            logoutfunc()
          }
          else{
            subscribeLiveDataListener()
          }
          // subscribeLiveDataListener()
        }
      }).catch((err) => {
        console.log(err);
        if(err.message != 'canceled'){
          //run init commands
          cancelAxios = undefined
          subscribeLiveDataListener()
        }
      })
    }
  }

  const initBusStopsList = () => {
    Axios.get(`${URL_TWO}/enabledBusStops`, {
      headers:{
        "x-access-tokendriver": localStorage.getItem("tokendriver")
      }
    }).then((response) => {
      if(response.data.status){
        // console.log(response.data.result)
        dispatch({type: SET_BUS_STOPS_LIST, busstopslist: response.data.result})
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  const locationSharing = (statustoggle) => {
    Axios.get(`${URL_TWO}/locationSharingToggle/${statustoggle}`, {
      headers:{
        "x-access-tokendriver": localStorage.getItem('tokendriver')
      }
    }).then((response) => {
      if(response.data.status){
        console.log(response.data.message)
        // alert("OK")
        dispatch({type: SET_INFO_TOGGLE, infotoggle: statustoggle})
      }
      else{
        console.log(response.data.message)
      }
    }).catch((err) => {
      console.log(err);
    })
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
            dispatch({type: SET_DRIVER_DESTINATION, driverdestination: {
              stationID: response.data.result.stationList[0].stationID,
              stationName: response.data.result.stationList[0].stationName,
              index: 0
            }})
        }
        else{
            console.log(response.data.message)
        }
    }).catch((err) => {
        console.log(err);
    })
  }

  return (
    <div id='div_home'>
      {userDataDetails.userID != ""? (
        <>
          {togglemenu? (
          <motion.div id='navigation_home'
            animate={{
              maxWidth: togglemenu? "300px" : "60px",
              backgroundColor: togglemenu? "white" : "transparent",
              boxShadow: togglemenu? "0px 0px 3px black" : "none"
            }}
            transition={{
              bounce: 0,
              duration: 0.2
            }}
          >
            <button onClick={() => {settogglemenu(!togglemenu)}} id='btn_menu'>{togglemenu? <Minimize /> : <Toggle />}</button>
              <nav id='nav_exposed'>
                <li>
                  <div id='div_profile_preview'>
                    <img src={DriverDefaultImg} id='img_profile_preview' />
                    <p id='p_label_userName'>{userDataDetails.firstName} {userDataDetails.middleName == "N/A"? "" : userDataDetails.middleName} {userDataDetails.lastName}</p>
                    <p id='p_label_userID'>{userDataDetails.userID}</p>
                  </div>
                </li>
                {/* <li>
                  <motion.p id='user_id_tag'
                    animate={{
                      backgroundColor: userDataDetails.userType == "Commuter"? "lime" : "orange"
                    }}
                  >User ID: {userDataDetails.userID}</motion.p>
                </li> */}
                <li>
                  <h4 id='navigations_h4'>Navigations</h4>
                </li>
                <li>
                  <Link to='/home' className='links_tag_navigation'><p className='link_ptags'><span><HomeToggle style={{fontSize: "18px"}} /></span><span>Home</span></p></Link>
                </li>
                <li>
                  <Link to='/home/map' className='links_tag_navigation'><p className='link_ptags'><span><MapIcon style={{fontSize: "18px"}} /></span><span>Map</span></p></Link>
                </li>
                <li>
                  <Link to='/home/avroutes' className='links_tag_navigation'><p className='link_ptags'><span><InfoMapIcon style={{fontSize: "18px"}} /></span><span>Info Map</span></p></Link>
                </li>
                <li>
                  <Link to='/home/account' className='links_tag_navigation'><p className='link_ptags'><span><AccountToggle style={{fontSize: "18px"}} /></span><span>Account</span></p></Link>
                </li>
                <li>
                  <h4 id='navigations_h4_2'>Controls</h4>
                </li>
                <li>
                  <p className='link_ptags' onClick={() => { locationSharing(!infotoggle) }}><span>{infotoggle? <InfoToggleOn style={{color: "lime", fontSize: "18px"}} /> : <InfoToggle style={{color: "red", fontSize: "18px"}} />}</span><span>{infotoggle? "Disable" : "Enable"} Location Sharing</span></p>
                </li>
                {/* <li>
                  <p className='link_ptags' onClick={() => { dispatch({type: SET_NEON_ASSISTANT_STATUS, neonassistantstatus: !neonassistantstatus}) }}><span>{neonassistantstatus? <APIIcon style={{color: "lime", fontSize: "18px"}} /> : <APIIcon style={{color: "red", fontSize: "18px"}} />}</span><span>Neon Assistant</span></p>
                </li> */}
                {/* <li>
                  <p className='link_ptags' onClick={() => {dispatch({type: SET_CENTER_EN, centeren: !centeren})}}><span><CenterOn style={{color: centeren? "lime" : "red", fontSize: "18px"}} /></span><span>Auto Focus</span></p>
                </li> */}
                <li>
                  <button id='btn_logout' onClick={logoutfunc}>Logout</button>
                </li>
              </nav>
          </motion.div>
          ) : null}
          <div id='div_header_main'>
            <button onClick={() => {settogglemenu(!togglemenu)}} id='btn_menu'>{togglemenu? <Minimize /> : <Toggle />}</button>
            <p id='p_page_label'>{
              currentPageId == ""? "Updates & Feed" : 
              currentPageId == "map"? "Map" : 
              currentPageId == "avroutes"? "Info Map" : 
              currentPageId == "account"? "Account" : ""
            }</p>
            <div id='div_account_image_container'>
              <motion.div id='div_account_image_btn_holder' onClick={() => {
                navigate("/home/account")
              }}>
                <img src={DriverDefaultImg} id='img_default_driver_img'/>
              </motion.div>
            </div>
          </div>
          <Routes>
            <Route path='/' element={<Feed />} />
            <Route path='/map' element={<MapRoute />} />
            <Route path='/avroutes' element={<InfoMap />} />
            <Route path='/account' element={<Account />} />
          </Routes>
        </>
      ) : (
        <div id='div_loading_splash_screen'>
          <motion.div
          id='div_loading_anim'
          animate={{
            rotate: -360
          }}
          transition={{
            duration: 1,
            repeat: Infinity
          }}>
            <LoadingIcon style={{color: "white", fontSize: "35px"}} />
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Home