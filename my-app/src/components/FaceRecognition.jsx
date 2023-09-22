import "./css/FaceRecognition.css"

const FaceRecognition = ({ imageURL, boxes,model}) => {
    return (
       
            <div  className="main-image-container">
                <img id="input-img" src={imageURL} alt="" />
                {boxes.map((box, i) => <><div key={i*200} className="bounding-box" style={box}
                > 
                {model==="celebrity-face-detection"?<h2 key={i+100} style={{bottom:"100%"}}>{i+1}</h2>:<></>}</div> </>)}
            </div>
       
    );
}

export default FaceRecognition;