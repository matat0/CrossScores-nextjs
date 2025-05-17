"use client";

import { useState, useContext, createContext} from "react";
import TeamModule from "./TeamModule";
import Module from "./Module";

const TrackedTeamsContext = createContext();

function ModuleGrid(){
    const [trackedTeamList, setTrackedTeamList] = useState([]);

    function addTeam(teamObject)  {
        if(!trackedTeamList.some(t => t.id === teamObject.id))
            setTrackedTeamList([...trackedTeamList, teamObject])
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
                    trackedTeamList.map((teamObject) => (
                    <TeamModule key={teamObject.id} team={teamObject}/>
                    ))
                }
                <Module/>
            </TrackedTeamsContext.Provider>
        </>);

}

export default ModuleGrid

export {TrackedTeamsContext}