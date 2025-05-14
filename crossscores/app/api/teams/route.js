import { NextResponse } from "next/server";

export async function GET(){
    const res = await fetch('https://api.football-data.org/v4/teams?limit=500', {
        headers: {"X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}});
    
    if(!res.ok){
        console.log("something broke: ", error);
    }

    const data = await res.json();

    return Response.json(data, {status:200});


}