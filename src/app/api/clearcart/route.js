export async function DELETE(request) {
    const resp = await fetch(`${process.env.BASE_URL}/clearcart`, {
      method: 'POST',
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