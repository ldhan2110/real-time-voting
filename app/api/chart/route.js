export const dynamic = 'force-dynamic'

let chartData = [0,0,0,0];

export async function GET() {
  return Response.json({ data: chartData })
}

export async function POST(request) {

  const {data} = await request.json();

  //Return error message if no data
  if (!data) return Response.json({ "error": "Chart Data is required." });

  chartData = data;

  return Response.json({"success": "Success"});
}