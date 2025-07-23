import { getShuffledDeck } from "./scripts/cards.js";
import { deal, sleep } from "./scripts/deal.js";
import { hit } from "./scripts/hit.js";
import { stand } from "./scripts/stand.js";
import { isPlayerScoreHigherThanTwOne, whoWon } from "./scripts/scoreValidation.js";

let pSc = 0;
let dSc = 0;

const playerActions = document.getElementById('actions');
const messageDiv = document.getElementById('message');

const dealButton = document.getElementById('deal-btn');
const hitButton = document.getElementById('hit-btn');
const standButton = document.getElementById('stand-btn');
const resetButton = document.getElementById('reset-btn');

const rulesButton = document.getElementById('rules-btn');
const closeRulesButton = document.getElementById('close-rules-btn');
const rules = document.getElementById('toggled-rules');

const playerCards = document.getElementById('player-cards');
const dealerCards = document.getElementById('dealer-cards');

const dealerScore = document.getElementById('dealer-score');
const playerScore = document.getElementById('player-score');

dealButton.addEventListener('click', async () => {
  const deckId = await getShuffledDeck();
  if (deckId === 'error') {
    messageDiv.textContent = 'Error: Could not fetch a new deck. Please try again.';
    messageDiv.classList.add('message-error');
  } else {
    localStorage.setItem('deckId', deckId);
    playerActions.removeChild(dealButton);
    const points = await deal(deckId, dealerCards, playerCards);
    pSc = points[1];
    playerScore.innerHTML = pSc;
    dSc = points[0];
    dealerScore.innerHTML = dSc;
    hitButton.style.display = 'inline';
    standButton.style.display = 'inline';
    messageDiv.textContent = "";
    messageDiv.classList.remove('message-win', 'message-draw', 'message-lose', 'message-error');
  }
});

hitButton.addEventListener('click', async () => {
  const deckId = localStorage.getItem('deckId');
  pSc += await hit(deckId, pSc, playerCards);
  playerScore.innerHTML = pSc;
  if (isPlayerScoreHigherThanTwOne(pSc)) {
    await STAND();
  }
});

standButton.addEventListener('click', STAND);

resetButton.addEventListener('click', () => {
  playerActions.appendChild(dealButton);
  resetButton.style.display = 'none';
  playerActions.appendChild(hitButton);
  playerActions.appendChild(standButton);
  hitButton.style.display = 'none';
  standButton.style.display = 'none';
  pSc = 0;
  dSc = 0;
  playerCards.innerHTML = '';
  playerScore.innerHTML = '';
  dealerCards.innerHTML = '';
  dealerScore.innerHTML = '';
  messageDiv.textContent = '';
  messageDiv.classList.remove('message-win', 'message-draw', 'message-lose', 'message-error');
});

rulesButton.addEventListener('click', () => {
  rules.style.display = 'block';
});

closeRulesButton.addEventListener('click', () => {
  rules.style.display = 'none';
})

async function STAND() {
  playerActions.removeChild(hitButton);
  playerActions.removeChild(standButton);
  const deckId = localStorage.getItem('deckId');
  const backImageCard = dealerCards.querySelector('.back-image');
  if (backImageCard) {
    dealerCards.removeChild(backImageCard);
  }
  dSc = await stand(deckId, dSc, dealerCards, dealerScore);
  dealerScore.innerHTML = dSc;
  gameEnding(dSc, pSc);
  await sleep(500);
  resetButton.style.display = 'inline';
}

function gameEnding(dealerScore, playerScore) {
  const result = whoWon(dealerScore, playerScore);

  if (result === 'dealer-win') {
    messageDiv.textContent = 'Dealer wins!';
    messageDiv.classList.add('message-lose');
  } else if (result === 'player-win') {
    messageDiv.textContent = 'You win!';
    messageDiv.classList.add('message-win');
  } else if (result === 'draw') {
    messageDiv.textContent = 'Draw!';
    messageDiv.classList.add('message-draw');
  } else {
    messageDiv.textContent('Unexpected game ending!');
    messageDiv.classList.add('message-error');
  }
}

/*

{success: true, deck_id: '9l3vqnti0gtm', cards: Array(1), remaining: 50}
cards
: 
Array(1)
0
: 
code
: 
"2C"
image
: 
"https://deckofcardsapi.com/static/img/2C.png"
images
: 
{svg: 'https://deckofcardsapi.com/static/img/2C.svg', png: 'https://deckofcardsapi.com/static/img/2C.png'}
suit
: 
"CLUBS"
value
: 
"2"
[[Prototype]]
: 
Object
length
: 
1
[[Prototype]]
: 
Array(0)
deck_id
: 
"9l3vqnti0gtm"
remaining
: 
50
success
: 
true
[[Prototype]]
: 
Object

*/