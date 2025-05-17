"use client";

import { useState, useContext, createContext} from "react";
import TeamModule from "./TeamModule";
import Module from "./Module";

const TrackedTeamsContext = createContext();

function ModuleGrid(){
    const [trackedTeamList, setTrackedTeamList] = useState([]);

    function addTeam(teamID)  {
        if(!trackedTeamList.includes(teamID))
            setTrackedTeamList([...trackedTeamList, teamID])
        else{
            alert("you already added this team");
        }
    }

    function removeTeam(teamID){
        setTrackedTeamList(trackedTeamList.filter(id => id !== teamID));
    }

    const contextValue = {
        trackedTeamList,
        addTeam,
        removeTeam
    }

    return(
        <>
            <TrackedTeamsContext.Provider value={contextValue}>
                {
                    trackedTeamList.map((id) => (
                    <TeamModule key={id} teamID={id}/>
                    ))
                }
                <Module/>
            </TrackedTeamsContext.Provider>
        </>);

}

export default ModuleGrid

export {TrackedTeamsContext}