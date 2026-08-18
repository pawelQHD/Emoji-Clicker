import { state, CARDS, getCardCost } from './state.js';

const cardEls = CARDS.map(c => ({
  id: c.id,
  el: document.getElementById(c.id),
}));

export function updateGame() {
  const generatingDiv = document.getElementById('generating_rate');
  if (generatingDiv) {
    generatingDiv.textContent = state.passiveRate.toFixed(2);
  }
  if(!state.hasShownGenerating && state.passiveRate > 0){
    showGeneratingLabel();
    state.hasShownGenerating = true;
  }
  const countDisplay = document.getElementById('emoji_count');
  if (countDisplay) {
    countDisplay.textContent = state.score.toFixed(2);
  }

  cardEls.forEach(({ id, el }) => {
    if (!el) return;
    const cardInfo = CARDS.find(c => c.id === id);
    if (!cardInfo) return;
    const newCost = getCardCost(cardInfo);
    const priceEl = el.querySelector('.card_price');
    if (priceEl) {
      priceEl.textContent = `${newCost}`;
    }
    el.dataset.cardCost = String(newCost);
    updateCard({ id, el });
  });
}

function updateCard({ id, el }) {
  const cardInfo = CARDS.find(c => c.id === id);
  if (!cardInfo) return;

  const revealAt = cardInfo.revealAt;

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

  const levelDisplay = el.querySelector('.level_display');
  if (levelDisplay) {
    const currentLevel = state.upgrades[id] || 0;
    if (currentLevel >= 1) {
      levelDisplay.textContent = `${currentLevel}`;
      levelDisplay.style.display = 'block';
    } else {
      levelDisplay.style.display = 'none';
    }
  }

  const affordableCost = getCardCost(cardInfo);
  const affordable = state.score >= affordableCost;
  el.classList.toggle('locked_card', !affordable);
}

export function updateCardCost() {
  cardEls.forEach(({ el }) => {
    if (!el) return;
    const cardInfo = CARDS.find(c => c.id === el.id);
    if (!cardInfo) return;
    const newCost = getCardCost(cardInfo);
    if (el.dataset.cardCost !== String(newCost)) {
      el.dataset.cardCost = String(newCost);
      updateCard({ id: el.id, el });
    }
  });
}

export function createFloatingText(x, y) {
  const text = document.createElement('span');
  text.textContent = `+${state.emojiPower}`;
  text.className = 'floating-text';
  text.style.left = `${x}px`;
  text.style.top = `${y}px`;
  document.body.appendChild(text);
  setTimeout(() => text.remove(), 800);
}

function showGeneratingLabel(){
  const label = document.getElementById('generating_label');
  if(label){
    label.classList.remove("hidden");
  }
}