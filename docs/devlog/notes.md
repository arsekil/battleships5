# Battleship Game - Functional Design Guidelines
🎯 Core Philosophy: Separation of Concerns
Layer Architecture

```js
[UI Layer] ←→ [Client State] ←→ [Game Logic] ←→ [Database]
  React        Zustand           Pure TS        Convex
  DnD-Kit      Socket.io
```

📦 Function Categories

1. Pure Game Logic Functions (No External Dependencies)
Board validation

Ship placement rules

Attack resolution

Win condition checking

Design Rule: These should be pure functions that take state and return new state

2. Client State Management (Zustand)

Current game session

UI preferences

Temporary drag/drop state

Local multiplayer state

Design Rule: Zustand stores should only contain UI/client-specific state

3. Database Operations (Convex)
User profiles

Game history

Persistent statistics

Matchmaking queues

Design Rule: Convex mutations/queries should be coarse-grained (1 operation = 1 meaningful action)

4. Real-time Communication (Socket.io)
Move synchronization

Chat messages

Room management

Presence indicators

Design Rule: Socket events should mirror domain events, not database operations

🔄 Data Flow Patterns
Single Player / VS AI

```js
User Action → DnD-Kit → Zustand Update → Game Logic → Zustand Update → UI
                                      ↓
                                Convex (save game state)
```

Multiplayer

```js
User Action → Socket.io emit → Server → Socket.io broadcast → Other Client
      ↓                                                        ↓
 Zustand Update                                          Zustand Update
```

Onboarding Flow

```js
Clerk Auth → Convex JWT → tokenIdentifier → Create/Load User → Zustand Init
```

# 🧩 Function Boundaries

What Belongs Where:

Function Type	Location	Example

1. Board logic - Pure TS utils -	canPlaceShip(board, ship, position)
2. Game rules	- Pure TS utils	- calculateHit(board, coordinates)
3. Current game state - Zustand store -	useGameStore.getState().playerBoard
4. User profile -	Convex query -	api.users.getCurrentUser
5. Matchmaking -	Convex mutation -	api.matchmaking.joinQueue
6. Real-time moves -	Socket.io event -	socket.emit('game:move', moveData)
7. Drag behavior -	DnD-Kit sensors -	dragStart, dragMove, dragEnd
8. UI feedback -	React state	- isHovered, isDragging

# 📐 Function Design Principles

1. Single Responsibility

```js
❌ Bad: handleGameAction(action) // Does everything
✅ Good: placeShip(), fireShot(), endTurn() // One thing each
```

2. Predictable Input/Output

```js
// Pure function example
type GameState = { board: Cell[][], ships: Ship[] }
type ActionResult = { newState: GameState, valid: boolean, message?: string }
function applyMove(currentState: GameState, move: Move): ActionResult
```

3. Error Handling Strategy
Validation errors → Return early with message

Business rule violations → Throw domain-specific errors

Network/database errors → Handle at boundary, show user feedback

4. State Immutability
Game logic functions return new objects, don't mutate

Zustand handles immutability internally

Convex automatically tracks changes

🏗️ Module Organization

```js
lib/
├── game-engine/
│   ├── board.ts      # Board creation, validation
│   ├── ships.ts       # Ship definitions, placement rules
│   ├── attacks.ts     # Hit/miss logic, special weapons
│   └── ai.ts          # Computer opponent logic
│
├── validation/
│   ├── placement.ts   # Ship placement validation
│   └── moves.ts       # Turn validation
│
├── utils/
│   ├── coordinates.ts # Grid helpers
│   └── scoring.ts     # Score calculation
│
store/
├── gameStore.ts       # Active game state
├── uiStore.ts         # UI preferences
└── socketStore.ts     # Connection state

convex/
├── users.ts           # User profile functions
├── games.ts           # Game history functions
├── matchmaking.ts     # Queue management
└── stats.ts           # Leaderboards, achievements
```

# 🔌 Socket.io Event Design

Event Naming Convention

```js
namespace:action
```

Examples:

game:join

game:move

game:leave

chat:message

room:update

# Event Payload Design

Include gameId and playerId in every event

Send minimal data (coordinates, not full board)

Include timestamp for ordering

# 🗄️ Convex Function Design

## Query Patterns

// Get current user (always by tokenIdentifier)
getCurrentUser: query

// Get game history (paginated)
getUserGames: query({ userId, cursor, limit })

// Get active games
getActiveGames: query


## Mutation Patterns

// User actions
createUser: mutation
updatePreferences: mutation

// Game actions
saveGameResult: mutation
updateStats: mutation

// Matchmaking
joinQueue: mutation
leaveQueue: mutation

# 🎮 Game State Lifecycle

## Setup Phase

```js
1. Client requests new game
2. Convex creates game record
3. Zustand initializes local state
4. Players place ships (DnD-Kit)
5. Ready state syncs via socket.io
```

## Battle Phase

```js
1. Current player selects target (UI)
2. Validation (pure function)
3. Update local state (Zustand)
4. Emit move (socket.io)
5. Save to history (Convex)
6. Check win condition
7. Switch turns
```

## Game End

```js
1. Detect win condition
2. Calculate statistics
3. Save to Convex
4. Update leaderboards
5. Offer rematch
```

# ⚡ Performance Considerations

## When to Use Each Tool

DnD-Kit: Only for drag interactions during ship placement

Zustand: Current game state, UI preferences

Socket.io: Real-time moves (send only coordinates)

Convex: Everything persistent (queries can be cached)

## State Update Frequency

High frequency (>60fps): React local state (drag previews)

Medium frequency: Zustand (game state updates)

Low frequency: Convex (database saves)

# 🔍 Testing Strategy

## Pure Functions (Jest)

Board validation

Attack resolution

AI decision making

## State Management (React Testing Library)

Zustand store updates

Component rendering

## Integration (Playwright)

Complete game flow

Multiplayer sync

# 📝 Function Naming Conventions

## Pure Functions

```js
can... (validation)

calculate... (computation)

create... (factory)
```

## Zustand Actions

```js
placeShip

fireShot

endTurn

resetGame
```

## Convex Functions

```js
get... (queries)

create... (mutations)

update... (mutations)

delete... (mutations)
```

## Socket Events

```js
game:playerJoined

game:moveMade

game:playerLeft
```

# 🚦 Error Handling Strategy

## Client-Side Errors

Validation failures → Show tooltip/message

Network issues → Retry with exponential backoff

Sync conflicts → Request state from server

## Server-Side Errors

Invalid moves → Reject with reason

Authentication → Redirect to login

Database errors → 500 with retry option

# 📊 State Shape Guidelines

Keep States Flat

```js
// ❌ Deeply nested
{ players: { player1: { board: { cells: [...] } } } }

// ✅ Flattened references
{ boards: { player1Id: [...], player2Id: [...] } }
```

## Use IDs for Relationships

```js
game: {
  id: "game123",
  playerIds: ["user1", "user2"],
  currentTurn: "user1",
  boards: {
    user1: [...],
    user2: [...]
  }
}
```

# 🎯 Summary Checklist

Pure game logic separated from UI

Zustand for ephemeral state only

Convex for persistent data with tokenIdentifier

Socket.io for real-time moves (minimal payload)

DnD-Kit isolated to ship placement

Clear function boundaries and responsibilities

Consistent naming conventions

Error handling at each layer

Performance-appropriate state updates

This functional design creates clean separation, making your game maintainable, testable, and scalable as you add features.
