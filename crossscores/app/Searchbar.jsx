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
      const {data, error} = await supabase.from("soccer-teams").select("name");
      console.log("Supabase data: ", data)

      if(error){
        console.error("Error getting data from supabase: ", error)
        return;
      }

      

      const newTeamList = data.map(row => row.name);
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
        setActiveSearch(teamList.filter(t => t && t.toLowerCase().includes(e.target.value)).slice(0,8))
      }
  }

  return (
    <form className='search-form'>
        <div className="search-container">
            <input type="search" placeholder='Type Here' className='search-input' onChange={(e) => handleSearch(e)}/>
            <button className='search-button'>
                <AiOutlineSearch />
            </button>
        </div>

        {
            activeSearch.length > 0 && (
                <div className="search-items">
                    {
                        activeSearch.map(s => (
                            <span key={s}>{s}</span>
                        ))
                    }
                </div>
            )
        }


        
    </form>
  )
}

export default Searchbar