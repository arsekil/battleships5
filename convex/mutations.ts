import { v } from "convex/values";
import { internalMutation, mutation } from "./_generated/server";
import { api } from "./_generated/api";

export const createPlayer: ReturnType<typeof internalMutation> = internalMutation({
  args: {
    clerk_id: v.string(),
    nickname: v.string(),
  },
  handler: async (ctx, { clerk_id, nickname }) => {
    const player = await ctx.db.insert("player", {
      clerk_id: clerk_id,
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



export const deletePlayer: ReturnType<typeof mutation> = mutation({
  args: {
    clerk_id: v.string(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.runQuery(api.queries.getPlayerByClerkId, { clerk_id: args.clerk_id });
    const deleted = await ctx.db.delete("player", player._id);
    return deleted;
  },
});