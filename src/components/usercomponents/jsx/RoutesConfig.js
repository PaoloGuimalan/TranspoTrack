import React, { useState, useEffect } from 'react'
import '../css/RoutesConfig.css';
import { motion } from 'framer-motion';

function RoutesConfig() {

  const [displaydestinationinput, setdisplaydestinationinput] = useState("none");

  return (
    <div id='div_routes'>
      <nav id='nav_routes'>
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
          <input type='text' name='destination_value' id='destination_value' placeholder='Input a Place of Destination' />
        </motion.li>
        <motion.li
          animate={{
            display: displaydestinationinput == "drop"? "list-item" : "none"
          }}
        >
          <select id='destination_value'>
            <option value='none' default>---Select a Destination---</option>
          </select>
        </motion.li>
        <motion.li
          animate={{
            display: displaydestinationinput == "none"? "none" : "list-item"
          }}
        >
          <button id='destination_save' >Save</button>
        </motion.li>
        <motion.li
          animate={{
            display: displaydestinationinput == "none"? "list-item" : "none"
          }}
        >
          <p id='labeltext_indic'>Select an Option.</p>
        </motion.li>
        <li>
          <h4>Filters</h4>
        </li>
      </nav>
    </div>
  )
}

export default RoutesConfig