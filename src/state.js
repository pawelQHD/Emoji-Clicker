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
  passiveRate: 0, // Passive emojis per second from upgrades
  upgrades: {
    card_starter: 0,
    card_laugher: 0,
    card_crying: 0
  }
};

// Helper function: calculate cost based on current level (times purchased)
export function getCardCost(card) {
  const purchases = state.upgrades[card.id] || 0;
  if (purchases === 1) return card.baseCost;
  let cost = card.baseCost;
  const scaling = card.id === 'card_laugher' ? 175 : CONFIG.COST_SCALING_PERCENTAGE;
  for (let i = 2; i <= purchases; i++) {
    const increaseAmount = cost * (scaling / 100);
    cost += increaseAmount;
  }
  return Math.ceil(cost);
}

// Helper function: calculate power gain based on current level
export function getPowerGain(card) {
  const purchases = state.upgrades[card.id] || 0;
  if (purchases === 0) return 1;
  let powerGain = 1;
  for (let i = 0; i < purchases - 1; i++) {
    powerGain += powerGain * (CONFIG.POWER_SCALING_PERCENTAGE / 100);
  }
  return Math.ceil(powerGain);
}

// Passive rate for Laugher card
export function getPassiveGain(card) {
  const purchases = state.upgrades[card.id] || 0;
  if (purchases === 0) return 0;
  let base = 0.5;
  for (let i = 1; i < purchases; i++) {
    base += base * (145 / 100);
  }
  return base;
}
