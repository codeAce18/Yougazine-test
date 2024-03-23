import { getToken } from "@framework/utils/get-token";
import Cookies from "js-cookie";

// const baseURL = "http://localhost:3005/v1";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const orderId = searchParams.get('id');
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', '*/*');
  headers.append('Authorization', request.headers.get('Authorization'));
  console.log(orderId);
  if (orderId) {
    const resp = await fetch(`${process.env.BASE_URL}/getallorder`, {
      method: 'GET',
      headers: headers,
    });
    if (!resp.ok) {
      throw new Error("Failed to Fetch Data");
    }
    const response = await resp.json();
    return Response.json({ data: response.data.find(o => o._id === orderId) });
  } else {
    const resp = await fetch(`${process.env.BASE_URL}/getallorder`, {
      method: 'GET',
      headers: headers,
    });
    if (!resp.ok) {
      throw new Error("Failed to Fetch Data");
    }
    const response = await resp.json();
    return Response.json({ data: response.data });
  }

}


export async function POST(request) {
  try {
    const data = await request.json();
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    headers.append('Authorization', request.headers.get('Authorization'));
    const resp = await fetch(`${process.env.BASE_URL}/createorder`, {
      method: 'POST',
      headers: headers,
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
  catch (error) {
    console.log("error")
    console.log(JSON.stringify(error))
  }

}

export async function PUT(request) {
  try {
    const data = await request.json();
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    headers.append('Authorization', request.headers.get('Authorization'));
    const resp = await fetch(`${process.env.BASE_URL}/updatepayment`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(
        data
      ),
      redirect: 'follow'
    });
    if (!resp.ok) {
      throw new Error("Failed to Fetch Data");
    } else {
      const response = await resp.json();
      return Response.json({ ...response });
    }
  }
  catch (error) {
    console.log("error")
    throw error;
  }

}




