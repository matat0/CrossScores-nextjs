import { AdsClick } from '@mui/icons-material';
import Header from '../Header.jsx';
import Welcome from '../Welcome.jsx';
import './home.css';
import Image from "next/image"
import img1 from '../assets/img1.png';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SportsFootballRoundedIcon from '@mui/icons-material/SportsFootballRounded';
import Link from 'next/link';


export default function Home() {
  return (
    <div>
      <Welcome/>
      <Header/>
      <div className="home-body-container">
        <div className="burger-reminder-container">
          <ArrowUpwardRoundedIcon sx={{ fontSize: 28, color:'white', marginTop:'20px'}}></ArrowUpwardRoundedIcon>
          <h2>Click to access navigation!</h2>
        </div>
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
                    <div className="step-number-container">
                      <AddCircleRoundedIcon sx={{margin:'10px'}}></AddCircleRoundedIcon>
                      <h2>Step 1</h2>
                    </div>
                    <p>Click Add and begin searching for your favorite sports teams</p>
                  </div>

                  <div className="steps" id="step2">
                    <div className="step-number-container">
                      <SearchRoundedIcon sx={{margin:'10px'}}></SearchRoundedIcon>
                      <h2>Step 2</h2>
                    </div>
                    <p>Select a team from our database of varying sports</p>
                  </div>

                  <div className="steps" id="step3">
                    <div className="step-number-container">
                      <SportsFootballRoundedIcon sx={{margin:'10px'}}></SportsFootballRoundedIcon>
                      <h2>Step 3</h2>
                    </div>
                    <p>Keep adding more trackers of your favorite teams!</p>
                  </div>
              </div>
            </div>
              <div className="dashboard-home-button">
                <Link href="/">
                  <button id="home-button" className="begin">
                    <span>Dashboard</span>
                  </button>
                </Link>
              </div>
              
          </div>


      </div>
    </div>
  );
}
