import { drawCard, showCard } from "./cards.js";
import { validateCard } from "./cardValidation.js";
import { sleep } from "./deal.js";

export async function stand(deckId, dealerScore, dealerCards, dealerScoreElement) {
  let newScore = 0;
  while (dealerScore < 17) {
    let currentScore = 0;
    let card = await drawCard(deckId);
    showCard(card.cards[0].code, dealerCards);
    await sleep(750);
    currentScore += parseInt(validateCard(card.cards[0].value, dealerScore));
    dealerScore += currentScore;
    dealerScoreElement.innerHTML = dealerScore;
  }
  newScore = dealerScore;
  return newScore;
}