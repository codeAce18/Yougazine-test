
export async function POST(request) {
    const data = await request.json();
    const email = data.email;
    const password = data.password;
    var loginHeaders = new Headers();
    loginHeaders.append('Content-Type', 'application/json');
    loginHeaders.append('Accept', '*/*');
    const resp = await fetch(`${process.env.BASE_URL}/auth/user-login`, {
      method: 'POST',
      headers: loginHeaders,
      body: JSON.stringify({ email: email, password: password}),
      redirect: 'follow'
    });
    if(!resp.ok) {
      throw new Error("Failed to Fetch Data");
    } else {
      const response = await resp.json();
      
      return Response.json({ data: response } );
    }
    
  }