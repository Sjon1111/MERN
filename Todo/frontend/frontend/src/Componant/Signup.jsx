// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import Axios from 'axios';
import {

  Link,

} from "react-router-dom"

import "../App.css"
export default function Signup() {
  const [fullName, setFullname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [contact, setcontact] = useState("")


  const submitTodo = async () => {
    const userData = {
      "fullname": fullName,
      "email": email,
      "password": password,
      "contact": contact
    }

    let response = await Axios.post("http://localhost:8000/insert", userData)
    let resData = response.data;
    console.log(resData)
  }


  return (
    <div className='box'>
      <form>
        <h3>Sign Up </h3>
        <div data-mdb-input-init className="form-outline mb-4">
          <input type="text" id="form2Example1" className="form-control" placeholder='Enter Full Name' value={fullName} onChange={(e) => setFullname(e.target.value)} />

        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <input type="email" id="form2Example1" className="form-control" placeholder='Enter Email' value={email} onChange={(e) => setemail(e.target.value)} />

        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <input type="password" id="form2Example2" className="form-control" placeholder='Create Password' value={password} onChange={(e) => setpassword(e.target.value)} />

        </div>



        <div data-mdb-input-init className="form-outline mb-4">
          <input type="number" id="form2Example2" className="form-control" placeholder='Enter Contact Number' value={contact} onChange={(e) => setcontact(e.target.value)} />

        </div>

        <div className="row mb-4">
          <div className="col d-flex justify-content-center">

          </div>


        </div>


        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4 " onClick={submitTodo}>Sign in</button>


        <div className="text-center">
          <p>Already User? <Link to="/">SignIn</Link ></p>



        </div>
      </form>
    </div>
  )
}
