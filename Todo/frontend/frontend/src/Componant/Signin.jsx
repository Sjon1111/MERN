// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import Axios from 'axios';
import {

  Link,

} from "react-router-dom"

import "../App.css"
import Todo from './Todo';



export default function Signin() {

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [res, setres] = useState("");
  const login = async () => {
    const loginData = {
      userName: username,
      passWord: password
    }
    let responce = await Axios.post("http://localhost:8000/login", loginData)
    let d = responce.data;
    if (d == "yes") {
      setres(d)
      console.log(res)


    }
    else {
      console.log("not found")
    }


  }
  return (
    <>  {(res == "yes") ? <Todo loginuser={username} /> :
      <>
        <h1> </h1>
        <div className='box'>
          <form>
            <h3>Login </h3>
            <div data-mdb-input-init className="form-outline mb-4">
              <input type="email" id="form2Example1" className="form-control" placeholder='Enter Username' value={username} onChange={(e) => setusername(e.target.value)} />

            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type="password" id="form2Example2" className="form-control" placeholder='Enter Password' value={password} onChange={(e) => setpassword(e.target.value)} />

            </div>


            <div className="row mb-4">
              <div className="col d-flex justify-content-center">

              </div>


            </div>


            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4 " onClick={login}>Sign in</button>


            <div className="text-center">
              <p>New User? <Link to="/signup">Register</Link ></p>



            </div>
          </form>

        </div>
      </>}
    </>)
}
