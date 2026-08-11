// Configuration - tweak these values to adjust game balance
export const CONFIG = {
  COST_SCALING_PERCENTAGE: 220, // Cost increases by this % each purchase
  POWER_SCALING_PERCENTAGE: 160 // Power increases by this % each purchase
};

export const CARDS = [
  { id: 'card_starter', btnId: 'btn_buy_starter', baseCost: 9, revealAt: 0 },
  { id: 'card_laugher', btnId: 'btn_buy_laugher', baseCost: 163, revealAt: 100 },
  { id: 'card_crying', btnId: 'btn_buy_crying', baseCost: 2781, revealAt: 2000 }
];

export const state = {
  score: 0,
  totalEmojisGenerated: 0,
  emojiPower: 1,
  // Track how many times each card has been purchased (level)
  upgrades: {
    'card_starter': 0,   // Start at 0 - haven't purchased yet
    'card_laugher': 0,
    'card_crying': 0
  }
};

// Helper function: calculate cost based on current level (times purchased)
export function getCardCost(card) {
  const purchases = state.upgrades[card.id] || 0; // Start at 0 - haven't purchased yet
  
  // First purchase (level 1) is always the base cost
  if (purchases === 1) return card.baseCost;
  
  // Each subsequent purchase adds COST_SCALING_PERCENTAGE% to the current cost
  let cost = card.baseCost;
  for (let i = 2; i <= purchases; i++) {
    const increaseAmount = cost * (CONFIG.COST_SCALING_PERCENTAGE / 100);
    cost = cost + increaseAmount;
  }
  
  return Math.ceil(cost);
}

// Helper function: calculate power gain based on current level
export function getPowerGain(card) {
  const purchases = state.upgrades[card.id] || 0; // Use actual purchase count
  
  // No purchases = no power gain from upgrades
  if (purchases === 0) return 1;
  
  // First purchase (going from 0 to 1) gives +1 power
  // Subsequent purchases add POWER_SCALING_PERCENTAGE% to the previous gain
  let powerGain = 1; // Base gain for first purchase
  const upgradesAfterFirst = purchases - 1; // How many times we've upgraded after the first
  
  for (let i = 0; i < upgradesAfterFirst; i++) {
    const increaseAmount = powerGain * (CONFIG.POWER_SCALING_PERCENTAGE / 100);
    powerGain = powerGain + increaseAmount;
  }
  
  return Math.ceil(powerGain);
}
