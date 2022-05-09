import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Login from './components/defaulltcomponents/jsx/Login';
import Home from './components/usercomponents/jsx/Home';
import Register from './components/defaulltcomponents/jsx/Register';
import '@material-ui/core'

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  
  const [redirector, setredirector] = useState(false);

  useEffect(() => {
    if(location.pathname == "/")
    {
      navigate("/home");
    }
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home/*' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
