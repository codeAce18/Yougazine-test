export async function POST(request) {
    try{
      const data = await request.formData();
      console.log(data);
      var headers = new Headers();
      headers.append('Accept', '*/*');
      headers.append('Authorization',request.headers.get('Authorization'))
      const resp = await fetch(`${process.env.BASE_URL}/createprojectfiles`, {
        method: 'POST',
        headers:headers,
        body: data,
        redirect: 'follow'
      });
      if (!resp.ok) {
        throw new Error("Failed to Fetch Data");
      } else {
        const response = await resp.json();
        return Response.json({ ...response });
      }
    }
      catch(error){
        console.log("error")
        console.log(JSON.stringify(error))
        throw error
      }
    
      }


export async function GET(request) {

        const searchParams = request.nextUrl.searchParams
        const slug = searchParams.get('slug');
          var headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Accept', '*/*');
          headers.append('Authorization', request.headers.get('Authorization'))
      
          const resp = await fetch(`${process.env.BASE_URL}/getprojectfolderdata/${slug}`, {
            method: 'GET',
            headers: headers,
          });
          if(!resp.ok) {
            throw new Error("Failed to Fetch Data");
          }
          const response = await resp.json();
          return Response.json({ ...response });
          
        }
      