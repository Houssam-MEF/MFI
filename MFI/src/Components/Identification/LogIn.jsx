import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Content from '../../Content.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MfiContext } from '../../Context/MfiContext';
import axios from 'axios';
import SignUp from './SignUp';
import { useNavigate } from 'react-router';


export default function Login() {

  // const {logIn} = useContext(MfiContext)

  const {login} = useContext(MfiContext)

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loginResult, setLoginResult] = useState('hady result d fonction');


  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const token = await login(username, password)
      console.log(token)
      setLoginResult(token)
    } catch (err) {
      setLoginResult(err.message)
    }
  }

  


  return (
    <>
    

    <h1>Login Page</h1>
    <div id="insert" className='container bg-light justify-content-center m-auto p-4 row' style={{border:"2px solid"}}>
      <div className="form-row row p-1 col-md-5" id='form'>   
      {loginResult && <div>{loginResult}</div>}

            
        <div className="form-group col-md-12 p-3" id='id_' >
          <label htmlFor="id">{Content["ENG"]["Identification"]["Username"]}</label>
          <input type="text" className=""
          value={username} onChange={(e)=>setUsername(e.target.value)} />
          </div>
        
        <div className='col-md-1'></div>
        <div className="form-group col-md-12 p-3">
          <label htmlFor="matricule">{Content["ENG"]["Identification"]["Password"]}</label>
          <input type="password" className="" id="matricule"
          value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>

        <div className='col-md-1'></div>

        <button className="btn btn-primary" onClick={handleLogin}> Primary </button>

      </div>
    </div>


    </>
  )
}
