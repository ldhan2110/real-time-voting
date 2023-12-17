export const dynamic = 'force-dynamic'

let chartData = [0,0,0,0];

export function setChartData(param){
  chartData = param;
}

export async function GET() {
  return Response.json({ data: chartData })
}