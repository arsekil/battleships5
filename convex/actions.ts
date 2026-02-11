import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const createNewPlayer: ReturnType<typeof action> = action({
  args: {
    clerk_id: v.string(),
    nickname: v.string(),
  },
  handler: async (ctx, { clerk_id, nickname }) => {
    const player = await ctx.runMutation(internal.mutations.createPlayer, { clerk_id, nickname });
    return player;
  },
});