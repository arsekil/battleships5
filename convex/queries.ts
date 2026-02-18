import { query, type QueryCtx } from "./_generated/server";

export const getUserByTokenIdentifier: ReturnType<typeof query> = query({
  handler: async (ctx: QueryCtx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User must be authenticated to get user by token identifier");
    }
    const player = await ctx.db.query("player").withIndex("by_token", (q) => q.eq("tokenIdentifier",  identity?.tokenIdentifier as string)).first();
    return player;
  },
});

export const getUserByNickname: ReturnType<typeof query> = query({
  handler: async (ctx: QueryCtx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User must be authenticated to get user by nickname");
    }
    const player = await ctx.db.query("player").withIndex("by_name", (q) => q.eq("nickname", identity?.nickname as string)).first();
    return player;
  },
});

export const getUserBySubject: ReturnType<typeof query> = query({
  handler: async (ctx: QueryCtx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User must be authenticated to get user by subject");
    }
    return identity?.subject as string;
  },
});