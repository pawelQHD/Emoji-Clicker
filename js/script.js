console.log("Script is running!");

// --- Select Elements ---
const emojiButton = document.getElementById('emoji-button');
const countDisplay = document.getElementById('emoji_count');

const tabUp = document.getElementById('tab_up');
const tabRes = document.getElementById('tab_res');
const viewUp = document.getElementById('view_up');
const viewRes = document.getElementById('view_res');

const cardStarter = document.getElementById('card_starter');
const btnBuyStarter = document.getElementById('btn_buy_starter');

let score = 0;
let emojiPower = 1;

// --- Function: Update UI Logic ---
// This function handles the "Greyed Out" look and "Disabling" the button
function updateGame() {
    // 1. Update the score number on the screen
    countDisplay.innerText = score;

    // 2. Check if the player can afford the starter card (Cost: 9)
    if (score >= 9) {
        cardStarter.classList.remove('locked_card');
        btnBuyStarter.disabled = false; // Enables the button
    } else {
        cardStarter.classList.add('locked_card');
        btnBuyStarter.disabled = true;  // Disables the button
    }
}

// --- Interaction: Clicking the Emoji ---
emojiButton.addEventListener('click', (e) => {
    score = score + emojiPower;
    
    // Instead of manually updating the text, we call the master function
    updateGame(); 
    
    // Create the floating +1 text
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

// --- Interaction: Buying the Item ---
btnBuyStarter.addEventListener('click', () => {
    if (score >= 9) {
        score -= 9;
        emojiPower += 1; 
        
        // Call the master function to update the score and lock status
        updateGame();
        console.log("Bought Starter! New power: " + emojiPower);
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
// This runs the check once as soon as the page loads
updateGame();
