export async function getShuffledDeck() {
  const endpoint = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const responseJSON = await response.json();
      return responseJSON.deck_id;
    } else {
      return 'error';
    }
  } catch (e) {
    console.error(e);
    return 'error';
  }
}

export async function drawCard(deckId) {
  const endpoint = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const responseJSON = await response.json();
      return responseJSON;
    } else {
      return 'error';
    }
  } catch (e) {
    console.error(e);
    return 'error';
  }
}

export function showCard(cardCode, container) {
  const img = document.createElement('img');
  img.src = `https://deckofcardsapi.com/static/img/${cardCode}.png`;
  img.alt = cardCode;
  img.className = 'card-image';
  container.appendChild(img);
}