/**
 * Everything about euchre decks
 */

/**
 *
 */
export const Suits = Object.freeze({
  CLUBS: 0,
  DIAMONDS: 1,
  HEARTS: 2,
  SPADES: 3,
});

export const getOppositeSuit = (suit) => {
  if (suit === Suits.CLUBS) {
    return Suits.SPADES;
  }
  if (suit === Suits.DIAMONDS) {
    return Suits.HEARTS;
  }
  if (suit === Suits.HEARTS) {
    return Suits.DIAMONDS;
  }
  return Suits.CLUBS;
};

export const Ranks = Object.freeze({
  // Ace
  ACE: 0,
  // King
  KING: 1,
  // Queen
  QUEEN: 2,
  // Jack
  JACK: 3,
  // Ten (10)
  TEN: 4,
  // Nine (9)
  NINE: 5,
});

export class Card {
  suit;
  rank;

  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  hashCode() {
    return 10 * this.suit + 1 + this.rank;
  }

  equals(card) {
    return this.hashCode() === card.hashCode();
  }

  isRightBower(trumpSuit) {
    return this.rank === Ranks.JACK && this.suit === trumpSuit;
  }

  isLeftBower(trumpSuit) {
    return this.rank === Ranks.JACK && getOppositeSuit(this.suit) === trumpSuit;
  }

  /**
   *
   * @param {Suits} trumpSuit
   * @returns
   */
  isTrump(trumpSuit) {
    return this.suit === trumpSuit || this.isLeftBower(trumpSuit);
  }
}

export const getTrumpComparator = (trumpSuit) => {
  // Note: cards can never be the same card
  return (a, b) => {
    if (a.isRightBower(trumpSuit)) {
      return -1;
    }
    if (b.isRightBower(trumpSuit)) {
      return 1;
    }
    if (a.isLeftBower(trumpSuit)) {
      return -1;
    }
    if (b.isLeftBower(trumpSuit)) {
      return 1;
    }
    if (a.isTrump(trumpSuit)) {
      if (b.isTrump(trumpSuit)) {
        // Order on rank
        return a.rank < b.rank ? -1 : 1;
      }
      return -1;
    }
    if (b.isTrump(trumpSuit)) {
      return 1;
    }
    return 0;
  };
};

export const getTrickComparator = (cardLed, trumpSuit) => {
  return (a, b) => {
    const trumpComparator = getTrumpComparator(trumpSuit)(a, b);
    if (trumpComparator !== 0) {
      return trumpComparator;
    }
    if (a.suit === cardLed.suit) {
      if (b.suit === cardLed.suit) {
        return a.rank < b.rank ? -1 : 1;
      }
      return -1;
    }
    if (b.suit === cardLed.suit) {
      return 1;
    }
    return 0;
  };
};

export const getWinningCard = (cards, trumpSuit) => {
  return [...cards].sort(getTrickComparator(cards[0], trumpSuit))[0];
};

/**
 *
 * @param {*} cardLed
 * @param {*} trumpSuit
 * @returns Array filter for what cards in a hand must be played to follow suit
 */
export const getFilterToFollowSuit = (cardLed, trumpSuit) => {
  if (cardLed.isTrump(trumpSuit)) {
    return (card) => card.isTrump(trumpSuit);
  }
  return (card) => cardLed.suit === card.suit;
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Cards
export const CARD_A_C = new Card(Suits.CLUBS, Ranks.ACE);
export const CARD_K_C = new Card(Suits.CLUBS, Ranks.KING);
export const CARD_Q_C = new Card(Suits.CLUBS, Ranks.QUEEN);
export const CARD_J_C = new Card(Suits.CLUBS, Ranks.JACK);
export const CARD_T_C = new Card(Suits.CLUBS, Ranks.TEN);
export const CARD_N_C = new Card(Suits.CLUBS, Ranks.NINE);
export const CARD_A_D = new Card(Suits.DIAMONDS, Ranks.ACE);
export const CARD_K_D = new Card(Suits.DIAMONDS, Ranks.KING);
export const CARD_Q_D = new Card(Suits.DIAMONDS, Ranks.QUEEN);
export const CARD_J_D = new Card(Suits.DIAMONDS, Ranks.JACK);
export const CARD_T_D = new Card(Suits.DIAMONDS, Ranks.TEN);
export const CARD_N_D = new Card(Suits.DIAMONDS, Ranks.NINE);
export const CARD_A_H = new Card(Suits.HEARTS, Ranks.ACE);
export const CARD_K_H = new Card(Suits.HEARTS, Ranks.KING);
export const CARD_Q_H = new Card(Suits.HEARTS, Ranks.QUEEN);
export const CARD_J_H = new Card(Suits.HEARTS, Ranks.JACK);
export const CARD_T_H = new Card(Suits.HEARTS, Ranks.TEN);
export const CARD_N_H = new Card(Suits.HEARTS, Ranks.NINE);
export const CARD_A_S = new Card(Suits.SPADES, Ranks.ACE);
export const CARD_K_S = new Card(Suits.SPADES, Ranks.KING);
export const CARD_Q_S = new Card(Suits.SPADES, Ranks.QUEEN);
export const CARD_J_S = new Card(Suits.SPADES, Ranks.JACK);
export const CARD_T_S = new Card(Suits.SPADES, Ranks.TEN);
export const CARD_N_S = new Card(Suits.SPADES, Ranks.NINE);

const _cardByHashCode = new Map();
[
  CARD_A_C,
  CARD_K_C,
  CARD_Q_C,
  CARD_J_C,
  CARD_T_C,
  CARD_N_C,
  CARD_A_D,
  CARD_K_D,
  CARD_Q_D,
  CARD_J_D,
  CARD_T_D,
  CARD_N_D,
  CARD_A_H,
  CARD_K_H,
  CARD_Q_H,
  CARD_J_H,
  CARD_T_H,
  CARD_N_H,
  CARD_A_S,
  CARD_K_S,
  CARD_Q_S,
  CARD_J_S,
  CARD_T_S,
  CARD_N_S,
].forEach((card) => _cardByHashCode.set(card.hashCode(), card));

export const getCard = (hashCode) => {
  if (_cardByHashCode.has(hashCode)) {
    return _cardByHashCode.get(hashCode);
  } else {
    throw new Error(`No card found with hashCode: ${hashCode}`);
  }
};

export const STANDARD_EUCHRE_DECK = [
  CARD_A_C,
  CARD_K_C,
  CARD_Q_C,
  CARD_J_C,
  CARD_T_C,
  CARD_N_C,
  CARD_A_D,
  CARD_K_D,
  CARD_Q_D,
  CARD_J_D,
  CARD_T_D,
  CARD_N_D,
  CARD_A_H,
  CARD_K_H,
  CARD_Q_H,
  CARD_J_H,
  CARD_T_H,
  CARD_N_H,
  CARD_A_S,
  CARD_K_S,
  CARD_Q_S,
  CARD_J_S,
  CARD_T_S,
  CARD_N_S,
];
