import React, { useState, useEffect } from 'react'
import '../css/LoginRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { URL_TWO } from '../../../variables';
import { motion } from 'framer-motion';

function Register() {

  const navigate = useNavigate();

  const [regtype, setregtype] = useState("Driver");

  const [firstName, setfirstName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [lastName, setlastName] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [email, setemail] = useState("");
  const [confpass, setconfpass] = useState("");
  const [pass, setpass] = useState("");
  const [dlicense, setdlicense] = useState("");
  const [age, setage] = useState("");

  const [companyID, setcompanyID] = useState("")

  const [loadingState, setloadingState] = useState(false);
  const [messageAlert, setmessageAlert] = useState(false);
  const [messageContent, setmessageContent] = useState("");

  const registersubmit = (acctype) => {
      setloadingState(true);
      if(firstName == "" || lastName == "" || mobileNumber == "" || email == "" || confpass == "" || pass == ""){
        setloadingState(false)
        setmessageContent("Please Complete the Form!");
        setmessageAlert(true);
        setTimeout(() => {
            setmessageAlert(false);
        }, 3000);
        setTimeout(() => {
            setmessageContent("");
        }, 3500);
      }
      else{
        if(acctype == "Commuter"){
            if(confpass == pass){
                Axios.post(`${URL_TWO}/registercommuter`, {
                    firstName: firstName,
                    middleName: middleName == ""? "N/A" : middleName,
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
                        setloadingState(false)
                        setmessageContent(response.data.message);
                        setmessageAlert(true);
                        setTimeout(() => {
                            setmessageAlert(false);
                        }, 3000);
                        setTimeout(() => {
                            setmessageContent("");
                        }, 3500);
                    }
                    else{
                        setloadingState(false);
                        setmessageContent(response.data.message);
                        setmessageAlert(true);
                        setTimeout(() => {
                            setmessageAlert(false);
                        }, 3000);
                        setTimeout(() => {
                            setmessageContent("");
                        }, 3500);
                    }
                }).catch((err) => {
                    // console.log(err);
                    setloadingState(false);
                    setmessageContent("Register Unsuccessful!");
                    setmessageAlert(true);
                    setTimeout(() => {
                        setmessageAlert(false);
                    }, 3000);
                    setTimeout(() => {
                        setmessageContent("");
                    }, 3500);
                })
            }
            else{
                // alert("Password not match!");
                setloadingState(false);
                setmessageContent("Password not match!");
                setmessageAlert(true);
                setTimeout(() => {
                    setmessageAlert(false);
                }, 3000);
                setTimeout(() => {
                    setmessageContent("");
                }, 3500);
            }
          }
          else if(acctype == "Driver"){
            if(firstName == "" || lastName == "" || mobileNumber == "" || email == "" || confpass == "" || pass == "" || dlicense == "" || age == ""){
                setloadingState(false)
                setmessageContent("Age not applied!");
                setmessageAlert(true);
                setTimeout(() => {
                    setmessageAlert(false);
                }, 3000);
                setTimeout(() => {
                    setmessageContent("");
                }, 3500);
            }
            else{
                if(confpass == pass){
                    Axios.post(`${URL_TWO}/registerdriver`, {
                        firstName: firstName,
                        middleName: middleName == ""? "N/A" : middleName,
                        lastName: lastName,
                        mobileNumber: mobileNumber,
                        email: email,
                        confpass: confpass,
                        pass: pass,
                        dlicense: dlicense,
                        age: age,
                        companyID: companyID
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
                            setcompanyID("")
                            setmessageContent(response.data.message);
                            setloadingState(false);
                            setmessageAlert(true);
                            setTimeout(() => {
                                setmessageAlert(false);
                            }, 3000);
                            setTimeout(() => {
                                setmessageContent("");
                            }, 3500);
                        }
                        else{
                            setloadingState(false);
                            setmessageContent(response.data.message);
                            setmessageAlert(true);
                            setTimeout(() => {
                                setmessageAlert(false);
                            }, 3000);
                            setTimeout(() => {
                                setmessageContent("");
                            }, 3500);
                        }
                    }).catch((err) => {
                        // console.log(err);
                        setloadingState(false)
                        setmessageContent("Registration Unsuccessful");
                        setmessageAlert(true);
                        setTimeout(() => {
                            setmessageAlert(false);
                        }, 3000);
                        setTimeout(() => {
                            setmessageContent("");
                        }, 3500);
                    })
                }
                else{
                    setloadingState(false);
                    setmessageContent("Password not match!");
                    setmessageAlert(true);
                    setTimeout(() => {
                        setmessageAlert(false);
                    }, 3000);
                    setTimeout(() => {
                        setmessageContent("");
                    }, 3500);
                    // alert("Password not match!");
                }
            }
          }
      }
  }

  return (
    <div id='login_div'>
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
        <motion.div 
        animate={{
            display: loadingState? "flex" : "none"
        }}
        id='loading_icon'>
            <motion.div 
            initial={{
                height: "10%"
            }} 
            animate={{
                height: "60%"
            }} 
            transition={{
                duration: 0.7,
                yoyo: Infinity,
                bounce: 0
            }}
            className='loader_bars'></motion.div>
            <motion.div 
            initial={{
                height: "10%"
            }}
            animate={{
                height: "60%"
            }}
            transition={{
                delay: 0.2,
                duration: 0.7,
                yoyo: Infinity,
                bounce: 0
            }} 
            className='loader_bars'></motion.div>
            <motion.div 
            initial={{
                height: "10%"
            }}
            animate={{
                height: "60%"
            }}
            transition={{
                delay: 0.5,
                duration: 0.7,
                yoyo: Infinity,
                bounce: 0
            }} 
            className='loader_bars'></motion.div>
        </motion.div>
        <nav id='nav_login'>
            <li className='li_register'>
                    <nav>
                        {/* <li>
                            <p id='label_login'>Select an Account Type</p>
                        </li> */}
                        <li className='li_reg_nav'>
                            <nav>
                                {/* <li>
                                    <select className='input_login' onChange={(e) => {setregtype(e.target.value)}}>
                                        <option value="None">--Select Type--</option>
                                        <option value="Commuter">Commuter</option>
                                        <option value="Driver">Driver</option>
                                    </select>
                                </li> */}
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
                                                            <input type='text' placeholder='Company ID' className='input_login' onChange={(e) => {setcompanyID(e.target.value)}} value={companyID} />
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