"use client";

import { useState, useContext, createContext} from "react";
import TeamModule from "./TeamModule";
import Module from "./Module";
import NFLModule from "./NFLModule";
import NBAModule from "./NBAModule";

const TrackedTeamsContext = createContext();

function ModuleGrid(){
    const [trackedTeamList, setTrackedTeamList] = useState([]);

    function addTeam(teamObject)  {
        if(!trackedTeamList.some(t => t.id === teamObject.id && t.sport === teamObject.sport))
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
                        trackedTeamList.map((teamObject) => {
                            switch(teamObject.sport){
                                case "soccer":
                                    return <TeamModule key={teamObject.id} team={teamObject} />
                                case "football":
                                    console.log("trying to make NFLmodule, ", teamObject);
                                    return <NFLModule key={teamObject.id} team={teamObject} />
                                case "basketball":
                                    console.log('trying to make nba module', teamObject);
                                    return <NBAModule key={teamObject.id} team={teamObject} />
                            }
                        })
                    }
                    <Module/>
                </div>
            </TrackedTeamsContext.Provider>
        </>);

}

export default ModuleGrid

export {TrackedTeamsContext}