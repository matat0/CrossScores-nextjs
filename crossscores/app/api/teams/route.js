import { NextResponse } from "next/server";

export async function GET(){
    const res = await fetch('https://api.football-data.org/v4/teams?limit=500', {
        headers: {"X-Auth-Token": "e7bbd1f177554369ab2ede0a91eac908"}});
    
    if(!res.ok){
        console.log("something broke: ", error);
    }

    const data = await res.json();

    return Response.json(data, {status:200});


}