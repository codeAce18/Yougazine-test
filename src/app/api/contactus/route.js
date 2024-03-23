
export async function POST(request) {
    try{
        const data = await request.json();
        var contactusheader = new Headers();
        contactusheader.append('Content-Type', 'application/json');
        contactusheader.append('Accept', '*/*');
        const resp = await fetch(`${process.env.BASE_URL}/contactus`, {
          method: 'POST',
          headers: contactusheader,
          body: 
            JSON.stringify({
                data
            })
          ,
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
        console.log("ERROR")
        console.log(error)
    }
  }