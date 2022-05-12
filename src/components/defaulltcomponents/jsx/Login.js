import React, { useState, useEffect } from 'react'
import '../css/LoginRegister.css';
import Background from '../imgs/bgtranspo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { URL_ONE, URL_TWO } from '../../../variables';
import { motion } from 'framer-motion'

function Login() {

  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [accountType, setaccountType] = useState("none");

  const [loadingState, setloadingState] = useState(false);

  const [authenticationMark, setauthenticationMark] = useState(false);

//   useEffect(() => {
//     const commuter = localStorage.getItem('tokencommuter');
//     const driver = localStorage.getItem('tokendriver');

//     if(commuter != "" || commuter != null){
//         setauthenticationMark(true);
//     }
//     else{
//         setauthenticationMark(false);
//     }
//   }, [])

  const loginTrigger = () => {
    // navigate("/home");
    setloadingState(true);
    Axios.post(`https://${URL_TWO}/getLogin`, {
        email: email,
        password: password,
        accountType: accountType
    }).then((response) => {
        if(response.data.status){
            if(accountType == "Commuter"){
                setloadingState(false)
                localStorage.setItem("tokencommuter", response.data.token);
                setemail("");
                setpassword("");
                navigate("/home");
            }
            else if(accountType == "Driver"){
                setloadingState(false)
                localStorage.setItem("tokendriver", response.data.token);
                setemail("");
                setpassword("");
            }
        }
        else{
            setloadingState(false)
            // alert(response.data.message);
        }
    }).catch((err) => {
        console.log(err);
        setloadingState(false)
    })
  }

  const homerBtn = () => {
    navigate("/home")
  }

  return (
    <div id='login_div'>
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
        <motion.nav id='nav_login'>
            <li className='li_login'>
                <div id='img_carier'></div>
            </li>
            <li className='li_login'>
                <nav>
                    <li>
                        <p id='label_login'>TranspoTrack</p>
                    </li>
                    <li>
                        {authenticationMark? (
                            <nav>
                                <li>
                                    <h4>You are already Logged In!</h4>
                                </li>
                                <li>
                                    <button id='btn_login' onClick={() => {homerBtn()}}>Go to Home</button>
                                </li>
                            </nav>
                        ) : (
                            <nav>
                                <li>
                                    <input type='text' placeholder='Email' className='input_login' value={email} onChange={(e) => {setemail(e.target.value)}} />
                                </li>
                                <li>
                                    <input type='password' placeholder='Password' className='input_login' value={password} onChange={(e) => {setpassword(e.target.value)}} />
                                </li>
                                <li>
                                    <select className='input_login' onChange={(e) => {setaccountType(e.target.value)}}>
                                        <option value='none'>--Select Account Type--</option>
                                        <option value='Commuter'>Commuter</option>
                                        <option value='Driver'>Driver</option>
                                    </select>
                                </li>
                                <li>
                                    <button id='btn_login' onClick={() => {loginTrigger()}}>Login</button>
                                </li>
                                <li>
                                    <p className='no_label_login'>No Account Yet? <Link to='/register'>Register here.</Link></p>
                                </li>
                            </nav>
                        )}
                    </li>
                </nav>
            </li>
        </motion.nav>
    </div>
  )
}

export default Login