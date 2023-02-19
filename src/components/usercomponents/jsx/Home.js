import React, { useState, useEffect } from 'react'
import '../css/Home.css';
import Axios from 'axios';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, Circle, InfoWindow } from 'react-google-maps'
import Toggle from '@material-ui/icons/Menu'
import Minimize from '@material-ui/icons/ArrowLeft'
import { motion } from 'framer-motion';
import HomeToggle from '@material-ui/icons/Home'
import LogoutToggle from '@material-ui/icons/ExitToApp'
import AccountToggle from '@material-ui/icons/Person'
import AvRoutesToggle from '@material-ui/icons/Directions'
import InfoToggleOn from '@material-ui/icons/Label'
import InfoToggle from '@material-ui/icons/LabelOutlined'
import CenterOn from '@material-ui/icons/CenterFocusStrong'
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import CommuterIcon from '../imgs/commutericon.png';
import DriverIcon from '../imgs/drivericon.png';
import { logoutSocket, returnValueArray, socketIdentifier } from '../../../socket/socket';
import { URL_TWO } from '../../../variables';
import { useDispatch, useSelector } from 'react-redux';
import { SET_BUS_STOPS_LIST, SET_CENTER_EN, SET_COMMUTER_TRAVEL_DATA, SET_COORDS, SET_DRIVER_TRAVEL_DATA, SET_INFO_TOGGLE, SET_INTITIAL_POSITION, USER_DETAILS } from '../../../redux/types/types';
import RoutesConfig from './RoutesConfig';
import Account from './Account';
import { userdatadetailsstate } from '../../../redux/action/action';
import Feed from './Feed';
import MapIcon from '@material-ui/icons/Map'
import OpennedIcon from '../imgs/OpenStopIcon.png'

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

  const [livelist, setlivelist] = useState([]);

  const commuter = localStorage.getItem('tokencommuter');
  const driver = localStorage.getItem('tokendriver');

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
            }}
          >
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
                strokeColor: userDataDetails.userType == "Commuter"? "lime" : "orange"
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
            {busstopslist.map((data, i) => {
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
            })}
          </GoogleMap>
        ) : ""}
      </>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const MapRoute = () => {

  const userDataDetails = useSelector(state => state.userdatadetails);
  const coords = useSelector(state => state.coords);

  const commutertraveldata = useSelector(state => state.commutertraveldata);
  const alltraveldata = useSelector(state => state.drivertraveldata);

  const [loaderInMap, setloaderInMap] = useState(false);

  return(
    <div style={{ width: "100%", height: "100vh"}}>
      <div id='div_user_shortcut_details'>
        <nav id='nav_user_shortcut_details'>
          <li>
            <p className='labeltext_user_shortcut_details'><b>User ID:</b> {userDataDetails.userID}</p>
          </li>
          <li>
            <p className='labeltext_user_shortcut_details'><b>Current Destination:</b> {alltraveldata.destination}</p>
          </li>
          <li>
            <motion.p
              initial={{
                display: "none"
              }}
              animate={{
                display: userDataDetails.userType == "Driver"? loaderInMap? "block" : "none" : "none"
              }}
              className='labeltext_user_shortcut_details'
              ><b>Route: </b>{alltraveldata.destination_one} - {alltraveldata.destination_two}</motion.p>
          </li>
          <li>
            <button className='labeltext_user_shortcut_details last_labeltext' onClick={() => {setloaderInMap(!loaderInMap)}}>In Map Location</button>
            <motion.p
            initial={{
              display: "none"
            }}
            animate={{
              display: loaderInMap? "block" : "none"
            }}
            className='latlng_text'
            >Lat: {coords.lat}<br />Lng: {coords.lng}</motion.p>
          </li>
        </nav>
      </div>
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

  useEffect(() => {
    if((commuter == "" || commuter == null) && (driver == "" || driver == null)){
        navigate("/login");
        return;
    }
  }, [driver, commuter])

  useEffect(() => {
    initBusStopsList()
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
          // console.log(response.data)
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
    var timeoutSetter;
    if(userDataDetails.userID != ''){
      setInterval(() => {
        if(userDataDetails.userID != ''){
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
            Axios.get(`${URL_TWO}/activeDriversRoute/${position.coords.latitude}/${position.coords.longitude}`, {
              headers:{
                "x-access-tokendriver": localStorage.getItem('tokendriver')
              }
            }).then((response) => {
              //do nothing
              if(response.data.status){
                // console.log(response.data.message)
              }
              else{
                console.log(response.data.message)
              }
            }).catch((err) => {
              console.log(err)
            })
          })
        }
        // console.log(alltraveldata);
      }, 2000);
    }
    else{
      clearInterval(timeoutSetter)
    }

    return () => {
      clearInterval(timeoutSetter)
    }
    // console.log("Changed");
  }, [userDataDetails]);

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
          subscribeLiveDataListener()
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
        console.log(response.data.result)
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

  return (
    <div id='div_home'>
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
        {togglemenu? (
          <nav id='nav_exposed'>
            <li>
              <motion.p id='user_id_tag'
                animate={{
                  backgroundColor: userDataDetails.userType == "Commuter"? "lime" : "orange"
                }}
              >User ID: {userDataDetails.userID}</motion.p>
            </li>
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
              <Link to='/home/avroutes' className='links_tag_navigation'><p className='link_ptags'><span><AvRoutesToggle style={{fontSize: "18px"}} /></span><span>Routes / Destinations</span></p></Link>
            </li>
            <li>
              <Link to='/home/account' className='links_tag_navigation'><p className='link_ptags'><span><AccountToggle style={{fontSize: "18px"}} /></span><span>Account</span></p></Link>
            </li>
            <li>
              <h4 id='navigations_h4_2'>Controls</h4>
            </li>
            <li>
              <p className='link_ptags' onClick={() => { locationSharing(!infotoggle) }}><span>{infotoggle? <InfoToggleOn style={{color: "lime", fontSize: "18px"}} /> : <InfoToggle style={{color: "red", fontSize: "18px"}} />}</span><span>Enable Location Sharing</span></p>
            </li>
            <li>
              <p className='link_ptags' onClick={() => {dispatch({type: SET_CENTER_EN, centeren: !centeren})}}><span><CenterOn style={{color: centeren? "lime" : "red", fontSize: "18px"}} /></span><span>Auto Focus</span></p>
            </li>
            <li>
              <button id='btn_logout' onClick={logoutfunc}>Logout</button>
            </li>
          </nav>
        ) : (
          <nav id='nav_navigation'>
            <li className='li_nav_navigations'>
              <motion.button 
              whileHover={{
                scale: 1.2
              }}
              className='btn_navigations_toggle' onClick={() => navigate("/home")}><HomeToggle /></motion.button>
            </li>
            <li className='li_nav_navigations'>
              <motion.button 
              whileHover={{
                scale: 1.2
              }}
              className='btn_navigations_toggle' onClick={() => navigate("/home/map")}><MapIcon /></motion.button>
            </li>
            <li className='li_nav_navigations'>
              <motion.button 
              whileHover={{
                scale: 1.2
              }}
              className='btn_navigations_toggle' onClick={() => navigate("/home/avroutes")}><AvRoutesToggle /></motion.button>
            </li>
            <li className='li_nav_navigations'>
              <motion.button 
              whileHover={{
                scale: 1.2
              }}
              className='btn_navigations_toggle' onClick={() => navigate("/home/account")}><AccountToggle /></motion.button>
            </li>
            <li className='li_nav_navigations'>
              <motion.button 
              whileHover={{
                scale: 1.2
              }}
              title='Toggle User Details'
              className='btn_navigations_toggle' onClick={() => {locationSharing(!infotoggle)}}>{infotoggle? <InfoToggleOn style={{color: "lime"}} /> : <InfoToggle style={{color: "red"}} />}</motion.button>
            </li>
            {/* <li className='li_nav_navigations'>
              <motion.button 
              whileHover={{
                scale: 1.2
              }}
              className='btn_navigations_toggle' onClick={() => {dispatch({type: SET_CENTER_EN, centeren: !centeren})}} ><CenterOn style={{color: centeren? "lime" : "red"}} /></motion.button>
            </li> */}
            <li className='li_nav_navigations'>
              <motion.button
              whileHover={{
                scale: 1.2
              }} 
              onClick={logoutfunc}
              className='btn_navigations_toggle'><LogoutToggle /></motion.button>
            </li>
          </nav>
        )}
      </motion.div>
      <Routes>
        <Route path='/' element={<Feed />} />
        <Route path='/map' element={<MapRoute />} />
        <Route path='/avroutes' element={<RoutesConfig />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </div>
  )
}

export default Home