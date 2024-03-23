import { getToken } from "@framework/utils/get-token";
import Cookies from "js-cookie";

// const baseURL = "http://localhost:3005/v1";

export async function GET(request) {
    var headers = new Headers();
    const authToken = getToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    headers.append('Authorization', `Bearer ${authToken}`)
    
    const resp = await fetch(`${process.env.BASE_URL}/getallproject`, {
      method: 'GET',
      headers: request.headers,
    });
    if(!resp.ok) {
      throw new Error("Failed to Fetch Data");
    }
    const response = await resp.json();
    return Response.json({ data: response.data} );
    
  }


  export async function POST(request) {
try{
  const data = await request.json();
  console.log("DATARESP",data);
  const resp = await fetch(`${process.env.BASE_URL}/createproject`, {
    method: 'POST',
    headers: request.headers,
    body: JSON.stringify(
    data
    ),
    redirect: 'follow'
  });
  console.log("RESP",resp)
  if (!resp.ok) {
    throw new Error("Failed to Fetch Data");
  } else {
    const response = await resp.json();
    return Response.json({ data: response });
  }
}
  catch(error){
    console.log("error")
    console.log(JSON.stringify(error))
  }

  }




