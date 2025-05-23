import { NextResponse } from "next/server";
//api route to fill supabase database with all 2024season and postseason scores (2024+2024POST) and 2025
//This is just to fill supabase, since 2025 season is not until september, this information will not change
//Used by fetching api/football/allscores
export async function GET(request){

    try {

        const joinedData = {
                            reg: "",
                            post: "",
                            next:""
                            };

        console.log("trying to get all NFL scores")
        const response = await fetch(
                `https://api.sportsdata.io/v3/nfl/scores/json/Scores/2024?key=${process.env.NFL_API_KEY}`
                );
        if(!response.ok){
            const errorText = await response.text();
            console.error(`Error fetching reg season 2024:`, response.status, errorText);
            return NextResponse.json(
                { error: `error fetching  reg season 2024` },
                { status: response.status }
            );
        }
        
        const data = await response.json();
        console.log("adding data: ", data, "to join");
        joinedData.reg = data;
        const response2 = await fetch(
            `https://api.sportsdata.io/v3/nfl/scores/json/Scores/2024POST?key=${process.env.NFL_API_KEY}`
            );
        if(!response.ok){
            const errorText = await response.text();
            console.error(`Error fetching post season 2024:`, response.status, errorText);
            return NextResponse.json(
                { error: `error fetching  post season 2024` },
                { status: response.status }
            );
        }
        
        const data2 = await response2.json();
        joinedData.post = data2;

        const response3 = await fetch(
            `https://api.sportsdata.io/v3/nfl/scores/json/Scores/2025?key=${process.env.NFL_API_KEY}`
            );
        if(!response.ok){
            const errorText = await response.text();
            console.error(`Error fetching reg season 2025:`, response.status, errorText);
            return NextResponse.json(
                { error: `error fetching  reg season 2025` },
                { status: response.status }
            );
        }
        
        const data3 = await response3.json();
        console.log("this the 2025, ", data3)
        joinedData.next = data3;

        
        console.log("this the jnoindat",  joinedData);
        return NextResponse.json(joinedData, { status: 200 });
        
        } 
    catch (error) {
        console.error("this error:", error);
        return NextResponse.json({ error: "error here" }, { status: 500 });
    }
 
}