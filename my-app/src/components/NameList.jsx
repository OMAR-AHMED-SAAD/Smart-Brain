import React from "react";
import "./css/NameList.css"
const NameList = ({names}) => {
    return (
<div className="names-list">
        <ul>
            {names.map((name,i) => <li key={i}>{name}</li>)}
        </ul>
</div>

    );
}

export default NameList;
