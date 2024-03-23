export async function GET(request) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    const resp = await fetch(`${process.env.BASE_URL}/getonetemplateeachcategory`, {
      method: 'GET',
      headers: headers,
    });
    if(!resp.ok) {
      throw new Error("Failed to Fetch Data");
    }
    const response = await resp.json();
    return Response.json({ data: response.data } );
    
  }