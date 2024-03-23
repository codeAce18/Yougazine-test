export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    const resp = await fetch(`${process.env.BASE_URL}/getallfaq`, {
      method: 'GET',
      headers: headers,
    });
    if(!resp.ok) {
      throw new Error("Failed to Fetch Data");
    }
    const response = await resp.json();
    return Response.json({ ...response } );
    
  }