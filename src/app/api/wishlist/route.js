
export async function GET(request) {

    const resp = await fetch(`${process.env.BASE_URL}/getallwishlist`, {
      method: 'GET',
      headers:request.headers,
      redirect: 'follow' 
    });
    if (!resp.ok) {
      throw new Error("Failed to Fetch Data");
    } else {
      const response = await resp.json();
      return Response.json({data: response.data});
    }
  }

export async function POST(request) {
  const data = await request.json();
  const resp = await fetch(`${process.env.BASE_URL}/createwishlist`, {
    method: 'POST',
    headers: request.headers,
    body: JSON.stringify(
      data
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
  const wishlistId = searchParams.get('id'); 

  var deleteWishList = new Headers();
  deleteWishList.append('Content-Type', 'application/json');
  deleteWishList.append('Accept', '*/*');
  deleteWishList.append('Authorization',request.headers.get('Authorization'));
  const resp = await fetch(`${process.env.BASE_URL}/deletewishlist/${wishlistId}`, {
    method: 'DELETE',
    headers: deleteWishList,
    redirect: 'follow'
  });
  if (!resp.ok) {
    throw new Error("Failed to Fetch Data");
  } else {
    const response = await resp.json();
    return Response.json({ data: response });
  }
}