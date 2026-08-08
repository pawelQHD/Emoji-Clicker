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

const cardCrying = document.getElementById('card_crying'); // New Variable
const btnBuyCrying = document.getElementById('btn_buy_crying'); // New Variable

let score = 0;
let emojiPower = 1;

// --- Function: Update UI Logic ---
function updateGame() {
    // 1. Update the score number on the screen
    countDisplay.innerText = score;

    // 2. Check Starter Card (Cost: 9)
    if (score >= 9) {
        cardStarter.classList.remove('locked_card');
        btnBuyStarter.disabled = false;
    } else {
        cardStarter.classList.add('locked_card');
        btnBuyStarter.disabled = true;
    }

    // 3. Check Laugher Card (Cost: 163)
    if (score >= 163) {
        cardLaugher.classList.remove('locked_card');
        btnBuyLaugher.disabled = false;
    } else {
        cardLaugher.classList.add('locked_card');
        btnBuyLaugher.disabled = true;
    }

    // 4. Check Crying Card (Cost: 2781)
    if (score >= 2781) {
        cardCrying.classList.remove('locked_card');
        btnBuyCrying.disabled = false;
    } else {
        cardCrying.classList.add('locked_card');
        btnBuyCrying.disabled = true;
    }
}

// --- Interaction: Clicking the Emoji ---
emojiButton.addEventListener('click', (e) => {
    score = score + emojiPower;
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
        console.log("Bought Starter! New power: " + emojiPower);
    }
});

// --- Interaction: Buying Laugher ---
btnBuyLaugher.addEventListener('click', () => {
    if (score >= 163) {
        score -= 163;
        emojiPower += 5; 
        updateGame();
        console.log("Bought Laughing Joy! New power: " + emojiPower);
    }
});

// --- Interaction: Buying Crying (NEW) ---
btnBuyCrying.addEventListener('click', () => {
    if (score >= 2781) {
        score -= 2781;
        emojiPower += 25; // Significant jump for the high cost!
        updateGame();
        console.log("Bought Crying Face! New power: " + emojiPower);
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
