import React, { useState, useEffect } from 'react'
import '../css/Home.css';
import Axios from 'axios';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, Circle } from 'react-google-maps'
import Toggle from '@material-ui/icons/Menu'
import Minimize from '@material-ui/icons/ArrowLeft'
import { motion } from 'framer-motion';
import HomeToggle from '@material-ui/icons/Home'
import LogoutToggle from '@material-ui/icons/ExitToApp'
import AccountToggle from '@material-ui/icons/Person'
import AvRoutesToggle from '@material-ui/icons/Directions'
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import CommuterIcon from '../imgs/commutericon.png';
import DriverIcon from '../imgs/drivericon.png';
import { returnValueArray, socketIdentifier } from '../../../socket/socket';
import { URL_TWO } from '../../../variables';

function Map(){

  const [coords, setcoords] = useState({ lat: "", lng: "" });
  const [initialPosition, setinitialPosition] = useState({ lat: "", lng: "" });

  const google = window.google;

  //NEED TO BE MOVED TO HOME MAIN COMPONENT AND ACCESS DATA THROUGH REDUX
  
  const [userDataDetails, setuserDataDetails] = useState({
    userID: '',
    userType: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNumber: '',
    email: ''
  });

  const [livelist, setlivelist] = useState([]);

  const commuter = localStorage.getItem('tokencommuter');
  const driver = localStorage.getItem('tokendriver');

  useEffect(() => {
    setInterval(() => {
      // console.log(returnValueArray());
      setlivelist(returnValueArray());
    }, 1000);
  }, [])

  useEffect(() => {
    if((commuter != "" || commuter != null) && (driver == "" || driver == null)){
        Axios.get(`https://${URL_TWO}/userData`, {
          headers:{
            "x-access-tokencommuter": localStorage.getItem('tokencommuter')
          }
        }).then((response) => {
          // console.log(response.data);
          setuserDataDetails(response.data);
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
        setuserDataDetails(response.data);
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [driver, commuter])

  useEffect(() => {
    navigator.geolocation.watchPosition((position) => {
      setinitialPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
      setcoords({ lat: position.coords.latitude, lng: position.coords.longitude })
      // console.log({ lat: position.coords.latitude, lng: position.coords.longitude });
      socketIdentifier({
        userID: userDataDetails.userID,
        userType: userDataDetails.userType,
        address: "Commonwealth, Quezon City",
        destination: "Lagro",
        coordinates: { lat: position.coords.latitude, lng: position.coords.longitude }
      })
    })
  }, [userDataDetails]);

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
            defaultZoom={19} 
            defaultCenter={initialPosition}
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
              radius={20}
              options={{
                strokeColor: userDataDetails.userType == "Commuter"? "lime" : "orange"
              }}
            />
            {livelist.map((ls) => {
              return(
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
              )
            })}
          </GoogleMap>
        ) : ""}
      </>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const MapRoute = () => {
  return(
    <div style={{ width: "100%", height: "100vh"}}>
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

  useEffect(() => {
    if((commuter == "" || commuter == null) && (driver == "" || driver == null)){
        navigate("/login");
        return;
    }
  }, [driver, commuter])

  const logoutfunc = () => {
    localStorage.removeItem('tokencommuter');
    localStorage.removeItem('tokendriver');
    navigate("/login");
  }

  return (
    <div id='div_home'>
      <motion.div id='navigation_home'
        animate={{
          maxWidth: togglemenu? "300px" : "60px",
          backgroundColor: togglemenu? "white" : "transparent"
        }}
      >
        <button onClick={() => {settogglemenu(!togglemenu)}} id='btn_menu'>{togglemenu? <Minimize /> : <Toggle />}</button>
        {togglemenu? "": (
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
              onClick={logoutfunc}
              className='btn_navigations_toggle'><LogoutToggle /></motion.button>
            </li>
          </nav>
        )}
      </motion.div>
      <Routes>
        <Route path='/' element={<MapRoute />} />
      </Routes>
    </div>
  )
}

export default Home