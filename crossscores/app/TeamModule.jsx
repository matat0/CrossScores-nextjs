"use client";
import './TeamModule/TeamModule.css'
import {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import utc from 'dayjs-plugin-utc';
import timezone from 'dayjs-timezone-iana-plugin';

dayjs.extend(utc);
dayjs.extend(timezone);

function TeamModule({team}) {
    
    const teamID = team.id;
    const teamName = team.name;
    const [matchList, setMatchList] = useState([]);
    const [scheduledMatch, setScheduledMatch] = useState(null); 

    function createMatch(home, away, date, time,  league, score, status, homeCrest, awayCrest) {
        return { home, away, date, time, league, score, status, homeCrest, awayCrest};
    }


    //run setup once module renders and if teamID changes
    useEffect(() => {
        async function setUpTeamModule() {
            console.log("making a new module to track teamID: ", teamID);
            const res = await fetch(`api/matches?team=${teamID}`);
            const data = await res.json();
            const matches = data.matches;

            const recent = [];
            let upcoming = "";

            //loop backwards from end of array (chronological order) to get most recent matches
            for (let i = matches.length - 1; i >= 0 && recent.length < 3; i--) {
                const match = matches[i];
                const home = match.homeTeam.tla;
                const away = match.awayTeam.tla;
                const homeCrest = match.homeTeam.crest;
                const awayCrest = match.awayTeam.crest;
                const date = dayjs.utc(match.utcDate).local().format('MMM DD, YYYY');
                const time = dayjs.utc(match.utcDate).local().format('h:mm A');
                const league = match.competition.emblem;
                const status = match.status;

                let score = "-";
                if (status === "FINISHED") {
                    //if match is finished, add to list
                    score = `${match.score.fullTime.home} - ${match.score.fullTime.away}`;
                    recent.push(createMatch(home, away, date, time, league, score, status, homeCrest, awayCrest));
                }
            }

            for (let i = 0; i < matches.length; i++) {
                const match = matches[i];
                if (match.status === "SCHEDULED" || match.status === "TIMED") {
                    //if match is upcoming, replace match
                    //most recently replaced match will be the soonest match
                    const home = match.homeTeam.tla;
                    const away = match.awayTeam.tla;
                    const homeCrest = match.homeTeam.crest;
                    const awayCrest = match.awayTeam.crest;
                    const date = dayjs.utc(match.utcDate).local().format('MMM DD, YYYY');
                    const time = dayjs.utc(match.utcDate).local().format('h:mm A');
                    const league = match.competition.emblem;
                    const status = match.status;
                    const score = "-";
                    upcoming = createMatch(home, away, date, time, league, score, status, homeCrest, awayCrest);
                    break;
                }
            }

            setMatchList(recent);
            setScheduledMatch(upcoming);
        }

        setUpTeamModule();
    }, [teamID]);

    console.log(scheduledMatch)
    return(
        <>
            
            <div className="TeamModule">
                <div id='title-container'>
                    <img src={team.crest_url} id="team-crest-url"></img>
                    <h2 id='team-module-header'>{teamName}</h2>
                </div>
                <TableContainer component={Paper} sx={{backgroundColor: 'transparent', boxShadow:10}}>
                    <Table sx={{ 
                        color: "white", 
                        '& .MuiTableCell-root': {color: 'white', borderBottom:'0px', fontFamily: 'var(--font-nunito)', fontWeight: 'bold', fontSize:15}
                        }}>
                        <TableHead >
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Home</TableCell>
                                <TableCell>Score</TableCell>
                                <TableCell>Away</TableCell>
                                <TableCell>League</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scheduledMatch && (
                                
                                <TableRow sx={{ backgroundColor: "#222231", boxShadow: 3 }}>
                                    <TableCell>
                                        <div className="date-container">
                                            <div>
                                               {scheduledMatch.date} 
                                            </div>
                                           <div>
                                                {scheduledMatch.time}
                                           </div>
                                        </div>
                                        </TableCell>
                                    <TableCell>
                                        <div className="crest-name-container" id="upcoming-home-container">
                                            <img src={scheduledMatch.homeCrest}></img>
                                            {scheduledMatch.home}
                                        </div>
                                    </TableCell>
                                    <TableCell>{scheduledMatch.score}</TableCell>
                                    <TableCell>
                                        <div className="crest-name-container" id="upcoming-away-container">
                                            <img src={scheduledMatch.awayCrest}></img>
                                            {scheduledMatch.away}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <img src={scheduledMatch.league} id="league-emblem"></img>
                                    </TableCell>
                                </TableRow>
                            )}
                            {matchList.map((match, index) => (
                                <TableRow key={index} sx={{boxShadow: 3 }}>
                                    <TableCell>
                                        <div className="date-container">
                                            <div>
                                                {match.date}
                                            </div>
                                            <div>
                                                {match.time} 
                                            </div>
                                        </div>
                                        </TableCell>
                                    <TableCell>
                                        <div className="crest-name-container" id="past-home-container">
                                            <img src={match.homeCrest}></img>
                                            {match.home}
                                        </div>
                                    </TableCell>
                                    <TableCell>{match.score}</TableCell>
                                    <TableCell>
                                        <div className="crest-name-container" id="past-away-container">
                                            <img src={match.awayCrest}></img>
                                            {match.away}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <img src={match.league} id="league-emblem"></img>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
            </div>
        </>
    );

}

export default TeamModule