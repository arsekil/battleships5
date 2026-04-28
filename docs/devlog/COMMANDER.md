Balance Considerations for Commander Types
Balancing asymmetric abilities in a turn-based strategy game like Battleship is critical. Poor balance leads to dominant strategies (everyone picks the same commander) or frustrating experiences (certain matchups feel unwinnable). Here’s how to approach it systematically.

🎯 Core Balance Pillars
Pillar	Question	Example
Win Rate	Does every commander have ~45-55% win rate across all skill levels?	Strategist shouldn’t win 70% of matches
Counterplay	Can opponents respond to a commander’s ability?	Aggressor’s first strike should be avoidable (e.g., ships can start hidden)
Risk/Reward	High-power abilities should have meaningful costs or conditions	Overwhelming Force only works if you hit a 2-cell ship first
Skill Expression	Better players should win more regardless of commander	Tactician rewards pattern recognition; bad players misuse it
Matchup Fairness	No hard counters (Commander A beats B 80% of the time)	Veteran’s extra HP shouldn’t completely negate Aggressor’s burst
⚖️ Detailed Balance Analysis by Commander
1. THE STRATEGIST (Easy)
Strengths: Forgiving, reveals info, extra survival
Weaknesses: No direct damage boost, slower pace

Potential Imbalances
Radar Sweep (reveals 3 random cells) → If those cells always hit ships, Strategist becomes too strong against new players.
Fix: Reveal cells that are empty half the time, or only reveal edges of ships (not exact locations).

Damage Control (extra turn before sinking) → Could make a ship effectively require 2 extra hits in some situations.
Fix: Limited to one ship per game, and only if the ship wasn’t already heavily damaged.

Win Rate Target: 52% (slightly above average for beginners, drops at high skill)

2. THE AGGRESSOR (Medium)
Strengths: Early pressure, snowball potential, double turns
Weaknesses: Falls behind if misses early, no defensive tools

Potential Imbalances
First Strike (fire before game starts) → If you guess correctly, huge advantage; if you miss, no downside.
Fix: First strike must target a specific coordinate; if miss, opponent gets a bonus (e.g., reveal one of your ships). Risk/reward.

Relentless (fire again after sinking a ship) → Can chain kills and end game in one turn.
Fix: Limit to once per game, or require the sunk ship to be of a certain size (e.g., 3+ cells).

Win Rate Target: 48% (lower because high risk, but explosive when it works)

3. THE TACTICIAN (Medium)
Strengths: Adaptive, punishes repetitive play, info gathering
Weaknesses: No raw power, relies on opponent mistakes

Potential Imbalances
Pattern Recognition (after 3 misses, next shot 50% more accurate) → What does “more accurate” mean? In Battleship, shots are either hit or miss.
Fix: Change to “after 3 misses, your next shot will be a hit if fired in a valid adjacent cell to a previously hit ship.” This rewards pattern learning.

Counter-Move (extra turn after opponent sinks your ship) → Could create infinite loops if both players sink ships.
Fix: Only triggers once per game, and does not stack.

Win Rate Target: 50% (perfectly balanced at all skill levels)

4. THE VETERAN (Hard - Unlockable)
Strengths: Raw stats (extra HP, immunity, simultaneous fire)
Weaknesses: No early game advantage, requires high skill to use well

Potential Imbalances
Battle Hardened (ships require one extra hit) → A 2-cell patrol boat becomes 3 hits, drastically changing the game.
Fix: Only applies to ships of size 3 or larger, or reduces movement speed (if movement exists).

Fleet Coordination (all ships fire once) → Can delete half the enemy fleet in one turn.
Fix: Firing costs: each ship that fires reveals its location permanently. High risk.

Win Rate Target: 55% (because it’s unlockable and harder to master, but should still be beatable)

5. THE LEGEND (Very Hard)
Strengths: Overpowered but very rare, high unlock cost
Weaknesses: Extreme visibility (opponents know you’re Legend and can prepare)

Potential Imbalances
Perfect Strategy (know exact location of one ship) → Essentially a free hit.
Fix: The ship is randomly chosen from opponent’s fleet, and its location is revealed only after you’ve already taken 3 turns. Delayed gratification.

Legendary Status (start with an extra ship) → This breaks the board symmetry (11 ships vs 10).
Fix: The extra ship is a decoy (zero damage) or has only 1 hit point. Provides psychological advantage without mechanical imbalance.

Win Rate Target: 60% (intentionally strong for bragging rights, but not unbeatable)

📊 Quantitative Balance Metrics
Use these KPIs to tune after launch:

Metric	Target	How to Measure
Commander Pick Rate	Each between 15-25%	In-game telemetry
Average Game Length	Within 10% of baseline	Time to win/loss
Comeback Rate	20-30% for losing player	% of games where player behind at turn 5 wins
Ability Usage Rate	Abilities used 40-60% of games they’re available	Track activation
Player Satisfaction	4/5 stars post-game	Optional survey
🧪 How to Test Balance Before Release
1. Simulated Matches
Write a script that pits AI commanders against each other thousands of times. Record win rates.

2. Playtesting Sessions
Internal: 10-20 games with each commander

External: Closed beta with 50+ players, track anonymized data

3. Elo-Based Adjustment
Assign each commander an Elo rating. If Strategist’s Elo climbs too high, nerf it.

🔧 Practical Tuning Levers
Without changing abilities entirely, you can adjust:

Lever	Effect	Example
Cooldown	How often ability can be used	Radar Sweep from 1/game to 1/2 games
Resource Cost	Consumes something (e.g., next turn)	First Strike costs your first regular turn
Condition	Harder to trigger	Pattern Recognition requires 4 misses, not 3
Magnitude	How powerful the effect is	Battle Hardened gives +1 HP only on battleships, not all ships
Side Effect	Adds a downside	Fleet Coordination reveals all your ship positions
✅ Sample Balance Pass for MVP
Start with these values and iterate:

Commander	Abilities (simplified)	Starting Stats
Strategist	Radar Sweep (1 cell revealed per game), Damage Control (1 extra hit on 1 ship)	Normal
Aggressor	First Strike (1 free shot at start, if miss you lose 1 turn later), Relentless (extra turn after sinking, once)	Normal
Tactician	Pattern Recognition (after 3 misses, next shot reveals if adjacent to hit), Counter-Move (extra turn after your ship sinks, once)	Normal
Veteran	Battle Hardened (one ship of your choice gets +1 HP), Fleet Coordination (all ships fire, but reveal themselves)	Slightly lower starting accuracy (80%)
Legend	Perfect Strategy (reveal one random ship after 3 turns), Legendary Status (extra 1HP decoy ship)	Normal
Final note: Balance is a continuous process. Plan to adjust values after launch based on real player data. Use Convex to store ability parameters so you can tweak without redeploying the entire app.