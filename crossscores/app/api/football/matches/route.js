import { NextResponse } from "next/server";
import supabase from '../../../supabase'


//This should return the matches of all of the team passed in
export async function GET(request){
    const { searchParams } = new URL(request.url);
    const team = searchParams.get("team");
    try {
        const {data, error} = await supabase
                                    .from("football-scores")
                                    .select("date, home, home_score, away, away_score, week, season")
                                    .or(`home.eq.${team},away.eq.${team}`)
                                    .order('date', {ascending:true});
        console.log("Supabase data: ", data)

        
        
        return NextResponse.json(data, { status: 200 });
        
        } 
    catch (error) {
        console.error("this error:", error);
        return NextResponse.json({ error: "error here" }, { status: 500 });
    }
 
}