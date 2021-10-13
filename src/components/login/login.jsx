import React, { useContext, useState } from "react";
import loginImg from "../../login.svg";
import { signin } from "../../util/user";
import { AuthContext } from "../../service/authentication";
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';
const Login = (props) => {
  const authContext = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let history = useHistory();
  const { containerRef } = props;
  const handleSubmitPass = () => {
    history.push('/forgetpass')
  }
  const handleSubmit = async () => {
    const frmdetails = {
      email: email,
      password: password
    }

    const response = await signin(frmdetails);
    console.log(response, "response")
    if (response.data.success) {
      console.log("login sucessfull");
      authContext.dispatch({
        type: authContext.ActionTypes.LOGIN,
        payload: {
          user: response.data.user,
          token: response.data.token,
        },
      });
      // setRedirect(true);
    } else {
      console.log(response.data.error.message);
    }
  }


  if (redirect || authContext.state.isAuthenticated) {
    return (<Redirect to="/blogs" />);
  } else {
    return (
      <div className="base-container" ref={containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <input type="text" name="email" placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn"
            onClick={handleSubmit}
          >
            Login
          </button>

          <button type="button" className="btn"
            onClick={handleSubmitPass}
          >
            Forget Password ?
          </button>
        </div>
      </div>
    );
  }
};

export default Login