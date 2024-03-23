export async function GET(request) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    headers.append('Authorization', request.headers.get('Authorization'));
    const resp = await fetch(`${process.env.BASE_URL}/getalltestimonial`, {
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
    const resp = await fetch(`${process.env.BASE_URL}/createtestimonial`, {
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