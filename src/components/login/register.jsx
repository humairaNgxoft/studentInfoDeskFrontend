import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import loginImg from "../../login.svg";
import { api } from '../../util/api'
const Register = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const history = useHistory();



  const signup = async (e) => {
    console.log(e, "sdabj")
    
    let role;
    const params =
    {
      username: username,
      email: email,
      password: password,
      role: 'admin'
    }
    console.log(params)
    const response = await api.post("/user/signup", params, {
      headers: {
        "Content-Type": "application/json",
      },
    }
    );

    if (response.data.success) {
      console.log("user registered successfully");
      history.push("/blogs");
    } else {
      console.log(response.data.error.message);
    }

    console.log(response);
  }



  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Register</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" name="password" placeholder="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button onClick={() => signup()} type="button" className="btn">
          Register
        </button>
      </div>
    </div>
  )
}

export default Register
