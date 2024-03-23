export async function POST() {
    const data = await request.json();
    const resp = await fetch(`${process.env.BASE_URL}/deleteitem`, {
      method: 'POST',
      headers: request.headers,
      body: 
        JSON.stringify({
            data
        })
      ,
      redirect: 'follow'
    });
    if (!resp.ok) {
      throw new Error("Failed to Fetch Data");
    } else {
      const response = await resp.json();
      return Response.json({ data: response });
    }
  }