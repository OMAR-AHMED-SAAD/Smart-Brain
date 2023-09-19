import React from "react";
import './css/Mode.css'
const Mode = ({setModel}) => {
    const print = (e) => {
      setModel(e.target.value)
    }
    return (
        <div className="mode-centering-container">
       <div className="mode-main-container">
        <h2>Choose Desired Mode</h2>
       <div className="mode-choice-container" >
            <form onChange={print} >
                <label>
                    <input type="radio" name="radio" defaultChecked value="face-detection" />
                    <span>Face-Detection</span>
                </label>
                <label>
                    <input type="radio" name="radio"  value="celebrity-face-detection" />
                    <span>Celebrity-Detection</span>
                </label>
            </form>
        </div>
        </div>
        </div>
    );
}

export default Mode;