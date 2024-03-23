export async function POST(request) {
    try{
        const data = await request.json();
        var changepassword = new Headers();
        changepassword.append('Content-Type', 'application/json');
        changepassword.append('Accept', '*/*');
        changepassword.append('Authorization',request.headers.get('Authorization'));
    
        const resp = await fetch(`${process.env.BASE_URL}/auth/changepassword`, {
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
    catch(err){
        console.log("ERROR")
        console.log(err);
    }
  }