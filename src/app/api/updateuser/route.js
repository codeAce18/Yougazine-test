import { getToken } from "@framework/utils/get-token";

export async function GET(request) {
    const resp = await fetch(`${process.env.BASE_URL}/user`, {
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

export async function PUT(request) {
  const authToken = getToken();
  try{
    const data = await request.json();
    var updateUserHeader = new Headers();
    updateUserHeader.append('Content-Type', 'application/json');
    updateUserHeader.append('Accept', '*/*');
    updateUserHeader.append('Authorization', `Bearer ${authToken}`)
    const resp = await fetch(`${process.env.BASE_URL}/user`, {
      method: 'PUT',
      headers: request.headers,
      body: JSON.stringify(
        data
      ),
      redirect: 'follow'
    });
  
    console.log( "RESP", resp)
    if (!resp.ok) {
      throw new Error("Failed to Fetch Data");
    } else {
      const response = await resp.json();

      return Response.json({ data: response });
    }
  }

  catch(err){
    console.log("ERORRRRRRRRRRRRRRRRRRR")
    console.log(err)
  }


}