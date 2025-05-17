import { NextResponse } from "next/server";
//api route to get info on matches for a specific team
//Used by fetching api/matches?team=${id}
export async function GET(request){
  const { searchParams } = new URL(request.url);
  const team = searchParams.get("team");




    try {
    // team = id of team
        if(!team){
            return NextResponse.json({ error: "no team ID given" }, { status: 400 });

        }


        console.log("trying to get matches for team: ", team)
        const response = await fetch(`http://api.football-data.org/v4/teams/${team}/matches`, {
        headers: {
            "X-Auth-Token": process.env.FOOTBALL_API_KEY,
            },
        });

        if(!response.ok){
            const errorText = await response.text();
            console.error(`Error fetching ${team}:`, response.status, errorText);
            return NextResponse.json(
                { error: `error fetching matches for team ${team}` },
                { status: response.status }
            );
        }
        
        const data = await response.json();
        console.log(data);
        return NextResponse.json(data, { status: 200 });
        
        } 
    catch (error) {
    console.error("this error:", error);
    return NextResponse.json({ error: "error here" }, { status: 500 });
    }
 
}