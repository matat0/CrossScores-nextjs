'use client'

import React, { useEffect, useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import supabase from './supabase'
import "./Searchbar.css"

const Searchbar = () => {

  const[teamList, setTeamList] = useState([]);
  const [activeSearch, setActiveSearch] = useState([])

  useEffect(() => {
    const fetchTeams = async () => {
      const {data, error} = await supabase.from("soccer-teams").select("name, crest_url");
      console.log("Supabase data: ", data)

      if(error){
        console.error("Error getting data from supabase: ", error)
        return;
      }


      const newTeamList = data
                            .filter(row => row.name)
                            .map(row => ({
                              name:row.name, 
                              crest_url: row.crest_url}
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

 
  return (
    <form className='search-form' onSubmit={(e) => e.preventDefault()}>
        <div className="search-container">
            <input type="search" placeholder='Type Here' className='search-input' onChange={(e) => handleSearch(e)}/>
            
        </div>

        {
            activeSearch.length > 0 && (
                <div className="search-items">
                    {
                        activeSearch.map(s => (
                            <button key={s.name} type="button" onClick={() => console.log("clicked ", s)}>
                              <img src={s.crest_url} alt={`crest  `} className="crest-img" />
                              <span >{s.name} </span>
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