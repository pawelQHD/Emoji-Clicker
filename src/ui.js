import { state, CARDS, getCardCost, getPowerGain } from './state.js';

// Map cards to their DOM elements with live cost updates
const cardEls = CARDS.map(c => ({
  id: c.id,
  el:   document.getElementById(c.id),
  btn:  document.getElementById(c.btnId)
}));

export function updateGame() {
  const generatingDiv = document.getElementById('generating_rate');
  if (generatingDiv) {
    generatingDiv.textContent = `Generating: ${state.passiveRate.toFixed(2)} E/s`;
  }
  const countDisplay = document.getElementById('emoji_count');
  countDisplay.textContent = state.score.toFixed(2);
  
  // Ensure level displays are updated first
  cardEls.forEach(({ id, el }) => {
    const levelDisplay = el.querySelector('.level_display');
    if (levelDisplay) {
      const currentLevel = state.upgrades[id] || 0;
      if (currentLevel >= 1) {
        levelDisplay.textContent = `Lvl: ${currentLevel}`;
        levelDisplay.style.display = 'block';
      } else {
        levelDisplay.style.display = 'none';
      }
    }
  });
  
  // Update all card costs and visibility
  cardEls.forEach(({ id, el, btn }) => {
    if (id.startsWith('card_')) {
      // Calculate new cost
      const newCost = getCardCost(CARDS.find(c => c.id === id));
      
      // Update the button text to show current cost
      btn.textContent = `${newCost} Emojis`;
      btn.dataset.cardCost = String(newCost);
      
      updateCard({ id, el, btn });
    }
  });
}

function updateCard({ id, el, btn }) {
  const cardInfo = CARDS.find(c => c.id === id);
  if (!cardInfo) return;
  
  const revealAt = cardInfo.revealAt;

  // Visibility logic
  if (state.totalEmojisGenerated < revealAt / 2) {
    el.classList.add('hidden');
    el.classList.remove('outline-mode', 'revealed-mode');
  } else if (state.totalEmojisGenerated < revealAt) {
    el.classList.remove('hidden');
    el.classList.add('outline-mode');
    el.classList.remove('revealed-mode');
  } else {
    el.classList.remove('hidden');
    el.classList.add('revealed-mode');
    el.classList.remove('outline-mode');
  }

  // Update level display
  const levelDisplay = el.querySelector('.card_level');
  
  // Show level only if we have purchased the upgrade at least once
  const currentLevel = state.upgrades[id] || 0;
  if (levelDisplay && currentLevel >= 1) {
    levelDisplay.textContent = `Lvl: ${currentLevel}`;
    levelDisplay.style.display = 'block';
  } else if (levelDisplay) {
    levelDisplay.style.display = 'none';
  }

  // Recalculate cost based on current level
  const affordableCost = getCardCost(cardInfo);
  
  // Affordability
  const affordable = state.score >= affordableCost;
  btn.disabled   = !affordable;
  el.classList.toggle('locked_card', !affordable);
}

export function updateCardCost() {
  // Recalculate and update card costs when needed
  cardEls.forEach(({ el, btn }) => {
    const cardInfo = CARDS.find(c => c.id === el.id);
    if (!cardInfo) return;
    const newCost = getCardCost(cardInfo);
    if (btn.dataset.cardCost !== String(newCost)) {
      btn.dataset.cardCost = String(newCost);
      updateCard({ el, btn, cost: newCost });
    }
  });
}

export function createFloatingText(x, y) {
  const text = document.createElement('span');
  text.textContent = `+${state.emojiPower}`;
  text.className  = 'floating-text';
  text.style.left  = `${x}px`;
  text.style.top   = `${y}px`;
  document.body.appendChild(text);
  setTimeout(() => text.remove(), 800);
}
