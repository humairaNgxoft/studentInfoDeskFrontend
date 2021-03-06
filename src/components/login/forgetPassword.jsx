import React, { useContext, useState } from "react";
// import loginImg from "../../login.svg";
// import { signin } from "../../util/user";
import { AuthContext } from "../../service/authentication";
import { Redirect } from "react-router-dom";
import { forgetPass } from "../../util/user";


const PasswordForgotten = (props) => {
    const authContext = useContext(AuthContext);

    const [redirect, setRedirect] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { containerRef } = props;

    const handleSubmit = async () => {
        const frmdetails = {
            email: email,
            password: password,

        }

        const response = await forgetPass(frmdetails);
        console.log(response, "response")
        // if (response.data.success) {
        //   console.log("login sucessfull");
        //   authContext.dispatch({
        //     type: authContext.ActionTypes.LOGIN,
        //     payload: {
        //       user: response.data.user,
        //       token: response.data.token,
        //     },
        //   });
        // setRedirect(true);
        //     } else {
        //       console.log(response.data.error.message);
        //     }
    }


    // if (redirect || authContext.state.isAuthenticated) {
    //     return (<Redirect to="/" />);
    // } else {
    return (
        <div className="base-container" ref={containerRef}>
            <div className="header">forget Pass</div>
            <div className="content">

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
            </div>
        </div>
    );
}
// };

export default PasswordForgotten