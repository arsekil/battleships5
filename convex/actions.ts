import { action, type ActionCtx } from "./_generated/server";
import { ConvexError } from "convex/values";

export const updateMetadata: ReturnType<typeof action> = action({
  handler: async (ctx: ActionCtx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) { 
      return new ConvexError("You are not allowed to update your metadata");
    }
    await fetch(`https://api.clerk.com/v1/users/${identity?.subject}/metadata`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Accept': '*/*',
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY! as string}`
      },
      body: JSON.stringify({
        public_metadata: {
          "onboardingComplete": false,
          "skipOnboardingTemporarily": true
        },
        private_metadata: {},
        unsafe_metadata: {}
      })
    })
  },
});