function isAce(cardValue) {
  return cardValue === 'ACE' ? true : false;
}

function isAceHigherThanEleven(score) {
  return score >= 11 ? true : false;
}

function validateAce(cardValue, score) {
  if (isAce(cardValue)) {
    if (isAceHigherThanEleven(score)) {
      return 1;
    } else {
      return 11;
    }
  } else {
    return validateOtherCards(cardValue);
  }
}

function validateOtherCards(cardValue, score) {
  switch (cardValue) {
    case 'JACK': {
      return 10;
    }
    case 'QUEEN': {
      return 10;
    }
    case 'KING': {
      return 10;
    }
    case "ACE": {
      return validateAce(cardValue, score)
    }
    default: {
      return cardValue;
    }
  }
}

export function validateCard(cardValue, score) {
  return validateOtherCards(cardValue, score);
}