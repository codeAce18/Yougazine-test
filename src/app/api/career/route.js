export async function POST(request) {
    try{
      const data = await request.json();
      console.log("DATARESP",data);
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', '*/*');
      headers.append('Authorization',request.headers.get('Authorization'))
      const resp = await fetch(`${process.env.BASE_URL}/submitcareerform`, {
        method: 'POST',
        headers:headers,
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
        throw error
      }
    
      }
