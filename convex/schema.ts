import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  player: defineTable({
    tokenIdentifier: v.string(),
    nickname: v.string(),
    imgURL: v.string(),
    xp: v.number(),
    nextLevelXP: v.number(),
    level: v.number(),
    totalPoints: v.number(),
    gamesPlayed: v.number(),
    gamesWon: v.number(),
    gamesLost: v.number(),
    winRatio: v.number(),
    loseRatio: v.number(),
    accuracyRatio: v.number(),
    playtimeTotal: v.number(),
    rank: v.string(),
    vesselCommand: v.object({
      name: v.string(),
      level: v.number(),
      imgURL: v.string(),
    }),
  }).index("by_token", ["tokenIdentifier"]).index("by_name", ["nickname"]),
  game: defineTable({
    host: v.id("player"),
    opponent: v.id("player"),
    status: v.union(
      v.literal("waiting"),
      v.literal("active"),
      v.literal("completed"),
      v.literal("abandoned")
    ),
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    winner: v.optional(v.id("player")),
    hostPoints: v.number(),
    opponentPoints: v.number(),
    hostAccuracy: v.number(),
    opponentAccuracy: v.number(),
    playtime: v.optional(v.number()),
  })
  .index("by_host", ["host"])
  .index("by_opponent", ["opponent"])
  .index("by_player", ["host", "opponent"]) // Composite for "games between X and Y"
  .index("by_status", ["status"])
  .index("by_winner", ["winner"]),
  chatRoom: defineTable({
    createdBy: v.id("player"),
    lastActivity: v.number(),
    isActive: v.boolean(),
  })
  .index("by_active", ["isActive", "lastActivity"]),
  chatMessage: defineTable({
    chatRoomId: v.id("chatRoom"),
    playerId: v.id("player"),
    message: v.string(),
    timestamp: v.number(),
  })
  .index("by_chatRoom", ["chatRoomId", "timestamp"])
  .index("by_expiry", ["timestamp"]),
  move: defineTable({
    gameId: v.id("game"),
    playerId: v.id("player"),
    turn: v.number(),
    moveData: v.object({ 
      x: v.number(), 
      y: v.number(),
      result: v.union(v.literal("hit"), v.literal("miss"), v.literal("sunk"))
    }),
    timestamp: v.number(),
  })
  .index("by_game", ["gameId"])
  .index("by_game_turn", ["gameId", "turn"])
  .index("by_player", ["playerId"]),
})