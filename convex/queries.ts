import { v } from "convex/values";
import { query } from "./_generated/server";

export const getPlayerByClerkId: ReturnType<typeof query> = query({
  args: {
    clerk_id: v.string(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db.query("player").withIndex("by_clerk_id", (q) => q.eq("clerk_id", args.clerk_id)).first();
    return player;
  },
});