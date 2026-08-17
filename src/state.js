export const CONFIG = {
  COST_SCALING_PERCENTAGE: 150,
  POWER_SCALING_PERCENTAGE: 140
};

export const CARDS = [
  { id: 'card_starter', btnId: 'btn_buy_starter', baseCost: 15, revealAt: 0 },
  { id: 'card_laugher', btnId: 'btn_buy_laugher', baseCost: 120, revealAt: 100 },
  { id: 'card_crying', btnId: 'btn_buy_crying', baseCost: 1500, revealAt: 2000 }
];

export const state = {
  score: 0,
  totalEmojisGenerated: 0,
  emojiPower: 1,
  passiveRate: 0,
  upgrades: {
    card_starter: 0,
    card_laugher: 0,
    card_crying: 0
  },
  hasShownGenerating: false
};

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

export function getPowerGain(card) {
  const purchases = state.upgrades[card.id] || 0;
  if (purchases === 0) return 1;
  let powerGain = 1;
  for (let i = 0; i < purchases - 1; i++) {
    powerGain += powerGain * (CONFIG.POWER_SCALING_PERCENTAGE / 100);
  }
  return Math.ceil(powerGain);
}

export function getPassiveGain(card) {
  const purchases = state.upgrades[card.id] || 0;
  if (purchases === 0) return 0.1;
  let base = 0.5;
  for (let i = 1; i < purchases; i++) {
    base += base * (130 / 100);
  }
  return Math.ceil(base * 10) / 10;
}
