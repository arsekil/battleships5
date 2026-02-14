import { v } from "convex/values";
import { internalMutation, mutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { api } from "./_generated/api";

export const createPlayer: ReturnType<typeof internalMutation> = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    nickname: v.string(),
  },
  handler: async (ctx, { tokenIdentifier, nickname }) => {
    const player = await ctx.db.insert("player", {
      tokenIdentifier: tokenIdentifier.split('|').reverse().join('|'),
      nickname: nickname,
      imgURL: "",
      xp: 0,
      level: 1,
      totalPoints: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      winRatio: 0,
      loseRatio: 0,
      accuracyRatio: 0,
      playtimeTotal: 0,
      rank: "Seaman",
    });
    return player;
  },
});

export const createNewPlayer: ReturnType<typeof mutation> = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User must be authenticated to create a player");
    }
    const existing = await ctx.runQuery(api.queries.getPlayerByTokenIdentifier, {});
    if (existing) {
      throw new Error("Player already exists for this user");
    }
    const player = await ctx.runMutation(internal.mutations.createPlayer, { tokenIdentifier: identity?.tokenIdentifier as string, nickname: identity?.nickname as string });
    return player;
  },
});


export const deletePlayer: ReturnType<typeof mutation> = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User must be authenticated to delete a player");
    }
    const player = await ctx.runQuery(api.queries.getPlayerByTokenIdentifier, { tokenIdentifier: identity?.tokenIdentifier as string });
    const deleted = await ctx.db.delete("player", player._id);
    return deleted;
  },
});