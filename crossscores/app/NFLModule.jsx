"use client";
import './TeamModule/TeamModule.css'
import { TrackedTeamsContext } from './ModuleGrid';
import {useState, useContext, useEffect} from 'react'
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

function NFLModule({team}) {
    

    const teamID = team.id;
    const teamName = team.name;
    const [matchList, setMatchList] = useState([]);
    const [scheduledMatch, setScheduledMatch] = useState(null);
    const {removeTeam} = useContext(TrackedTeamsContext);
    const [hovered, setHovered] = useState(false);

    function createMatch(home, away, date, time,  league, score, status, homeCrest, awayCrest) {
        return { home, away, date, time, league, score, status, homeCrest, awayCrest};
    }


    //run setup once module renders and if teamID changes
    useEffect(() => {
        async function setUpTeamModule() {
            console.log("making a new module to track teamID: ", teamID);
            const res = await fetch(`api/football/matches?team=${teamID}`);
            const matches = await res.json();
            //const matches = data.matches;

            console.log("this foot data", matches)
            const recent = [];
            let upcoming = "";

            //loop backwards from end of array (chronological order) to get most recent matches
            for (let i = matches.length - 1; i >= 0 && recent.length < 3; i--) {
                const match = matches[i];
                const home = match.home;
                const away = match.away;
                const homeCrest = `https://static.www.nfl.com/t_headshot_desktop/f_auto/league/api/clubs/logos/${home}`;
                const awayCrest = `https://static.www.nfl.com/t_headshot_desktop/f_auto/league/api/clubs/logos/${away}`;
                const date = dayjs.utc(match.date).format('MMM DD, YYYY');
                const time = dayjs.utc(match.date).format('h:mm A');
                const league = match.season;
                const status = (match.home_score == null? "SCHEDULED": "FINISHED");

                let score = "-";
                if (status === "FINISHED") {
                    //if match is finished, add to list
                    score = `${match.home_score} - ${match.away_score}`;
                    recent.push(createMatch(home, away, date, time, league, score, status, homeCrest, awayCrest));
                }
            }

            for (let i = 0; i < matches.length; i++) {
                const match = matches[i];
                if (match.home_score == null) {
                    //if match is upcoming, replace match
                    //most recently replaced match will be the soonest match
                    const match = matches[i];
                    const home = match.home;
                    const away = match.away;
                    const homeCrest = `https://static.www.nfl.com/t_headshot_desktop/f_auto/league/api/clubs/logos/${home}`;
                    const awayCrest = `https://static.www.nfl.com/t_headshot_desktop/f_auto/league/api/clubs/logos/${away}`;
                    const date = dayjs.utc(match.date).format('MMM DD, YYYY');
                    const time = dayjs.utc(match.date).format('h:mm A');
                    const league = match.season;
                    const status = "SCHEDULED";

                    let score = "-"
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
                <div className="close-team-button">
                    <IconButton 
                        onMouseEnter={()=> {setHovered(true)}} 
                        onMouseLeave={()=>{setHovered(false)}}
                        sx={{ color: 'white' }}
                        onClick={() => removeTeam(team)}
                    >
                        {hovered ? (<DisabledByDefaultRoundedIcon sx={{scale:1.5}}></DisabledByDefaultRoundedIcon>) : (<CloseRoundedIcon></CloseRoundedIcon>) }
                    </IconButton>
                </div>
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
                            <TableRow sx={{backgroundColor:"#2b2c3b"}}>
                                <TableCell>Date</TableCell>
                                <TableCell>Home</TableCell>
                                <TableCell>Score</TableCell>
                                <TableCell>Away</TableCell>
                                {<TableCell>Season</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scheduledMatch ? (
                                
                                <TableRow className="scheduled-row" sx={{ 
                                    backgroundColor: "#222231", 
                                    boxShadow: 3, 
                                    height:125}}>
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
                                        {scheduledMatch.league}
                                    </TableCell>
                                </TableRow>
                            ) :<TableRow className="loading-row"  sx={{ 
                                    backgroundColor: "#222231", 
                                    boxShadow: 3, 
                                    height:125}}>
                                    <TableCell>
                                        <div className="date-container">
                                            <div>
                                               Loading... 
                                            </div>
                                           <div>
                                                
                                           </div>
                                        </div>
                                        </TableCell>
                                    <TableCell>
                                        <div className="crest-name-container" id="upcoming-home-container">
                                            Loading... 
                                        </div>
                                    </TableCell>
                                    <TableCell>Loading... </TableCell>
                                    <TableCell>
                                        <div className="crest-name-container" id="upcoming-away-container">
                                            Loading... 
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        Loading...
                                    </TableCell>
                                </TableRow> }
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
                                        {match.league}
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

export default NFLModule