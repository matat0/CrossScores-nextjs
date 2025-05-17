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
    const fetchTeams = async () => {
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
                              id:row.id}
                            ));
      console.log("Team names:", newTeamList);
      setTeamList(newTeamList);
      console.log("teamList: ", teamList)
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
            .filter(t => t && t.name.toLowerCase().includes(e.target.value))
            .slice(0,8))
      }
  }

  function handleClick(s) {
    //add something that stops you from picking the same team twice

    console.log(s);

    if(addTeam){
      console.log("successfully drilled to click: ", s.id)
      addTeam(s)
    } else{
      console.log("didnt drill")
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
                              <img src={s.crest_url} alt={`crest  `} className="crest-img" />
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