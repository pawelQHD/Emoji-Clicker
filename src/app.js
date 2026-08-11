import { state, CARDS } from './state.js';
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

    let powerIncrement;
    switch (card.revealAt) {
      case 0:   powerIncrement = 1; break;
      case 100: powerIncrement = 5; break;
      case 2000: powerIncrement = 25; break;
      default:  powerIncrement = 0;
    }

    if (state.score >= card.cost) {
      state.score -= card.cost;
      state.emojiPower += powerIncrement;
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
