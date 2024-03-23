
export async function POST(request) {
    const data = await request.json();
    var loginHeaders = new Headers();
    loginHeaders.append('Content-Type', 'application/json');
    loginHeaders.append('Accept', '*/*');
    const resp = await fetch(`${process.env.BASE_URL}/auth/create-user`, {
      method: 'POST',
      headers: loginHeaders,
      body: JSON.stringify({ 
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
        role: '6556ff6641ea3f14900e5a3e'
      }
      ),
      redirect: 'follow'
    });
    if(!resp.ok) {
      throw new Error("Failed to Fetch Data");
    } else {
      const response = await resp.json();
      return Response.json({...response });
    }
    
  }