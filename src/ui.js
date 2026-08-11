import { state, CARDS } from './state.js';

const countDisplay = document.getElementById('emoji_count');
const emojiButton   = document.getElementById('emoji-button');

const tabUp    = document.getElementById('tab_up');
const tabRes   = document.getElementById('tab_res');
const viewUp   = document.getElementById('view_up');
const viewRes  = document.getElementById('view_res');

// Map cards to their DOM elements
const cardEls = CARDS.map(c => ({
  el:   document.getElementById(c.id),
  btn:  document.getElementById(c.btnId),
  cost: c.cost,
}));

export function updateGame() {
  countDisplay.textContent = state.score;
  cardEls.forEach(updateCard);
}

function updateCard({ el, btn, cost }) {
  const revealAt = CARDS.find(c => c.btnId === btn.id).revealAt;

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

  // Affordability
  const affordable = state.score >= cost;
  btn.disabled   = !affordable;
  el.classList.toggle('locked_card', !affordable);
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
