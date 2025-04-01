"use client";
import React, {useState, useEffect, useContext} from "react";
import supabase from "./supabase";

function ApiTesting(){

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
        }, 300000)

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
            })))

        if(error){
            console.error("Error inserting into supabase: ", error);
        }else{
            console.log("teams inserted pog:", data)
        }
    }
    

    return (<div>
                <h2>Team test:</h2>
                <ul>
                    {teams.map((team) => {
                        console.log(`trying to add team: ${team.name} with id: ${team.id} shortname: ${team.shortname} and tla: ${team.tla}`);
                        return <li key={team.id}>{team.name}</li>
                        
                    })}
                </ul>
                </div>)


    
        
        

    
}

export default ApiTesting

