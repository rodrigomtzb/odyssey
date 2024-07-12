import { Link } from "react-router-dom";

import React from 'react'

const Login = () => {
  return (

    <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
 
            <form>
                <div className="cnt-img-lgn">
                  <img src="../src/assets/img/logo02.png" />
                </div>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    />
                </div>

                <div className="d-grid">
                    <Link to="dashboard" className="btn btn-primary">
                    Entrar
                    </Link>
                </div>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
                </form>

                </div>
        </div>

        </div>
  )

}


export default Login