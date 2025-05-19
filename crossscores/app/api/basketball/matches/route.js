import { NextResponse } from "next/server";

//api route to get all the NBA teams, just to fill supabase
//Used by fetching api/basketball/teams?team=${id}
export async function GET(request){
    const { searchParams } = new URL(request.url);
    const team = searchParams.get("team");
    console.log("this the req: " , request);



    try {
    // team = id of team
        if(!team){
            return NextResponse.json({ error: "no team ID given" }, { status: 400 });

        }

        const season = 2024;

        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];


        const pastGamesRes = await fetch(`https://api.balldontlie.io/v1/games?team_ids[]=${team}&seasons[]=${season}&end_date=${today}&per_page=100`, { headers: {
            Authorization: process.env.BALLDONTLIE_API_KEY
            }
        });
        console.log("this the url pls work", `https://api.balldontlie.io/v1/games?team_ids[]=${team}&seasons[]=${season}&end_date=${today}&per_page=100`)
        console.log("json respo past games", pastGamesRes)
        const pastGamesData = await pastGamesRes.json();
        console.log("past game json data:", pastGamesData)
        const pastGamesSorted = pastGamesData.data
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);

        console.log("past 3 games: ", pastGamesSorted);


        const futureGamesRes = await fetch(`https://api.balldontlie.io/v1/games?team_ids[]=${team}&seasons[]=${season}&start_date=${tomorrow}&per_page=10`, { headers: {
            Authorization: process.env.BALLDONTLIE_API_KEY
            }
        });
        const futureGamesData = await futureGamesRes.json();
        console.log("next games data: ", futureGamesData);
        const nextGame = futureGamesData.data
            .sort((a, b) => new Date(a.date) - new Date(b.date))[0] || null;
        console.log("next game: ", nextGame);
        
        const data ={pastGamesSorted, nextGame};
        return NextResponse.json({data, status:200});

        
        
        
        
        } 
    catch (error) {
    console.error("error in try get basketball api", error);
    return NextResponse.json({ error: "error here" }, { status: 500 });
    }
 
}