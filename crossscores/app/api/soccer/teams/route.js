import { NextResponse } from "next/server";
//api route to get all the teams within the following leagues
/*
  Leagues confirmed working:
  Premier League: PL
  La Liga/Primera Division: PD
  Bundesliga: BL1
  Eredivisie - DED
  Serie a -SA
  Serie a brazil -BSA
  Ligue 1 - FL1
  Primera liga - PPL
  UEFA Champions League - CL
 */
const leagueCodes = ["PL", "PD", "BL1", "DED", "SA", "BSA", "FL1", "PPL", "CL" ];
 
export async function GET(request){
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  let res;

  let allTeams = [];

  try {
    if (type === "by-all-leagues") {
      // by all leagues
      console.log("trying to get all leagues in the code list")
      for (const code of leagueCodes) {
        const response = await fetch(`https://api.football-data.org/v4/competitions/${code}/teams`, {
          headers: {
            "X-Auth-Token": process.env.FOOTBALL_API_KEY,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error fetching ${code}:`, response.status, errorText);
          continue; 
        }

        const data = await response.json();

        //console.log(data);
        // push each team with league info
        for (const team of data.teams) {
          allTeams.push({
            ...team,
            leagueCode: code, 
          });
        }
      }

      return NextResponse.json({ teams: allTeams }, { status: 200 });

    } else {
      
      return NextResponse.json({ error: "put a type for the request" }, { status: 400 });

      /*
      if (!res.ok) {
        const errorText = await res.text();
        console.error("API Error:", res.status, errorText);
        return NextResponse.json({ error: "error in this place" }, { status: res.status });
      }

      const data = await res.json();
      return NextResponse.json(data, { status: 200 });
      */
    }
  } catch (error) {
    console.error("this error:", error);
    return NextResponse.json({ error: "server died or something idk" }, { status: 500 });
  }
  
  
  /*
    const {searchParams} = new URL(request.url);
    const type = searchParams.get('type');
    const leagueCode = searchParams.get("league");

    let res;

    try {
      //based on get request,
        if (type === "by-league" && leagueCode) {
          //teams from a specific league
          res = await fetch(`https://api.football-data.org/v4/competitions/${leagueCode}/teams`, {
            headers: {
              "X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY
            },
          });
        } else {
          //fetch all teams
          res = await fetch('https://api.football-data.org/v4/teams?limit=500', {
            headers: {
              "X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY
            },
          });
        }
    
        //if something broke, error
        if (!res.ok) {
          const errorText = await res.text();
          console.error("API Error:", res.status, errorText);
          return NextResponse.json({ error: "fetching data from football API" }, { status: res.status });
        }
    
        const data = await res.json();
        return NextResponse.json(data, { status: 200 });
      } catch (error) {
        console.error("error in GET:", error);
        return NextResponse.json({ error: "error in this place" }, { status: 500 });
      }*/



    /*
    const res = await fetch('https://api.football-data.org/v4/teams?limit=500', {
        headers: {"X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}});
    
    if(!res.ok){
        console.log("something broke: ", error);
    }

    const data = await res.json();

    return Response.json(data, {status:200});
    */


}