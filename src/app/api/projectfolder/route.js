import { getToken } from "@framework/utils/get-token";
export async function GET(request) {

  const searchParams = request.nextUrl.searchParams
  const slug = searchParams.get('slug');
  const resp = await fetch(`${process.env.BASE_URL}/getallprojectfolder/${slug}`, {
    method: 'GET',
    headers: request.headers,
  });
  if (!resp.ok) {
    throw new Error("Failed to Fetch Data");
  }
  const response = await resp.json();
  return Response.json({ data: response.data });

}


export async function POST(request) {
  try {
    const data = await request.json();
    console.log("DATARESP", data);
    var headers = new Headers();
    const authToken = getToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    headers.append('Authorization', request.headers.get('Authorization'))
    const resp = await fetch(`${process.env.BASE_URL}/createprojectfolder`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(
        data
      ),
      redirect: 'follow'
    });
    console.log("RESP", resp)
    if (!resp.ok) {
      throw new Error("Failed to Fetch Data");
    } else {
      const response = await resp.json();
      return Response.json({ data: response });
    }
  }
  catch (error) {
    console.log("error")
    console.log(JSON.stringify(error))
    throw error
  }

}




