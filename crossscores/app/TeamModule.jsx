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


function TeamModule({team}) {
    
    const teamID = team.id;
    const teamName = team.name;
    const [matchList, setMatchList] = useState([]);
    const [scheduledMatch, setScheduledMatch] = useState(null); 

    function createMatch(home, away, date, league, score, status) {
        return { home, away, date, league, score, status };
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
                const home = match.homeTeam.name;
                const away = match.awayTeam.name;
                const date = match.utcDate;
                const league = match.competition.code;
                const status = match.status;

                let score = "-";
                if (status === "FINISHED") {
                    //if match is finished, add to list
                    score = `${match.score.fullTime.home} - ${match.score.fullTime.away}`;
                    recent.push(createMatch(home, away, date, league, score, status));
                }
            }

            for (let i = 0; i < matches.length; i++) {
                const match = matches[i];
                if (match.status === "SCHEDULED" || match.status === "TIMED") {
                    //if match is upcoming, replace match
                    //most recently replaced match will be the soonest match
                    const home = match.homeTeam.name;
                    const away = match.awayTeam.name;
                    const date = match.utcDate;
                    const league = match.competition.code;
                    const status = match.status;
                    const score = "-";
                    upcoming = createMatch(home, away, date, league, score, status);
                    break;
                }
            }

            setMatchList(recent);
            setScheduledMatch(upcoming);
        }

        setUpTeamModule();
    }, [teamID]);


    return(
        <>
            
            <div className="TeamModule">
                <div id='title-container'>
                    <h2 id='team-module-header'>{teamName}</h2>
                    <img src={team.crest_url}></img>
                </div>
                <TableContainer component={Paper} sx={{backgroundColor: 'transparent'}}>
                    <Table sx={{ color: "white" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "white" }}>Date</TableCell>
                                <TableCell sx={{ color: "white" }}>Home</TableCell>
                                <TableCell sx={{ color: "white" }}>Score</TableCell>
                                <TableCell sx={{ color: "white" }}>Away</TableCell>
                                <TableCell sx={{ color: "white" }}>League</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scheduledMatch && (
                                <TableRow sx={{ backgroundColor: "#222231" }}>
                                    <TableCell sx={{ color: "white" }}>{scheduledMatch.date}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{scheduledMatch.home}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{scheduledMatch.score}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{scheduledMatch.away}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{scheduledMatch.league}</TableCell>
                                </TableRow>
                            )}
                            {matchList.map((match, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ color: "white" }}>{match.date}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{match.home}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{match.score}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{match.away}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{match.league}</TableCell>
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