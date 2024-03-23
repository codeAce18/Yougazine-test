
export async function GET(request) {
    const resp = await fetch(`${process.env.BASE_URL}/getallshippingaddress`, {
      method: 'GET',
      headers: request.headers,
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
  const resp = await fetch(`${process.env.BASE_URL}/createshippingaddress`, {
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

export async function PUT(request) {
  const data = await request.json();
  const resp = await fetch(`${process.env.BASE_URL}/updateshippingaddress`, {
    method: 'PUT',
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