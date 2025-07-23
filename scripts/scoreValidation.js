export function isPlayerScoreHigherThanTwOne(playerScore) {
  return playerScore > 21 ? true : false;
}

export function whoWon(dealerScore, playerScore) {
  if (dealerScore <= 21 && playerScore > 21) {
    return 'dealer-win';
  } else if (dealerScore <= 21 && playerScore <= 21 && dealerScore > playerScore) {
    return 'dealer-win';
  } else if (playerScore <= 21 && dealerScore > 21) {
    return 'player-win';
  } else if (playerScore <= 21 && dealerScore <= 21 && playerScore > dealerScore) {
    return 'player-win';
  } else if (playerScore === dealerScore) {
    return 'draw';
  } else {
    return 'error';
  }
}

export function gameEnding(dealerScore, playerScore, messageContainer) {
  const result = whoWon(dealerScore, playerScore);

  if (result === 'dealer-win') {
    messageContainer.textContent = 'Dealer wins!';
    messageContainer.classList.add('message-lose');
  } else if (result === 'player-win') {
    messageContainer.textContent = 'You win!';
    messageContainer.classList.add('message-win');
  } else if (result === 'draw') {
    messageContainer.textContent = 'Draw!';
    messageContainer.classList.add('message-draw');
  } else {
    messageContainer.textContent('Unexpected game ending!');
    messageContainer.classList.add('message-error');
  }
}