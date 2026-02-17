import { httpAction, type ActionCtx } from "./_generated/server";

export const getAllUsers = httpAction(async (ctx: ActionCtx): Promise<Response> => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("You must be authenticated to fetch all users endpoint");
  }
  
  const response = await fetch('https://api.clerk.com/v1/users?email_address=&phone_number=&external_id=&username=&web3_wallet=&user_id=&organization_id=&query=&email_address_query=&phone_number_query=&username_query=&name_query=&banned=true&last_active_at_before=1700690400000&last_active_at_after=1700690400000&last_active_at_since=1700690400000&created_at_before=1730160000000&created_at_after=1730160000000&last_sign_in_at_before=1700690400000&last_sign_in_at_after=1700690400000&provider=&provider_user_id=&limit=10&offset=0&order_by=-created_at', {
    headers: {
      'Accept': '*/*',
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY! as string}`
    }
  });

  if (!response.ok) { 
    return new Response(JSON.stringify(response.json()), {
        status: response.status,
        headers: {
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers":
            "Authorization, Accept",
          "Access-Control-Allow-Origin":
            process.env.CONVEX_SITE_URL! as string,
          Vary: "origin",
        },
      });
    }

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: {
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Authorization, Accept",
      "Access-Control-Allow-Origin": process.env.CONVEX_SITE_URL! as string,
      Vary: "origin",
    },
    status: response.status
  });
});