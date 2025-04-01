"use client";

import img1 from './assets/img1.png'
import img2 from './assets/img2.png'
import img3 from './assets/img3.png'
import './Welcome.css'


function Welcome() {
    const images = [img1,img2,img3];
    let index = Math.floor(Math.random() * 3);
    let img = images[index]

    function closePopup() {
        document.querySelector(".wcontainer").style.display = "none";
    }
    

    return(
        <div className="wcontainer">
            <div className="welcome-module">
                <img className='welcome-img' src={img} alt='Picture of Sport' width='200px'></img>
                <h2>Welcome To CrossScores!</h2>
                <p id="wbodytext">
                    Create fully customizeable trackers for any sports team
                    anywhere in the world.
                </p>

                <button className="begin" onClick={closePopup}>Begin</button>

                <p id="wcredits">Created by Matthew Bangit & Yohannes Gebrechristos</p>
            </div>
        </div>
    );

}

export default Welcome