console.log("Script is running!");

// --- Select Elements ---
const emojiButton = document.getElementById('emoji-button');
const countDisplay = document.getElementById('emoji_count');

const tabUp = document.getElementById('tab_up');
const tabRes = document.getElementById('tab_res');
const viewUp = document.getElementById('view_up');
const viewRes = document.getElementById('view_res');

// Card Elements
const cardStarter = document.getElementById('card_starter');
const btnBuyStarter = document.getElementById('btn_buy_starter');

const cardLaugher = document.getElementById('card_laugher');
const btnBuyLaugher = document.getElementById('btn_buy_laugher');

const cardCrying = document.getElementById('card_crying');
const btnBuyCrying = document.getElementById('btn_buy_crying');

let score = 0;
let totalEmojisGenerated = 0;
let emojiPower = 1;

// --- Function: Update UI Logic ---
function updateGame() {
    countDisplay.innerText = score;

    // Update all cards using the helper function
    updateCardDisplay(cardStarter, btnBuyStarter, 0);    // Always visible
    updateCardDisplay(cardLaugher, btnBuyLaugher, 100);    // Reveal at 100
    updateCardDisplay(cardCrying, btnBuyCrying, 2000);      // Reveal at 2000
}

/**
 * Helper function to handle the 3-step reveal logic
 * This ensures the "Locked" state always takes priority over "Revealed"
 */
function updateCardDisplay(card, btn, target) {
    // --- STEP 1: VISIBILITY LOGIC ---
    if (totalEmojisGenerated < (target / 2)) {
        // State: Hidden
        card.classList.add('hidden');
        card.classList.remove('outline-mode', 'revealed-mode');
    } 
    else if (totalEmojisGenerated < target) {
        // State: Outline (Ghost Emoji only)
        card.classList.remove('hidden');
        card.classList.add('outline-mode');
        card.classList.remove('revealed-mode');
    } 
    else {
        // State: Revealed (Full Color)
        card.classList.remove('hidden');
        card.classList.add('revealed-mode');
        card.classList.remove('outline-mode');
    }

    // --- STEP 2: AFFORDABILITY LOGIC ---
    // This logic runs AFTER visibility. It will overwrite the appearance 
    // if you don't have enough score.
    
    // Determine cost based on which button we are looking at
    let cost = 0;
    if (btn.id === 'btn_buy_starter') cost = 9;
    else if (btn.id === 'btn_buy_laugher') cost = 163;
    else if (btn.id === 'btn_buy_crying') cost = 2781;

    if (score >= cost) {
        card.classList.remove('locked_card');
        btn.disabled = false;
    } else {
        card.classList.add('locked_card');
        btn.disabled = true;
    }
}

// --- Interaction: Clicking the Emoji ---
emojiButton.addEventListener('click', (e) => {
    score = score + emojiPower;
    totalEmojisGenerated = totalEmojisGenerated + emojiPower;
    
    updateGame(); 
    createFloatingText(e.clientX, e.clientY);
});

// --- Function: Create Floating Text ---
function createFloatingText(x, y) {
    const text = document.createElement('span');
    text.innerText = `+${emojiPower}`;
    text.classList.add('floating-text');
    text.style.left = `${x}px`;
    text.style.top = `${y}px`;

    document.body.appendChild(text);

    setTimeout(() => {
        text.remove();
    }, 800);
}

// --- Interaction: Buying Starter ---
btnBuyStarter.addEventListener('click', () => {
    if (score >= 9) {
        score -= 9;
        emojiPower += 1; 
        updateGame();
    }
});

// --- Interaction: Buying Laugher ---
btnBuyLaugher.addEventListener('click', () => {
    if (score >= 163) {
        score -= 163;
        emojiPower += 5; 
        updateGame();
    }
});

// --- Interaction: Buying Crying ---
btnBuyCrying.addEventListener('click', () => {
    if (score >= 2781) {
        score -= 2781;
        emojiPower += 25; 
        updateGame();
    }
});

// --- Interaction: Switching Tabs ---
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

// --- INITIALIZE ---
updateGame();
