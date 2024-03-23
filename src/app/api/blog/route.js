export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const blogId = searchParams.get('id');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    if (blogId == null) {
      const resp = await fetch(`${process.env.BASE_URL}/getallblog`, {
        method: 'GET',
        headers: headers,
      });
      if(!resp.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const response = await resp.json();
      return Response.json({ ...response } );
    } else {
      const resp = await fetch(`${process.env.BASE_URL}/getallblog`, {
        method: 'GET',
        headers: headers,
      });
      if(!resp.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const response = await resp.json();
      return Response.json({ ...response.data.find(d => d._id == blogId)} );
    }
    
  }