import React, { useState, useEffect } from 'react'
import '../css/LoginRegister.css';
import Background from '../imgs/bgtranspo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { URL_ONE, URL_TWO } from '../../../variables';

function Login() {

  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [accountType, setaccountType] = useState("none");

  const loginTrigger = () => {
    // navigate("/home");
    Axios.post(`http://${URL_TWO}/getLogin`, {
        email: email,
        password: password,
        accountType: accountType
    }).then((response) => {
        if(response.data.status){
            if(accountType == "Commuter"){
                localStorage.setItem("tokencommuter", response.data.token);
                setemail("");
                setpassword("");
            }
            else if(accountType == "Driver"){
                localStorage.setItem("tokendriver", response.data.token);
                setemail("");
                setpassword("");
            }
        }
        else{
            alert(response.data.message);
        }
    }).catch((err) => {
        console.log(err);
    })
  }

  return (
    <div id='login_div'>
        <nav id='nav_login'>
            <li className='li_login'>
            </li>
            <li className='li_login'>
                <nav>
                    <li>
                        <p id='label_login'>TranspoTrack</p>
                    </li>
                    <li>
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
                    </li>
                </nav>
            </li>
        </nav>
    </div>
  )
}

export default Login