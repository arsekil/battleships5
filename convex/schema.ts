import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  player: defineTable({
    clerk_id: v.string(),
    nickname: v.string(),
    imgURL: v.string(),
    xp: v.number(),
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
  }).index("by_clerk_id", ["clerk_id"]),
  game: defineTable({
    player1: v.string(),
    player2: v.string(),
    winner: v.string(),
    player1Points: v.number(),
    player2Points: v.number(),
    player1Accuracy: v.number(),
    player2Accuracy: v.number(),
    playtime: v.number(),
  }),
  lobby: defineTable({
    host: v.id("player"), //v.string(),
    player2: v.optional(v.id("player")), //v.optional(v.string()),
    message: v.string(),
  }),
  move: defineTable({
    gameId: v.id("game"),
    playerId: v.id("player"),
    message: v.string(),
    turn: v.number(),
    moveData: v.object({ x: v.number(), y: v.number() }),
  }),
})