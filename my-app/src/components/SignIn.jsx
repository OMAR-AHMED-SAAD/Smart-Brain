import "./css/SignIn.css";
import Logo from "./Logo";
import { useState } from "react";
const SignIn = ({ formtype, reference, setRoute, setUser }) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);

    const handleChange = (e) => {
        e.preventDefault();
        if (formtype === "Sign In")
            setRoute("signUp")
        else
            setRoute("signIn")
    }

    const handleSubmit = () => {
        let formTypeCheck = "";
        formtype === "Sign In" ? formTypeCheck = "signin" : formTypeCheck = "register";
        fetchApi(formTypeCheck).then(response => response.json()).then(user => {
            if (user?.id) {
                setUser(user)
                setRoute("home")
            }
            else
                showError()
        }).catch(error => console.log('error from signin/registeration', error))
    }

    const fetchApi = (type) => {
        return fetch(`http://localhost:3000/${type}`, {
            method: "post",
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
    }
    const setUserName = (e) => {
        setUsername(e.target.value);
    }

    const setMail = (e) => {
        setEmail(e.target.value);
    }
    const setPass = (e) => {
        setPassword(e.target.value);
    }
    const showError = () => {
        const errorMsg = document.getElementById("error")
        errorMsg.style.color = " rgba(255, 0, 0,1)"
        errorMsg.style.backgroundColor = " rgba(255, 255, 255,1)"

    }

    return (
        <div key={formtype} className="signin-container">
            <div className="signin-form">
                <Logo style={{ height: "75px", width: "75px" }} />
                <h1>{formtype}</h1>
                {formtype === "Sign In" ? <></> : <input type="text" placeholder="Email" name="email" onChange={setMail} />}
                <input id="in" type="text" placeholder="Username" name="username" onChange={setUserName} />
                <input type="text" placeholder="Password" name="password" onChange={setPass} />
                <p id="error">Invalid username or password !</p>
                <button type="button" className="login-btn" onClick={handleSubmit}>{formtype}</button>
                <a href="#" onClick={handleChange}>{reference}</a>
            </div>

        </div>
    );
}

export default SignIn;