"use client";

import { TrackedTeamsContext } from './ModuleGrid';
import { ModuleWindowContext } from './Module';
import React, { useContext, useEffect, useState } from 'react'
import supabase from './supabase'
import "./Searchbar/Searchbar.css"
const Searchbar = () => {
  const {addTeam} = useContext(TrackedTeamsContext);
  const {closeDropdown,
        setSelectedTeam
        } = useContext(ModuleWindowContext);
  const[teamList, setTeamList] = useState([]);
  const [activeSearch, setActiveSearch] = useState([])

        


  useEffect(() => {
    const readNFLTeams = async () => {
      try {
        const response = await fetch('/NFL_teams.json');

        if (!response.ok) {
          console.error("error trying to get the file at /NFL_teams.json");
          return;
        }

        const data = await response.json();
        console.log("NFL teams: ", data);

        return data;
      } catch (error) {
        console.error("fetch error: ", error);
      }

      
    };

    function createNFLTeams(NFLTeams){
      return NFLTeams.map(team=> ({
        name: team.city + " " + team.name,
        id: team.abr,
        crest_url: `https://static.www.nfl.com/t_headshot_desktop/f_auto/league/api/clubs/logos/${team.abr}`,
        sport: "football"
      }))
    }

    const readNBATeams = async () => {
      try {
        const response = await fetch('/NBA_teams.json');

        if (!response.ok) {
          console.error("error trying to get the file at /NFL_teams.json");
          return;
        }

        const data = await response.json();
        console.log("NFL teams: ", data);

        return data;
      } catch (error) {
        console.error("fetch error: ", error);
      }

      
    };

    function createNBATeams(NBATeams){
      return NBATeams.map(team=> ({
        name: team.full_name,
        id: team.id,
        crest_url: `https://a.espncdn.com/i/teamlogos/nba/500/${team.abbreviation}.png`,
        sport: "basketball"
      }))
    }

    const fetchTeams = async () => {
      const NFLrawjson = await readNFLTeams();
      const formattedNFLTeams = await createNFLTeams(NFLrawjson);
      console.log("transformed teams: ", formattedNFLTeams);

      const NBArawjson = await readNBATeams();
      const formattedNBATeams = await createNBATeams(NBArawjson);
      console.log("transformed NBA teams", formattedNBATeams);


      const {data, error} = await supabase.from("soccer-teams").select("name, crest_url, id");
      console.log("Supabase data: ", data)

      if(error){
        console.error("Error getting data from supabase: ", error)
        return;
      }


      const newTeamList = data
                            .filter(row => row.name)
                            .map(row => ({
                              name:row.name, 
                              crest_url: row.crest_url,
                              id:row.id, 
                              sport: "soccer"
                          }
                            ));


      const combined = [...newTeamList, ...formattedNFLTeams, ...formattedNBATeams];
      console.log("Combined team names:", combined);
      setTeamList(combined);
      


    };
    
    fetchTeams();

    
  },[]);
  
  

  const handleSearch = (e) => {
      if(e.target.value.toLowerCase() == ''){
          setActiveSearch([])
          return false
      }
      if(teamList && teamList.length > 0){
        setActiveSearch(
          teamList
            .filter(t => t && t.name.toLowerCase().includes(e.target.value.toLowerCase()))
            .slice(0,8))
      }
  }

  function handleClick(s) {
    //add something that stops you from picking the same team twice

    //console.log(s);

    if(addTeam){
      console.log("trying to add: ", s)
      addTeam(s)
    } else{
      //console.log("didnt drill")
    }
    if (setSelectedTeam) {
      setSelectedTeam(s.id);
    }

    if (closeDropdown) {
      closeDropdown();
    }
  }

 
  return (
    <form className='search-form' onSubmit={(e) => e.preventDefault()}>
        <div className="search-container">
            <input type="search" placeholder='Search your favorite sports teams' className='search-input' onChange={(e) => handleSearch(e)}/>
            
        </div>

        {
            activeSearch.length > 0 && (
                <div className="search-items">
                    {
                        activeSearch.map(s => (
                            <button className="button-results" key={s.name} type="button" onClick={() => handleClick(s)}>
                              <img src={s.crest_url} alt={``} className="crest-img" />
                              <span >{s.name}, {s.id} </span>
                            </button>
                        ))
                    }
                </div>
            )
        }


        
    </form>
  )
}

export default Searchbar