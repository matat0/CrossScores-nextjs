import Header from '../Header.jsx';
import Image from 'react';
import './about.css';
import logo from '../assets/logo.png'

export default function About() {
  return (
    <div>
        <Header/>
        <div className="about-body-container">
            <div className="about-container">
                <div className="about-header-container">
                   <img src={logo.src}></img>
                    <h1>About CrossScores</h1> 
                </div>
                
                <div className="about-description-container">
                    <p>CrossScores aims to allow full modular control of trackers for your favorite sports teams.
                        Being fans of teams from varying sports, leagues, countries, etc. it became a hassle
                        trying to keep up with when the next game is.
                    </p>

                    <p>Because of this, we created CrossScores which allows us to easily track any team from any
                        league or sport and simply display the next upcoming game.
                        
                    </p>
                    <h2>Contact Us</h2>
                    <p>Matthew Bangit: mbangit1@terpmail.umd.edu</p>
                    <p>Yohannes Gebrechirstos: ygebrech@terpmail.umd.edu</p>
                </div>
            </div>
        </div>  
    </div>
  
  );
}