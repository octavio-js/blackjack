import { validateCard } from "./cardValidation.js";
import { drawCard, showCard } from "./cards.js";

export async function hit(deckId, score, container) {
  let card = await drawCard(deckId);
  showCard(card.cards[0].code, container);
  const newScore = parseInt(validateCard(card.cards[0].value, score));
  return newScore;
}