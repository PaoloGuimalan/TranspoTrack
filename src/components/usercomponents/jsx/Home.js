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
import { SET_CENTER_EN, SET_COMMUTER_TRAVEL_DATA, SET_COORDS, SET_DRIVER_TRAVEL_DATA, SET_INFO_TOGGLE, SET_INTITIAL_POSITION, USER_DETAILS } from '../../../redux/types/types';
import RoutesConfig from './RoutesConfig';
import Account from './Account';

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
            center={coords}
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

  useEffect(() => {
    if((commuter == "" || commuter == null) && (driver == "" || driver == null)){
        navigate("/login");
        return;
    }
  }, [driver, commuter])

  useEffect(() => {
    if((commuter != "" || commuter != null) && (driver == "" || driver == null)){
        Axios.get(`https://${URL_TWO}/userData`, {
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
    else if((commuter == "" || commuter == null) && (driver != "" || driver != null)){
      Axios.get(`https://${URL_TWO}/userData`, {
        headers:{
          "x-access-tokendriver": localStorage.getItem('tokendriver')
        }
      }).then((response) => {
        // console.log(response.data);
        // setuserDataDetails(response.data);
        dispatch({type: USER_DETAILS, userdatadetails: response.data})
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [driver, commuter])

  useEffect(() => {
    if((commuter != "" || commuter != null) && (driver == "" || driver == null)){
      Axios.get(`https://${URL_TWO}/userTravel/${"Commuter"}`, {
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
      Axios.get(`https://${URL_TWO}/userTravel/${"Driver"}`, {
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
      })
    }
    // console.log(alltraveldata)
  }, [driver, commuter, userDataDetails])

  useEffect(() => {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch({type: SET_INTITIAL_POSITION, initialposition:{ lat: position.coords.latitude, lng: position.coords.longitude } })
        dispatch({type: SET_COORDS, coords:{ lat: position.coords.latitude, lng: position.coords.longitude }})
        // setinitialPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
        // setcoords({ lat: position.coords.latitude, lng: position.coords.longitude })
        // console.log({ lat: position.coords.latitude, lng: position.coords.longitude });
        socketIdentifier({
          userID: userDataDetails.userID,
          userType: userDataDetails.userType,
          destination: alltraveldata.destination,
          route: `${alltraveldata.destination_one} - ${alltraveldata.destination_two}`,
          vehicle: alltraveldata.vehicle,
          coordinates: { lat: position.coords.latitude, lng: position.coords.longitude }
        }, userDataDetails.userType)
      })
      // console.log(alltraveldata);
    }, 1500);
    // console.log(alltraveldata);
  }, [userDataDetails, alltraveldata]);

  const logoutfunc = () => {
    logoutSocket(userDataDetails.userID);
    localStorage.removeItem('tokencommuter');
    localStorage.removeItem('tokendriver');
    navigate("/login");
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
              <Link to='/home/avroutes' className='links_tag_navigation'><p className='link_ptags'><span><AvRoutesToggle style={{fontSize: "18px"}} /></span><span>Routes / Destinations</span></p></Link>
            </li>
            <li>
              <Link to='/home/account' className='links_tag_navigation'><p className='link_ptags'><span><AccountToggle style={{fontSize: "18px"}} /></span><span>Account</span></p></Link>
            </li>
            <li>
              <h4 id='navigations_h4_2'>Controls</h4>
            </li>
            <li>
              <p className='link_ptags' onClick={() => {dispatch({type: SET_INFO_TOGGLE, infotoggle: !infotoggle})}}><span>{infotoggle? <InfoToggleOn style={{color: "lime", fontSize: "18px"}} /> : <InfoToggle style={{color: "red", fontSize: "18px"}} />}</span><span>Show Details</span></p>
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
              className='btn_navigations_toggle' onClick={() => {dispatch({type: SET_INFO_TOGGLE, infotoggle: !infotoggle})}}>{infotoggle? <InfoToggleOn style={{color: "lime"}} /> : <InfoToggle style={{color: "red"}} />}</motion.button>
            </li>
            <li className='li_nav_navigations'>
              <motion.button 
              whileHover={{
                scale: 1.2
              }}
              className='btn_navigations_toggle' onClick={() => {dispatch({type: SET_CENTER_EN, centeren: !centeren})}} ><CenterOn style={{color: centeren? "lime" : "red"}} /></motion.button>
            </li>
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
        <Route path='/' element={<MapRoute />} />
        <Route path='/avroutes' element={<RoutesConfig />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </div>
  )
}

export default Home