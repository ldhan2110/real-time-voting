import {setChartData} from '../chart/route';

export async function GET(request) {

  const url = new URL(request.url)

  const team1 = url.searchParams.get("team1");
  const team2 = url.searchParams.get("team2");
  const team3 = url.searchParams.get("team3");
  const team4 = url.searchParams.get("team4");

 setChartData([team1,team2,team3,team4]);

 return Response.json({"success": "Success"});
}