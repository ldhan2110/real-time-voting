export const dynamic = 'force-dynamic'

let timerServer = {
  duration: 0,
  startTime: null,
  started: false
}

export async function GET() {
  return Response.json({ data: timerServer })
}

export async function POST(request) {
  const {duration, started, startTime} = await request.json();

  timerServer = {
    duration: duration,
    startTime: startTime,
    started: started
  }

  return Response.json({ "success": "Success" })
}