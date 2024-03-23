export async function GET(request) {
    try {
      const searchParams = request.nextUrl.searchParams
    const templateId = searchParams.get('id');
    const templateSlug = searchParams.get('slug');
    const categoryId = searchParams.get('category');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    if(categoryId !== null) {
      const resp = await fetch(`${process.env.BASE_URL}/templatebycategoryslug/${categoryId}`, {
        method: 'GET',
        headers: headers,
      });
      if(!resp.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const response = await resp.json();
      return Response.json({ data: response.data } );
    } else if(templateSlug !== null) {
      const resp = await fetch(`${process.env.BASE_URL}/templatebyslug/${templateSlug}`, {
        method: 'GET',
        headers: headers,
      });
      if(!resp.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const response = await resp.json();
      return Response.json({ data: response.data} );
    } else if(templateId !== null) {
      const resp = await fetch(`${process.env.BASE_URL}/getalltemplate`, {
        method: 'GET',
        headers: headers,
      });
      if(!resp.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const response = await resp.json();
      return Response.json({ data: response.data.find(c => c._id == templateId)} );
    } else {
      const resp = await fetch(`${process.env.BASE_URL}/getalltemplate`, {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
      });
      if(!resp.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const response = await resp.json();
      return Response.json({ data: response.data} );
    }
    } catch(err) {
      console.log(err);
      throw err;
    }
    
  }