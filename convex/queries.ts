import { query } from "./_generated/server";

export const getPlayerByTokenIdentifier: ReturnType<typeof query> = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User must be authenticated to create a player");
    }
    const player = await ctx.db.query("player").withIndex("by_token", (q) => q.eq("tokenIdentifier",  identity?.tokenIdentifier as string)).first();
    return player;
  },
});