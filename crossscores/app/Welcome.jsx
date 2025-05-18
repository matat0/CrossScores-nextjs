"use client";
import Image from "next/image"
import img1 from './assets/img1.png'
import img2 from './assets/img2.png'
import img3 from './assets/img3.png'
import img4 from './assets/img4.png'
import img5 from './assets/img5.png'
import img6 from './assets/img6.png'
import './Welcome/Welcome.css'
import { useEffect, useState} from "react";


function Welcome() {
    
    const [img,setImg] = useState(null);

    //let index = Math.floor(Math.random() * 3);
    //let img = images[index];

    function closePopup() {
        document.querySelector(".wcontainer").style.display = "none";
    }
    

    useEffect(() => {
        const images = [img1,img2,img3,img4,img5,img6];
        setImg(images[Math.floor(Math.random() * images.length)])
        
    },[]);

    if(!img) return null;

    return(
        <div className="wcontainer">
            <div className="welcome-module">
                <Image className='welcome-img' src={img} alt='Picture of Sport' width='200px'/>
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