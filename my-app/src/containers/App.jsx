import { useState, useEffect } from 'react';
import './css/App.css';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import Mode from "../components/Mode"
import Rank from '../components/Rank';
import ImageLinkFrom from '../components/ImageLinkForm';
import ParticlesBg from 'particles-bg'
import FaceRecognition from '../components/FaceRecognition';
import NameList from '../components/NameList';
import SignIn from '../components/SignIn';

function App() {
  const [input, setInput] = useState(null);
  const [imageURL, setImageURl] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [model, setModel] = useState('face-detection');
  const [celebrities, setCelebrities] = useState([]);
  const [route, setRoute] = useState('homeOut')
  const [user, setUser] = useState({
    id: null,
    email: "",
    username: "",
    password: "",
    entries: 0,
    Date: null
  })


  useEffect(() => {
    setInput(null);
    setImageURl(null);
    setBoxes([]);
    setCelebrities([]);
  }, [route]);


  const onInputChange = (event) => {
    setInput(event.target.value)
  }
  const onDetectNormalClick = () => {
    if (!input)
      return;
    setImageURl(input)
    setBoxes([])
    callClarfaiAPI().then(response => response.json()).then(calculateBoxes)
      .then(result => { setBoxes(result); incrementEntries(); })
      .catch(error => console.log('error', error));
  }

  const onDetectCelebrityClick = () => {
    if (!input)
      return;
    setImageURl(input)
    setBoxes([])
    callClarfaiAPI().then(response => response.json())
      .then(resp => { setBoxes(calculateBoxes(resp)); setCelebrities(getCelebrityNames(resp)); incrementEntries(); })
      .catch(error => console.log('error', error));
  }
  const callClarfaiAPI = () => fetch("http://localhost:3000/image", { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ modelId: model, url: input }) });

  const calculateBoxes = response => {
    const boundingBoxes = response.outputs[0].data.regions.map(region => region.region_info.bounding_box)
    const image = document.getElementById('input-img');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    return (
      boundingBoxes.map(box => {
        return {
          left: box.left_col * imageWidth,
          top: box.top_row * imageHeight,
          right: imageWidth - (box.right_col * imageWidth),
          bottom: imageHeight - (box.bottom_row * imageHeight)
        }
      }))
  };

  const getCelebrityNames = (response) => {
    const celebrityNames = response.outputs[0].data.regions.map(region => region.data.concepts[0].name)
    return celebrityNames;
  }

  const getHome = () => {
    return <>
      <ParticlesBg type="cobweb" color="#ffffff" bg={true} />
      <Navigation route={route} setRoute={setRoute} />
      <div className='logo-rank-container' >
        {/* <div style={{ display:'inline-block', position: "absolute", left: 0 }}><Logo/></div>  */}
        <Logo className={"homeLogo"} />
        <Rank name={user.username} entries={user.entries} route={route} />
      </div>
      <Mode setModel={setModel} />
      {model === "face-detection" ?
        <ImageLinkFrom content={"faces that appear in the image"} onInputChange={onInputChange} onDetectClick={onDetectNormalClick} />
        : <ImageLinkFrom content={"which celebrities are in the image"} onInputChange={onInputChange} onDetectClick={onDetectCelebrityClick} />}
      <div className='face-recognition-module'><FaceRecognition imageURL={imageURL} boxes={boxes} model={model} />
        {model === "celebrity-face-detection" ? <NameList names={celebrities} /> : <></>}</div>
    </>
  }

  const getSignIn = () => {
    return <>
      <ParticlesBg type="polygon" color="#ffffff" bg={true} />
      <SignIn setUser={setUser} formtype={"Sign In"} reference={"Register"} setRoute={setRoute} />
    </>
  }
  const getSignUp = () => {
    return <>
      <ParticlesBg type="square" color="#ffffff" bg={true} />
      <SignIn setUser={setUser} formtype={"Sign Up"} reference={"Go back to login"} setRoute={setRoute} />
    </>
  }

  const incrementEntries = () => {
    if (route !== "home")
      return;
    fetch("http://localhost:3000/image", {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user.id
      })
    }).then(response => response.json()).then(count => setUser({ ...user, entries: count }))
      .catch(err => console.log("error", err))
  }
  return (
    <div className="App">
      {route.includes("home") ? getHome() : route === "signIn" ? getSignIn() : getSignUp()}
    </div>
  );
}

export default App;
