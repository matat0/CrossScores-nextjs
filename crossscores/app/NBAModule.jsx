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

function NBAModule({team}) {
    
    console.log("this is the team for nbamod")
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
            const res = await fetch(`api/basketball/matches?team=${teamID}`);
            const json = await res.json();
            console.log("datatat" , json)
            const matches = json.data;
            
            const recent = [];
            
            console.log("matchensd", matches);
            matches.pastGamesSorted.map((match)=>{
                console.log("match to make the real match lol", match)
                const home = match.home_team.abbreviation;
                const away = match.visitor_team.abbreviation;
                const homeCrest = `https://a.espncdn.com/i/teamlogos/nba/500/${match.home_team.abbreviation}.png`;
                const awayCrest = `https://a.espncdn.com/i/teamlogos/nba/500/${match.visitor_team.abbreviation}.png`;
                const date = dayjs.utc(match.datetime).format('MMM DD, YYYY');
                const time = dayjs.utc(match.datetime).format('h:mm A');
                const league = match.season;
                const status = (match.home_team_score == null? "SCHEDULED": "FINISHED");

                let score = "-";
                score = `${match.home_team_score} - ${match.visitor_team_score}`;
                recent.push(createMatch(home, away, date, time, league, score, status, homeCrest, awayCrest));
                
            })        
            let upcoming;       
            console.log("mache next game is this right here: ", matches.nextGame);
            if(matches.nextGame){
                console.log("im in herer")
                const match = matches.nextGame;
                
                const home = match.home_team.abbreviation;
                const away = match.visitor_team.abbreviation;
                const homeCrest = `https://a.espncdn.com/i/teamlogos/nba/500/${match.home_team.abbreviation}.png`;
                const awayCrest = `https://a.espncdn.com/i/teamlogos/nba/500/${match.visitor_team.abbreviation}.png`;
                const date = dayjs.utc(match.datetime).format('MMM DD, YYYY');
                const time = dayjs.utc(match.datetime).format('h:mm A');
                const league = match.season;
                

                const status = "SCHEDULED";

                let score = "-"
                upcoming = createMatch(home, away, date, time, league, score, status, homeCrest, awayCrest);
                console.log("upcoming thing this", upcoming);
                
                setScheduledMatch(upcoming);
            } else{
                
                setScheduledMatch(upcoming);
            }
            setMatchList(recent);
            
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
                                {/*<TableCell>League</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scheduledMatch && (
                                
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
                                    {/*<TableCell>
                                        <img src={scheduledMatch.league} id="league-emblem"></img>
                                    </TableCell>*/}
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
                                    {/*<TableCell>
                                        <img src={match.league} id="league-emblem"></img>
                                    </TableCell>*/}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
            </div>
        </>
    );

}

export default NBAModule