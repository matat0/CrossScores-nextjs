import { AdsClick } from '@mui/icons-material';
import Header from '../Header.jsx';
import Welcome from '../Welcome.jsx';
import './home.css';
import Image from "next/image"
import img1 from '../assets/img1.png';

export default function Home() {
  return (
    <div>
      <Welcome/>
      <Header/>
      <div className="home-body-container">
          <div className="home-container">
            <h1>Home</h1>
            <div className="home-outer-container">
              <div className="home-inner-container">

                {/*<div className="home-header-container">
                  <h1>Welcome to CrossScores</h1>
                </div>*/}

                <div className="home-description-container">
                  <h2>How does CrossScores Work?</h2>

                  <div className="home-list-container">
                    <p>CrossScores utilizes a fully modular system. 
                      Allowing you to create and customize as many trackers
                      in any way, to your liking!</p>
                  </div>
                  <Image src={img1} alt="Sports Photo" width={400}/>
                </div>

              </div>
              <div className="home-steps-container">
                  <div className="steps" id="step1">
                    <h2>Step 1</h2>
                  </div>

                  <div className="steps" id="step2">
                    <h2>Step 2</h2>
                  </div>

                  <div className="steps" id="step3">
                    <h2>Step 3</h2>
                  </div>
              </div>
            </div>
          </div>


      </div>
    </div>
  );
}
