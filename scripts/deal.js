import { drawCard, showCard } from "./cards.js";
import { validateCard } from "./cardValidation.js";

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function deal(deckId, dealerCards, playerCards) {
  let dealerPoints = 0;
  let playerPoints = 0;

  let card = await drawCard(deckId);
  showCard(card.cards[0].code, dealerCards);
  dealerPoints += parseInt(validateCard(card.cards[0].value, dealerPoints));
  await sleep(500);

  card = await drawCard(deckId);
  showCard(card.cards[0].code, playerCards);
  playerPoints += parseInt(validateCard(card.cards[0].value, playerPoints));
  await sleep(500);

  const img = document.createElement('img');
  img.src = `https://deckofcardsapi.com/static/img/back.png`;
  img.alt = 'back-image';
  img.className = 'card-image back-image';
  dealerCards.appendChild(img);
  await sleep(500);

  card = await drawCard(deckId);
  showCard(card.cards[0].code, playerCards);
  playerPoints += parseInt(validateCard(card.cards[0].value, playerPoints));
  return [dealerPoints, playerPoints];
}