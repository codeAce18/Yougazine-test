import Stripe from "stripe";

export async function POST(request) {
    const data = await request.json();
    console.log(data);
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
    const host = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/en/complete-order?id=${data.order._id}&session_id={CHECKOUT_SESSION_ID}`;

    try {

      const session = await stripe.checkout.sessions.create({
        client_reference_id: data.order._id,
        payment_method_types: ["card"],
        //customer: data.order.user_id,
        customer_email: data.userdata.email,
        line_items: data.orderitems.map(i => (
            {
                price_data: {
                  currency: "usd",
                  product_data: {
                    name: i.template.name,
                    description: i.template.short_description,
                    metadata: {
                        template_id: i.template_id,
                        pages: i.pages,
                        type: i.type,
                        binding: i.binding,
                        quality: i.quality
                    },
                  },
                  unit_amount: (+(i.price).toFixed(2)) * 100,
                },
                quantity: 1,
              }
        )),
        mode: "payment",
        cancel_url: `${host}`,
        success_url: `${host}`,
      });
      console.log(session);
      return Response.json({...session})
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}