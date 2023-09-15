import React from "react";
import "./css/SignIn.css";
import Logo from "./Logo";
const SignIn = ({ formtype, reference, setRoute }) => {
    const handleChange = (e) => {
        e.preventDefault();
        if (formtype === "Sign In") 
            setRoute("signUp")
        else
           setRoute("signIn")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formtype === "Sign In") 
            setRoute("home")
        else
           setRoute("signIn")
    }
    return (
        <div className="signin-container">
            <div className="signin-form">
                <Logo style={{ height: "75px", width: "75px" }} />
                <h1>{formtype}</h1>
                {formtype === "Sign In" ? <></> : <input type="text" placeholder="Email" />}
                <input type="text" placeholder="Username" required />
                <input type="text" placeholder="Password" required />
                <button className="login-btn" onClick={handleSubmit}>{formtype}</button>
                <a href="#" onClick={handleChange}>{reference}</a>
            </div>
        </div>
    );
}

export default SignIn;