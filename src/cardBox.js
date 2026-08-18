import { state, CARDS } from './state.js';
import { updateGame } from './ui.js';

const openModal   = document.getElementById('open-modal');
const closeModal  = document.getElementById('close-modal');
const modal       = document.getElementById('modal-overlay');

export function setModalVisible(visible) {
  if (visible) modal.classList.remove('hidden');
  else         modal.classList.add('hidden');
}

openModal.addEventListener('click', () => setModalVisible(true));

closeModal.addEventListener('click', () => setModalVisible(false));
modal.addEventListener('click', (e) => {
  if (e.target === modal) setModalVisible(false);
});