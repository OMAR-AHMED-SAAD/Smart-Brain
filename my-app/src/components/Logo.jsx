import React from "react";
import './css/Logo.css';
import Tilt from 'react-parallax-tilt';
import brain from './imgs/brain.png'

const Logo = ({ style }) => {
  return (
    <Tilt className="tilt" style={style}>
      <div className="inner-tilt">
        <img src={brain} alt="logo" />
      </div>
    </Tilt>
  );
}

export default Logo;