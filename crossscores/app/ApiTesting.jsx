"use client";
import React, {useState, useEffect, useContext} from "react";
import supabase from "./supabase";
import "./ApiTesting/ApiTesting.css"

function ApiTesting(){
    /*
    Get all teams from api, add to supabase
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    


    const fetchTeams = async () => {
            const response = await fetch("/api/teams");

            if(!response.ok){
                console.log("something broke in apitesting: ", error);
            }

            const data = await response.json();
            setTeams(data.teams || []);
            insertTeamsToSupabase(data.teams);
            
            setLoading(false);
    };

    useEffect(() => {
        fetchTeams();

        const interval = setInterval(() => {
            fetchTeams();
        }, 30000000) //time in ms to fetch teams

        return () => clearInterval(interval);
    }, []);

    const insertTeamsToSupabase = async (teams) => {
        const{ data, error} = await supabase
            .from('soccer-teams')
            .upsert(teams.map((team) => ({
                name: team.name,
                shortname: team.shortName || "no_shortname",
                tla: team.tla || "000",
                crest_url: team.crest || "no_crest_url.png",
                leagues: [],
            })), 
            {onConflict: ['name']}
        );
        
        if(error){
            console.error("Error inserting into supabase: ", error);
        }else{
            console.log("teams inserted pog:", data)
        }
    }
    */

    async function addTeamsToSupabase(sport){
        if(sport == 'soccer'){
            const res = await fetch(`api/${sport}/teams?type=by-all-leagues`);
            const data = await res.json();

            const{teams} = data;

            for(const team of teams) {
                const {id, name, shortName:shortname, tla, crest:crest_url, leagueCode, venue} = team;

                const leagues = [leagueCode];
                console.log("this is a team:")
                console.log(team)
                const { error } = await supabase.from('soccer-teams').upsert(
                    {
                        id,
                        name,
                        shortname,
                        tla,
                        crest_url,
                        leagues,
                        venue
                    },
                    {
                        onConflict: 'id',
                        merge: ['name', 'shortname', 'tla', 'crest_url', 'leagues', 'venue']
                    }
                    );

                    if (error) {
                    console.error(`upsert error for ${name}:`, error.message, error.details);
                    }
            }
        }else if(sport=="football"){
            const res = await fetch(`api/${sport}/allscores`);
            const data = await res.json();

            console.log(data);

            for(const score of data.post) {
                const {
                    GameKey:id, 
                    Season:season,
                    HomeTeam:home,
                    HomeScore:home_score,
                    AwayTeam:away,
                    AwayScore:away_score,
                    Date:date,
                    Week:week
                    } = score;

                console.log("this is a 2024 post score:")
                console.log(score.Season)
                const { error } = await supabase.from('football-scores').upsert(
                    {
                        id,
                        season,
                        home,
                        home_score,
                        away,
                        away_score,
                        date,
                        week
                    }
                    );

                    if (error) {
                    console.error(`upsert error for ${name}:`, error.message, error.details);
                    }
            }

            for(const score of data.reg) {
                const {
                    GameKey:id, 
                    Season:season,
                    HomeTeam:home,
                    HomeScore:home_score,
                    AwayTeam:away,
                    AwayScore:away_score,
                    Date:date,
                    Week:week
                    } = score;

                console.log("this is a 2024 reg score:")
                console.log(score.Season)
                const { error } = await supabase.from('football-scores').upsert(
                    {
                        id,
                        season,
                        home,
                        home_score,
                        away,
                        away_score,
                        date,
                        week
                    }
                    );

                    if (error) {
                    console.error(`upsert error for ${name}:`, error.message, error.details);
                    }
            }

            for(const score of data.next) {
                const {
                    GameKey:id, 
                    Season:season,
                    HomeTeam:home,
                    HomeScore:home_score,
                    AwayTeam:away,
                    AwayScore:away_score,
                    Date:date,
                    Week:week
                    } = score;

                console.log("this is a 2025 score:")
                console.log(score.Season)
                const { error } = await supabase.from('football-scores').upsert(
                    {
                        id,
                        season,
                        home,
                        home_score,
                        away,
                        away_score,
                        date,
                        week
                    }
                    );

                    if (error) {
                    console.error(`upsert error for ${name}:`, error.message, error.details);
                    }
            }
        }
    }

    

    return (<div className="container">
                <h2>Team test:</h2>
                <button onClick={()=> addTeamsToSupabase('soccer')}>Update soccer teams in supabase</button>
                <button onClick={()=> addTeamsToSupabase('football')}>Update football teams in supabase</button>
                <ul>
                    {/* {teams.map((team) => {
                        console.log(`trying to add team: ${team.name} with id: ${team.id} shortname: ${team.shortname} and tla: ${team.tla}`);
                        return <li key={team.id}>{team.name}</li>
                        
                    })} */}

                </ul>
                </div>)


    
        
        

    
}

export default ApiTesting

