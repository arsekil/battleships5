import { v } from "convex/values";
import { internalMutation, mutation, type MutationCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import { api } from "./_generated/api";


// PLAYER FUNCTIONS
export const createPlayer: ReturnType<typeof internalMutation> = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    nickname: v.string(),
  },
  handler: async (ctx: MutationCtx, { tokenIdentifier, nickname }) => {
    const player = await ctx.db.insert("player", {
      tokenIdentifier: tokenIdentifier,
      nickname: nickname,
      imgURL: "",
      xp: 0,
      nextLevelXP: 100,
      level: 1,
      totalPoints: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      winRatio: 0,
      loseRatio: 0,
      accuracyRatio: 0,
      playtimeTotal: 0,
      rank: "Ensign",
      vesselCommand: {
        name: "Patrol Boat",
        level: 1,
        imgURL: "",
      },
      metadata: {
        onboardingComplete: false,
        skipOnboardingTemporarily: false
      }
    });
    return player;
  },
});

export const createNewPlayer: ReturnType<typeof mutation> = mutation({
  handler: async (ctx: MutationCtx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User must be authenticated to create a player");
    }
    const existing = await ctx.runQuery(api.queries.getUserByTokenIdentifier, {});
    if (existing) {
      return;
    }
    const player = await ctx.runMutation(internal.mutations.createPlayer, { tokenIdentifier: identity?.tokenIdentifier as string, nickname: identity?.nickname as string });
    return player;
  },
});

export const deletePlayer: ReturnType<typeof mutation> = mutation({
  handler: async (ctx: MutationCtx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("You must be authenticated to delete your player");
    }
    const player = await ctx.runQuery(api.queries.getUserByTokenIdentifier, { tokenIdentifier: identity?.tokenIdentifier as string });
    const deleted = await ctx.db.delete("player", player._id);
    return deleted;
  },
});

// GAME FUNCTIONS

// FILE STORAGE FUNCTIONS
