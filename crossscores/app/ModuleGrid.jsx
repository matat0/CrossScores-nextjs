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
            alert("You have already added this team.");
        }
    }

    function removeTeam(teamObject){
        setTrackedTeamList(trackedTeamList.filter(t => t.id !== teamObject.id));
    }

    const contextValue = {
        trackedTeamList,
        addTeam,
        removeTeam
    }

    return(
        <>
            <TrackedTeamsContext.Provider value={contextValue}>
                <div className="module-grid-container">
                    {
                        trackedTeamList.map((teamObject) => (
                        <TeamModule key={teamObject.id} team={teamObject}/>
                        ))
                    }
                    <Module/>
                </div>
            </TrackedTeamsContext.Provider>
        </>);

}

export default ModuleGrid

export {TrackedTeamsContext}