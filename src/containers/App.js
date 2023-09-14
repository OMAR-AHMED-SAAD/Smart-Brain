import './css/App.css';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import Rank from '../components/Rank';
import ImageLinkFrom from '../components/ImageLinkForm';
import ParticlesBg from 'particles-bg'
// import FaceRecognition from '../components/FaceRecognition';

function App() {
  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank/>     
      <ImageLinkFrom />
       {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
