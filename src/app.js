import { state, CARDS, getCardCost, getPowerGain, getPassiveGain } from './state.js';
import { updateGame, createFloatingText } from './ui.js';

const emojiButton = document.getElementById('emoji-button');

emojiButton.addEventListener('click', e => {
  state.score += state.emojiPower;
  state.totalEmojisGenerated += state.emojiPower;
  updateGame();
  createFloatingText(e.clientX, e.clientY);
});

document.querySelectorAll('.buy_button').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = CARDS.find(c => c.btnId === btn.id);
    if (!card) return;

    const currentCost = parseInt(btn.dataset.cardCost || btn.textContent); // Get cost from button text

    if (state.score >= currentCost) {
      state.score -= currentCost;
      
      // Increment the purchase count for this card
      const newLevel = (state.upgrades[card.id] || 0) + 1;
      state.upgrades[card.id] = newLevel;
      
      // Calculate and apply power gain
      const powerGain = getPowerGain(card);
      state.emojiPower += powerGain;
            // Update passive rate if Laugher purchased
            if (card.id === 'card_laugher') {
              state.passiveRate = getPassiveGain(card);
            }
      
      // Debug: log the upgrade info
      console.log(`Purchased ${card.id}, new level: ${newLevel}`);
      console.log('All upgrades:', state.upgrades);
      
      updateGame();
    }
  });
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

updateGame();   // initial render
// Passive income loop
setInterval(() => {
  const delta = 1; // seconds per tick
  state.score += state.passiveRate * delta;
  state.totalEmojisGenerated += state.passiveRate * delta;
  updateGame();
}, 1000);
