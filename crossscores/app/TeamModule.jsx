"use client";
import './TeamModule/TeamModule.css'
import {useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function TeamModule({teamID}) {
    const matchList = [];

    function createMatch(home, away, date, league, score) {
        /**
         * Creates a match object to display in the table based on the following parameters:
         * Home(str): home team
         * Away(str): away team
         * Date(Date): date of match
         * League(str): league code
         * Score("str"): score in format [x-y], x= home score, y= away score ex: "3-1"
         * 
         * 
         * 
         */
        return {home, away, date, league, score};
        }


    async function setUpTeamModule() {
        console.log("making a new module to track teamID: ", teamID)
        const res = await fetch(`api/matches?team=${teamID}`);
        const data = await res.json();
        //console.log("Data to make a new module: ", data);
        const matches = data.matches;
        //console.log("matches: ", matches)
        for (let i = matches.length - 1; i >= 0; i--) {
            if(matches.length >=4 ){
                break;
            }
            console.log("trying to make match for match date: ", matches[i].utcDate);

        }
            
    }
    

    setUpTeamModule();

    return(
        <>
            <div className="TeamModule">
                <h3>Module for teamID: {teamID}</h3>

                
            </div>
        </>
    );

}

export default TeamModule