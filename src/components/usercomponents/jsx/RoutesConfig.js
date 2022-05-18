import React, { useState, useEffect } from 'react'
import '../css/RoutesConfig.css';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { URL_TWO } from '../../../variables';
import { SET_DRIVER_TRAVEL_DATA } from '../../../redux/types/types';

function RoutesConfig() {

  const dispatch = useDispatch();
  const userDataDetails = useSelector(state => state.userdatadetails);

  const [displaydestinationinput, setdisplaydestinationinput] = useState("none");
  const [destinationinputvalue, setdestinationinputvalue] = useState("");

  const [messageAlert, setmessageAlert] = useState(false);
  const [messageContent, setmessageContent] = useState("");

  const savedestinationbtn = () => {
    // alert(userDataDetails.userID);

    if(destinationinputvalue == "" || destinationinputvalue == "none"){
      setmessageContent("Destination Value is Empty!");
      setTimeout(() => {
        setmessageAlert(true);
      }, 500);
      setTimeout(() => {
        setmessageAlert(false);
      }, 3500);
      setTimeout(() => {
        setmessageContent("");
      }, 4000)
    }
    else{
      Axios.post(`http://localhost:3001/commuterUpdateDestination`, {
        userID: userDataDetails.userID,
        destination: destinationinputvalue
      }, {
        headers:{
          "x-access-tokencommuter": localStorage.getItem('tokencommuter')
        }
      }).then((response) => {
        if(response.data.status){
          setmessageContent(response.data.message);
          setdestinationinputvalue("")
          setTimeout(() => {
            setmessageAlert(true);
          }, 500);
          setTimeout(() => {
            setmessageAlert(false);
          }, 3500);
          setTimeout(() => {
            setmessageContent("");
          }, 4000)

          //Axios -> Dispatch -> Display

           Axios.get(`https://${URL_TWO}/userTravel/${"Commuter"}`, {
              headers:{
                "x-access-tokencommuter": localStorage.getItem('tokencommuter')
              }
            }).then((response) => {
              if(response.data.status){
                dispatch({type: SET_DRIVER_TRAVEL_DATA, drivertraveldata: response.data.result});
              }
            }).catch((err) => {
              //alert error
            })
        }
        else{
          setmessageContent(response.data.message);
          setdestinationinputvalue("")
          setTimeout(() => {
            setmessageAlert(true);
          }, 500);
          setTimeout(() => {
            setmessageAlert(false);
          }, 3500);
          setTimeout(() => {
            setmessageContent("");
          }, 4000)
        }
      }).catch((err) => {
        // console.log(err);
      })
    }
  }

  return (
    <div id='div_routes'>
      <motion.div className='notifier'
        animate={{
            left: messageAlert? "5px" : "-100%"
        }}

        transition={{
            duration: 0.5
        }}
        >
            <p>{messageContent}</p>
      </motion.div>
      <div id='div_holder_nav_routes'>
        <motion.nav id='nav_routes'
          animate={{
            display: userDataDetails.userType == "Commuter"? "flex" : "none"
          }}
        >
          <li>
            <h4>Your Current Route</h4>
          </li>
          <li>
            <span><button className='btns_destination' onClick={() => {setdisplaydestinationinput("input")}}>Type your Destination</button></span>
            <span><button className='btns_destination' onClick={() => {setdisplaydestinationinput("drop")}}>Choose Existing Destination</button></span>
          </li>
          <motion.li
            animate={{
              display: displaydestinationinput == "input"? "list-item" : "none"
            }}
          >
            <input type='text' name='destination_value' id='destination_value' placeholder='Input a Place of Destination' value={destinationinputvalue} onChange={(e) => {setdestinationinputvalue(e.target.value)}} />
          </motion.li>
          <motion.li
            animate={{
              display: displaydestinationinput == "drop"? "list-item" : "none"
            }}
          >
            <select id='destination_value' onChange={(e) => {setdestinationinputvalue(e.target.value)}}>
              <option value='none' default>---Select a Destination---</option>
            </select>
          </motion.li>
          <motion.li
            animate={{
              display: displaydestinationinput == "none"? "none" : "list-item"
            }}
          >
            <button id='destination_save' onClick={() => {savedestinationbtn()}} >Save</button>
          </motion.li>
          <motion.li
            animate={{
              display: displaydestinationinput == "none"? "list-item" : "none"
            }}
          >
            <p id='labeltext_indic'>Select an Option.</p>
          </motion.li>
        </motion.nav>
        <motion.nav id='nav_routes'
          animate={{
            display: userDataDetails.userType == "Driver"? "none" : "none"
          }}
        >
          <li>
            <h4>Your Current Route</h4>
          </li>
          <li>
            <span><button className='btns_destination' onClick={() => {setdisplaydestinationinput("input")}}>Type your Destination</button></span>
            <span><button className='btns_destination' onClick={() => {setdisplaydestinationinput("drop")}}>Choose Existing Destination</button></span>
          </li>
          <motion.li
            animate={{
              display: displaydestinationinput == "input"? "list-item" : "none"
            }}
          >
            <input type='text' name='destination_value' id='destination_value' placeholder='Input a Place of Destination' value={destinationinputvalue} onChange={(e) => {setdestinationinputvalue(e.target.value)}} />
          </motion.li>
          <motion.li
            animate={{
              display: displaydestinationinput == "drop"? "list-item" : "none"
            }}
          >
            <select id='destination_value' onChange={(e) => {setdestinationinputvalue(e.target.value)}}>
              <option value='none' default>---Select a Destination---</option>
            </select>
          </motion.li>
          <motion.li
            animate={{
              display: displaydestinationinput == "none"? "none" : "list-item"
            }}
          >
            <button id='destination_save' onClick={() => {savedestinationbtn()}} >Save</button>
          </motion.li>
          <motion.li
            animate={{
              display: displaydestinationinput == "none"? "list-item" : "none"
            }}
          >
            <p id='labeltext_indic'>Select an Option.</p>
          </motion.li>
        </motion.nav>
        <nav id='nav_routes'>
          <li>
            <h4>Filters</h4>
          </li>
          <li>
            <p id='labeltext_indic'>Map Filters in Development</p>
          </li>
        </nav>
      </div>
    </div>
  )
}

export default RoutesConfig