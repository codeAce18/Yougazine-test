const baseURL = "http://localhost:3005/v1";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const categoryId = searchParams.get('id');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    if (categoryId == null) {
      const resp = await fetch(`${process.env.BASE_URL}/getallcategory`, {
        method: 'GET',
        headers: headers,
      });
      if(!resp.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const response = await resp.json();
      return Response.json({ data: response.data} );
    } else {
      const resp = await fetch(`${process.env.BASE_URL}/getallcategory`, {
        method: 'GET',
        headers: headers,
      });
      if(!resp.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const response = await resp.json();
      return Response.json({ data: response.data.find(d => d.slug == categoryId)} );
    }
    
  }