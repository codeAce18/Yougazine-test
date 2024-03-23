export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const templateId = searchParams.get('id');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    headers.append('Authorization', request.headers.get('Authorization'));
    const resp = await fetch(`${process.env.BASE_URL}/getallreview/${templateId}`, {
      method: 'GET',
      headers: headers,
    });
    if(!resp.ok) {
      throw new Error("Failed to Fetch Data");
    }
    const response = await resp.json();
    return Response.json({ ...response } );
  }

  export async function POST(request) {
    const data = await request.json();
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    headers.append('Authorization', request.headers.get('Authorization'));
    const resp = await fetch(`${process.env.BASE_URL}/createreview`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });
    if(!resp.ok) {
      throw new Error("Failed to Fetch Data");
    }
    const response = await resp.json();
    console.log(response);
    return Response.json({ ...response } );
  }