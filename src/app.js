import { state, CARDS, getCardCost, getPowerGain, getPassiveGain } from './state.js';
import { updateGame, createFloatingText } from './ui.js';
import { setModalVisible } from './cardBox.js';

const emojiButton = document.getElementById('emoji-button');

emojiButton.addEventListener('click', e => {
  state.score += state.emojiPower;
  state.totalEmojisGenerated += state.emojiPower;
  updateGame();
  createFloatingText(e.clientX, e.clientY);
});

document.querySelectorAll('.upgrade_card').forEach(cardBtn => {
  const handlePurchase = () => {
    const card = CARDS.find(c => c.id === cardBtn.id);
    if (!card) return;

    const priceEl = cardBtn.querySelector('.card_price');
    const currentCost = parseInt(cardBtn.dataset.cardCost || (priceEl ? priceEl.textContent : cardBtn.textContent));

    if (state.score >= currentCost) {
      state.score -= currentCost;
      const newLevel = (state.upgrades[card.id] || 0) + 1;
      state.upgrades[card.id] = newLevel;
      const powerGain = getPowerGain(card);
      state.emojiPower += powerGain;
            if (card.id === 'card_laugher') {
              state.passiveRate = getPassiveGain(card);
            }
      updateGame();
    }
  };
  cardBtn.addEventListener('click', handlePurchase);
});

const tabUp   = document.getElementById('tab_up');
const tabRes  = document.getElementById('tab_res');
const viewUp  = document.getElementById('view_up');
const viewRes = document.getElementById('view_res');

tabUp.addEventListener('click', () => {
  viewUp.classList.remove('hidden');
  viewRes.classList.add('hidden');
  tabUp.classList.add('active');
  tabRes.classList.remove('active');
});

tabRes.addEventListener('click', () => {
  viewRes.classList.remove('hidden');
  viewUp.classList.add('hidden');
  tabRes.classList.add('active');
  tabUp.classList.remove('active');
});

updateGame();

setInterval(() => {
  const delta = 0.33; // seconds per tick
  state.score += state.passiveRate * delta;
  state.totalEmojisGenerated += state.passiveRate * delta;
  updateGame();
}, 330);

document.addEventListener('DOMContentLoaded', () => {
  setModalVisible(visible); 
  updateGame();
});