
export async function GET(request) {
    const resp = await fetch(`${process.env.BASE_URL}/getallcart`, {
      method: 'GET',
      headers: request.headers,
      redirect: 'follow'
    });
    if (!resp.ok) {
      throw new Error("Failed to Fetch Data");
    } else {
      const response = await resp.json();
      return Response.json({ data: response });
    }
  }

export async function POST(request) {
  const data = await request.json();
  const resp = await fetch(`${process.env.BASE_URL}/createcart`, {
    method: 'POST',
    headers: request.headers,
    body: JSON.stringify(
      {
        template_id: data.template_id,
        project_id: data.project_id ? data.project_id : "",
        price_id: data.price_id,
      }
    ),
    redirect: 'follow'
  });
  if (!resp.ok) {
    throw new Error("Failed to Fetch Data");
  } else {
    const response = await resp.json();
    return Response.json({ data: response });
  }
}

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams
  const cartId = searchParams.get('id');
  var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    headers.append('Authorization', request.headers.get('Authorization'));
  try {
    if (cartId != null) {
      const resp = await fetch(`${process.env.BASE_URL}/removecartitem/${cartId}`, {
        method: 'DELETE',
        headers: headers,
      });
      if(!resp.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const response = await resp.json();
      return Response.json({ ...response } );
    } else {
      const resp = await fetch(`${process.env.BASE_URL}/clearcart`, {
        method: 'DELETE',
        headers: headers,
      });
      if(!resp.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const response = await resp.json();
      return Response.json({ ...response} );
    }
  }
  catch(error) {
    console.log(error);
    throw error;
  }
  
}