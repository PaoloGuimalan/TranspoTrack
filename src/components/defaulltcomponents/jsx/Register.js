import React, { useState, useEffect } from 'react'
import '../css/LoginRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { URL_TWO } from '../../../variables';

function Register() {

  const navigate = useNavigate();

  const [regtype, setregtype] = useState("None");

  const [firstName, setfirstName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [lastName, setlastName] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [email, setemail] = useState("");
  const [confpass, setconfpass] = useState("");
  const [pass, setpass] = useState("");
  const [dlicense, setdlicense] = useState("");
  const [age, setage] = useState("");

  const registersubmit = (acctype) => {
      if(acctype == "Commuter"){
        if(confpass == pass){
            Axios.post(`https://${URL_TWO}/registercommuter`, {
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                mobileNumber: mobileNumber,
                email: email,
                confpass: confpass,
                pass: pass
            }).then((response) => {
                if(response.data.status){
                    setfirstName("")
                    setmiddleName("")
                    setlastName("")
                    setmobileNumber("")
                    setemail("")
                    setconfpass("")
                    setpass("")
                }
            }).catch((err) => {
                console.log(err);
            })
        }
        else{
            alert("Password not match!");
        }
      }
      else if(acctype == "Driver"){
        if(confpass == pass){
            Axios.post(`https://${URL_TWO}/registerdriver`, {
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                mobileNumber: mobileNumber,
                email: email,
                confpass: confpass,
                pass: pass,
                dlicense: dlicense,
                age: age
            }).then((response) => {
                if(response.data.status){
                    setfirstName("")
                    setmiddleName("")
                    setlastName("")
                    setmobileNumber("")
                    setemail("")
                    setconfpass("")
                    setpass("")
                    setdlicense("")
                    setage("")
                }
            }).catch((err) => {
                console.log(err);
            })
        }
        else{
            alert("Password not match!");
        }
      }
  }

  return (
    <div id='login_div'>
        <nav id='nav_login'>
            <li className='li_register'>
                    <nav>
                        <li>
                            <p id='label_login'>Select an Account Type</p>
                        </li>
                        <li className='li_reg_nav'>
                            <nav>
                                <li>
                                    <select className='input_login' onChange={(e) => {setregtype(e.target.value)}}>
                                        <option value="None">--Select Type--</option>
                                        <option value="Commuter">Commuter</option>
                                        <option value="Driver">Driver</option>
                                    </select>
                                </li>
                                <li>
                                {regtype == "None"? (
                                        ""
                                    ) : (
                                        regtype == "Driver"? (
                                            <nav>
                                                <li>
                                                    <p id='label_login'>Register as Driver</p>
                                                </li>
                                                <li>
                                                    <nav>
                                                    <li>
                                                            <input type='text' placeholder='First Name' className='input_login' onChange={(e) => {setfirstName(e.target.value)}} value={firstName} />
                                                        </li>
                                                        <li>
                                                            <input type='text' placeholder='Middle Name (Optional)' className='input_login' onChange={(e) => {setmiddleName(e.target.value)}} value={middleName} />
                                                        </li>
                                                        <li>
                                                            <input type='text' placeholder='Last Name' className='input_login' onChange={(e) => {setlastName(e.target.value)}} value={lastName} />
                                                        </li>
                                                        <li>
                                                            <br />
                                                            <input type='text' placeholder="Driver's License Number" className='input_login' onChange={(e) => {setdlicense(e.target.value)}} value={dlicense} />
                                                        </li>
                                                        <li>
                                                            <input type='text' placeholder='Age' className='input_login' onChange={(e) => {setage(e.target.value)}} value={age} />
                                                        </li>
                                                        <li>
                                                            <br />
                                                            <input type='text' placeholder='Mobile Number' className='input_login' onChange={(e) => {setmobileNumber(e.target.value)}} value={mobileNumber} />
                                                        </li>
                                                        <li>
                                                            <input type='text' placeholder='Email' className='input_login' onChange={(e) => {setemail(e.target.value)}} value={email} />
                                                        </li>
                                                        <li>
                                                            <br />
                                                            <input type='password' placeholder='Confirm Password' className='input_login' onChange={(e) => {setconfpass(e.target.value)}} value={confpass} />
                                                        </li>
                                                        <li>
                                                            <input type='password' placeholder='Password' className='input_login' onChange={(e) => {setpass(e.target.value)}} value={pass} />
                                                        </li>
                                                        <li>
                                                            <button id='btn_register' onClick={() => {registersubmit("Driver")}}>Register</button>
                                                        </li>
                                                    </nav>
                                                </li>
                                            </nav>
                                        ) : (
                                            <nav>
                                                <li>
                                                    <p id='label_login'>Register as Commuter</p>
                                                </li>
                                                <li>
                                                    <nav>
                                                        <li>
                                                            <input type='text' placeholder='First Name' className='input_login' onChange={(e) => {setfirstName(e.target.value)}} value={firstName} />
                                                        </li>
                                                        <li>
                                                            <input type='text' placeholder='Middle Name (Optional)' className='input_login' onChange={(e) => {setmiddleName(e.target.value)}} value={middleName} />
                                                        </li>
                                                        <li>
                                                            <input type='text' placeholder='Last Name' className='input_login' onChange={(e) => {setlastName(e.target.value)}} value={lastName} />
                                                        </li>
                                                        <li>
                                                            <br />
                                                            <input type='text' placeholder='Mobile Number' className='input_login' onChange={(e) => {setmobileNumber(e.target.value)}} value={mobileNumber} />
                                                        </li>
                                                        <li>
                                                            <input type='text' placeholder='Email' className='input_login' onChange={(e) => {setemail(e.target.value)}} value={email} />
                                                        </li>
                                                        <li>
                                                            <br />
                                                            <input type='password' placeholder='Confirm Password' className='input_login' onChange={(e) => {setconfpass(e.target.value)}} value={confpass} />
                                                        </li>
                                                        <li>
                                                            <input type='password' placeholder='Password' className='input_login' onChange={(e) => {setpass(e.target.value)}} value={pass} />
                                                        </li>
                                                        <li>
                                                            <button id='btn_register' onClick={() => {registersubmit("Commuter")}}>Register</button>
                                                        </li>
                                                    </nav>
                                                </li>
                                            </nav>
                                        )
                                    )}
                                </li>
                                <li>
                                    <p className='no_label_login'>Have Already an Account? <Link to='/login'>Login here.</Link></p>
                                </li>
                            </nav>
                        </li>
                    </nav>
            </li>
            <li className='li_register'>
                <div id='img_carier'></div>
            </li>
        </nav>
    </div>
  )
}

export default Register