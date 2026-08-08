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
let emojiPower = 1; // Added this so upgrades can eventually increase power

// --- Interaction: Clicking the Emoji ---
emojiButton.addEventListener('click', (e) => {
    score = score + emojiPower;
    countDisplay.innerText = score;
    
    // This calls the function below to create the +1 text
    createFloatingText(e.clientX, e.clientY);
});

// --- Function: Create Floating Text ---
function createFloatingText(x, y) {
    const text = document.createElement('span');
    text.innerText = `+${emojiPower}`; // Displays the power you get per click
    text.classList.add('floating-text');
    text.style.left = `${x}px`;
    text.style.top = `${y}px`;

    document.body.appendChild(text);

    // This removes the text from the HTML after the animation finishes 
    // so your game doesn't get laggy over time.
    setTimeout(() => {
        text.remove();
    }, 800);
}

// --- Interaction: Buying the Item ---
btnBuyStarter.addEventListener('click', () => {
    if (score >= 9) {
        score -= 9;
        emojiPower += 1; // Example: buying this makes the next click worth more!
        countDisplay.innerText = score;
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
