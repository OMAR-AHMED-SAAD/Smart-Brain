import React from "react";
import './css/Navigation.css';

const Navigation = ({ route, setRoute }) => {

    const getHomeSignedin = () => {
        return <button className="nav-btn" onClick={()=>setRoute("homeOut")}> Log Out</button>
    }

    const getHomeSignedOut = () => {
        return <>
            <button className="nav-btn" onClick={()=>setRoute("signIn")}> Sign In</button>
            <button className="nav-btn" onClick={()=>setRoute("signUp")}> Register</button>
        </>
    }

    return (
        <nav className="nav">
            {route === "home" ? getHomeSignedin() : route === "homeOut" ? getHomeSignedOut() : <></>}
        </nav>
    );
}

export default Navigation;