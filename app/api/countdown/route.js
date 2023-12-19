export const dynamic = 'force-dynamic'

let startCountDown = "NO";

export async function GET(request) {
  const url = new URL(request.url)

  const start = url.searchParams.get("start");

  if (start == 'Y') startCountDown = 'YES'
  else startCountDown = 'NO'

  return Response.json({"success": "Success"});
}

export async function POST() {
  return Response.json({ data: startCountDown })
}