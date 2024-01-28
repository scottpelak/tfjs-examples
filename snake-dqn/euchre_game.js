/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as tf from "@tensorflow/tfjs";

import { assertPositiveInteger, getRandomInteger } from "./utils";
import { _ } from "core-js";

const DEFAULT_HEIGHT = 16;
const DEFAULT_WIDTH = 16;
const DEFAULT_NUM_FRUITS = 1;
const DEFAULT_INIT_LEN = 4;

// TODO(cais): Tune these parameters.
export const NO_FRUIT_REWARD = -0.2;
export const FRUIT_REWARD = 10;
export const DEATH_REWARD = -10;
// TODO(cais): Explore adding a "bad fruit" with a negative reward.

// Snake actions
export const ACTION_GO_STRAIGHT = 0;
export const ACTION_TURN_LEFT = 1;
export const ACTION_TURN_RIGHT = 2;

// Euchre actions

// Bidding actions
export const ACTION_PASS = 0;
export const ACTION_ORDER_TRUMP = 1;
export const ACTION_ORDER_TRUMP_ALONE = 2;

// Bidding on suit actions
const getOrderSuitAction = (suit) => 10 + suit;

export const ACTION_ORDER_CLUBS = 10;
export const ACTION_ORDER_DIAMONDS = 11;
export const ACTION_ORDER_HEARTS = 12;
export const ACTION_ORDER_SPADES = 13;

// Discard actions
const getDiscardAction = (card) => 100 + card.hashCode();

export const ACTION_DISCARD_A_CLUBS = 100;
export const ACTION_DISCARD_K_CLUBS = 101;
export const ACTION_DISCARD_Q_CLUBS = 102;
export const ACTION_DISCARD_J_CLUBS = 103;
export const ACTION_DISCARD_T_CLUBS = 104;
export const ACTION_DISCARD_N_CLUBS = 105;
export const ACTION_DISCARD_A_DIAMONDS = 110;
export const ACTION_DISCARD_K_DIAMONDS = 111;
export const ACTION_DISCARD_Q_DIAMONDS = 112;
export const ACTION_DISCARD_J_DIAMONDS = 113;
export const ACTION_DISCARD_T_DIAMONDS = 114;
export const ACTION_DISCARD_N_DIAMONDS = 115;
export const ACTION_DISCARD_A_HEARTS = 120;
export const ACTION_DISCARD_K_HEARTS = 121;
export const ACTION_DISCARD_Q_HEARTS = 122;
export const ACTION_DISCARD_J_HEARTS = 123;
export const ACTION_DISCARD_T_HEARTS = 124;
export const ACTION_DISCARD_N_HEARTS = 125;
export const ACTION_DISCARD_A_SPADES = 130;
export const ACTION_DISCARD_K_SPADES = 131;
export const ACTION_DISCARD_Q_SPADES = 132;
export const ACTION_DISCARD_J_SPADES = 133;
export const ACTION_DISCARD_T_SPADES = 134;
export const ACTION_DISCARD_N_SPADES = 135;

// Playing actions
const getPlayingAction = (card) => 200 + card.hashCode();

export const ACTION_PLAY_A_CLUBS = 200;
export const ACTION_PLAY_K_CLUBS = 201;
export const ACTION_PLAY_Q_CLUBS = 202;
export const ACTION_PLAY_J_CLUBS = 203;
export const ACTION_PLAY_T_CLUBS = 204;
export const ACTION_PLAY_N_CLUBS = 205;
export const ACTION_PLAY_A_DIAMONDS = 210;
export const ACTION_PLAY_K_DIAMONDS = 211;
export const ACTION_PLAY_Q_DIAMONDS = 212;
export const ACTION_PLAY_J_DIAMONDS = 213;
export const ACTION_PLAY_T_DIAMONDS = 214;
export const ACTION_PLAY_N_DIAMONDS = 215;
export const ACTION_PLAY_A_HEARTS = 220;
export const ACTION_PLAY_K_HEARTS = 221;
export const ACTION_PLAY_Q_HEARTS = 222;
export const ACTION_PLAY_J_HEARTS = 223;
export const ACTION_PLAY_T_HEARTS = 224;
export const ACTION_PLAY_N_HEARTS = 225;
export const ACTION_PLAY_A_SPADES = 230;
export const ACTION_PLAY_K_SPADES = 231;
export const ACTION_PLAY_Q_SPADES = 232;
export const ACTION_PLAY_J_SPADES = 233;
export const ACTION_PLAY_T_SPADES = 234;
export const ACTION_PLAY_N_SPADES = 235;

export const ALL_ACTIONS = [
  ACTION_ORDER_TRUMP,
  ACTION_ORDER_TRUMP_ALONE,
  ACTION_PASS,
  ACTION_ORDER_CLUBS,
  ACTION_ORDER_DIAMONDS,
  ACTION_ORDER_HEARTS,
  ACTION_ORDER_SPADES,
  ACTION_DISCARD_A_CLUBS,
  ACTION_DISCARD_K_CLUBS,
  ACTION_DISCARD_Q_CLUBS,
  ACTION_DISCARD_J_CLUBS,
  ACTION_DISCARD_T_CLUBS,
  ACTION_DISCARD_N_CLUBS,
  ACTION_DISCARD_A_DIAMONDS,
  ACTION_DISCARD_K_DIAMONDS,
  ACTION_DISCARD_Q_DIAMONDS,
  ACTION_DISCARD_J_DIAMONDS,
  ACTION_DISCARD_T_DIAMONDS,
  ACTION_DISCARD_N_DIAMONDS,
  ACTION_DISCARD_A_HEARTS,
  ACTION_DISCARD_K_HEARTS,
  ACTION_DISCARD_Q_HEARTS,
  ACTION_DISCARD_J_HEARTS,
  ACTION_DISCARD_T_HEARTS,
  ACTION_DISCARD_N_HEARTS,
  ACTION_DISCARD_A_SPADES,
  ACTION_DISCARD_K_SPADES,
  ACTION_DISCARD_Q_SPADES,
  ACTION_DISCARD_J_SPADES,
  ACTION_DISCARD_T_SPADES,
  ACTION_DISCARD_N_SPADES,
  ACTION_PLAY_A_CLUBS,
  ACTION_PLAY_K_CLUBS,
  ACTION_PLAY_Q_CLUBS,
  ACTION_PLAY_J_CLUBS,
  ACTION_PLAY_T_CLUBS,
  ACTION_PLAY_N_CLUBS,
  ACTION_PLAY_A_DIAMONDS,
  ACTION_PLAY_K_DIAMONDS,
  ACTION_PLAY_Q_DIAMONDS,
  ACTION_PLAY_J_DIAMONDS,
  ACTION_PLAY_T_DIAMONDS,
  ACTION_PLAY_N_DIAMONDS,
  ACTION_PLAY_A_HEARTS,
  ACTION_PLAY_K_HEARTS,
  ACTION_PLAY_Q_HEARTS,
  ACTION_PLAY_J_HEARTS,
  ACTION_PLAY_T_HEARTS,
  ACTION_PLAY_N_HEARTS,
  ACTION_PLAY_A_SPADES,
  ACTION_PLAY_K_SPADES,
  ACTION_PLAY_Q_SPADES,
  ACTION_PLAY_J_SPADES,
  ACTION_PLAY_T_SPADES,
  ACTION_PLAY_N_SPADES,
];
export const NUM_ACTIONS = ALL_ACTIONS.length;

/**
 * Generate a random action among all possible actions.
 *
 * @return {0 | 1 | 2} Action represented as a number.
 */
export function getRandomAction() {
  // TODO: action must be valid for the game state
  return getRandomInteger(0, NUM_ACTIONS);
}

export class EuchreGame {
  _deck;
  isPlayingStickTheDealer = false;
  // Player 0 - Player 2
  team02Score;
  // Player 1 - Player 3
  team13Score;

  constructor(args) {
    this._deck = args.deck || newDeck();
    this.isPlayingStickTheDealer = !!args?.isPlayingStickTheDealer;

    reset();
  }

  shuffleDeck() {
    shuffleArray(this.deck);
  }

  get deck() {
    return this._deck;
  }

  /**
   * Perform a step of the game.
   *
   * @param {0 | 1 | 2 | 3} action The action to take in the current step.
   *   The meaning of the possible values:
   *     0 - left
   *     1 - top
   *     2 - right
   *     3 - bottom
   * @return {object} Object with the following keys:
   *   - `reward` {number} the reward value.
   *     - 0 if no fruit is eaten in this step
   *     - 1 if a fruit is eaten in this step
   *   - `state` New state of the game after the step.
   *   - `fruitEaten` {boolean} Whether a fruit is easten in this step.
   *   - `done` {boolean} whether the game has ended after this step.
   *     A game ends when the head of the snake goes off the board or goes
   *     over its own body.
   */
  step(action) {}
}

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

  isTrump(trumpSuit) {
    return this.suit === trumpSuit || this.isLeftBower(trumpSuit);
  }
}

const getTrumpComparator = (trumpSuit) => {
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

const getTrickComparator = (cardLed, trumpSuit) => {
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

/**
 *
 * @param {*} cardLed
 * @param {*} trumpSuit
 * @returns Array filter for what cards in a hand must be played to follow suit
 */
const getFilterToFollowSuit = (cardLed, trumpSuit) => {
  if (cardLed.isTrump(trumpSuit)) {
    return (card) => card.isTrump(trumpSuit);
  }
  return (card) => cardLed.suit === card.suit;
};

export const newDeck = () => {
  return shuffleArray([
    new Card(Suits.CLUBS, Ranks.ACE),
    new Card(Suits.CLUBS, Ranks.KING),
    new Card(Suits.CLUBS, Ranks.QUEEN),
    new Card(Suits.CLUBS, Ranks.JACK),
    new Card(Suits.CLUBS, Ranks.TEN),
    new Card(Suits.CLUBS, Ranks.NINE),
    new Card(Suits.DIAMONDS, Ranks.ACE),
    new Card(Suits.DIAMONDS, Ranks.KING),
    new Card(Suits.DIAMONDS, Ranks.QUEEN),
    new Card(Suits.DIAMONDS, Ranks.JACK),
    new Card(Suits.DIAMONDS, Ranks.TEN),
    new Card(Suits.DIAMONDS, Ranks.NINE),
    new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.HEARTS, Ranks.KING),
    new Card(Suits.HEARTS, Ranks.QUEEN),
    new Card(Suits.HEARTS, Ranks.JACK),
    new Card(Suits.HEARTS, Ranks.TEN),
    new Card(Suits.HEARTS, Ranks.NINE),
    new Card(Suits.SPADES, Ranks.ACE),
    new Card(Suits.SPADES, Ranks.KING),
    new Card(Suits.SPADES, Ranks.QUEEN),
    new Card(Suits.SPADES, Ranks.JACK),
    new Card(Suits.SPADES, Ranks.TEN),
    new Card(Suits.SPADES, Ranks.NINE),
  ]);
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const normalizePlayer = (playerIndex) => playerIndex % 4;

export class EuchreHand {
  euchreGame;
  deck;
  hands;
  kiddie;
  shownCards;

  dealer; // 0, 1, 2, 3
  trumpCandidate;
  trumpSuit;

  isBiddingOnTrumpCandidate = false;
  isBiddingOnSuit = false;
  isDealerDiscarding = false;
  playerOrderingTrump;
  isPlayerOrderingTrumpGoingAlone = false;

  tricks;
  cardsPlayed;

  team02Tricks;
  team13Tricks;

  playerFirstToAct;

  /**
   * 0 = bidding
   * 1 = playing trick 1
   * 2 = playing trick 2
   * 3 = playing trick 3
   * 4 = playing trick 4
   * NOT selecting an action for round trick 5 since there's no choice
   */
  roundNumber;

  constructor(euchreGame, dealer) {
    this.euchreGame = euchreGame;
    // Must be 1, 2, 3, or 4
    this.dealer = dealer;
    this.playerFirstToAct = normalizePlayer(dealer + 1);
    this.roundNumber = 0;
    this.tricks = [];
    this.cardsPlayed = [];

    // Deal to players in 3-2 because...it's what we do.
    this.euchreGame.shuffleDeck();
    this.hands = [
      // Player 0
      [],
      // Player 1
      [],
      // Player 2
      [],
      // Player 3
      [],
    ];

    let deck = this.euchreGame.deck;

    // Left of dealer
    this.hands[normalizePlayer(dealer + 1)] = [
      // First pass
      deck[0],
      deck[1],
      deck[2],
      // Second pass
      deck[10],
      deck[11],
    ];

    // Across from dealer
    this.hands[normalizePlayer(dealer + 2)] = [
      // First pass
      deck[3],
      deck[4],
      // Second pass
      deck[12],
      deck[13],
      deck[14],
    ];

    // Right of dealer
    this.hands[normalizePlayer(dealer + 3)] = [
      // First pass
      deck[5],
      deck[6],
      deck[7],
      // Second pass
      deck[15],
      deck[16],
    ];

    // Dealer
    this.hands[normalizePlayer(dealer)] = [
      // First pass
      deck[8],
      deck[9],
      // Second pass
      deck[17],
      deck[18],
      deck[19],
    ];

    this.trumpCandidate = deck[20];

    // Track cards that were shown.
    this.shownCards = [this.trumpCandidate];

    this.isBiddingOnTrumpCandidate = true;
  }

  get isPlayingHand() {
    return !this.isBidding();
  }

  getValidActions(player) {
    if (this.isBiddingOnTrumpCandidate) {
      return new Set([
        ACTION_ORDER_TRUMP,
        ACTION_ORDER_TRUMP_ALONE,
        ACTION_PASS,
      ]);
    }

    let actions = new Set();

    if (this.isDealerDiscarding) {
      actions.add(getDiscardAction(this.trumpCandidate));
      this.hands[dealer].forEach((card) => {
        actions.add(getDiscardAction(card));
      });
      return actions;
    }

    if (this.isBiddingOnSuit) {
      if (this.trumpSuit !== Suits.CLUBS) {
        actions.add(ACTION_ORDER_CLUBS);
      }
      if (this.trumpSuit !== Suits.DIAMONDS) {
        actions.add(ACTION_ORDER_DIAMONDS);
      }
      if (this.trumpSuit !== Suits.HEARTS) {
        actions.add(ACTION_ORDER_HEARTS);
      }
      if (this.trumpSuit !== Suits.SPADES) {
        actions.add(ACTION_ORDER_SPADES);
      }
      // Yes, we're playing stick the dealer.
      if (player !== this.dealer || !this.euchreGame.isPlayingStickTheDealer) {
        actions.add(ACTION_PASS);
      }
      return actions;
    }

    // Is playing hand

    // Is first to act
    if (this.cards.length === 0) {
      // Can choose any card
      hands[player].forEach((card) => {
        actions.add(getPlayingAction(card));
      });
      return actions;
    }

    // Player must follow suit
    const cardLed = this.cards[0];
    const cardsToFollowSuit = hands[player].filter(
      getFilterToFollowSuit(cardLed, this.trumpSuit)
    );
    if (cardsToFollowSuit.length) {
      cardsToFollowSuit.forEach((card) => {
        actions.add(getPlayingAction(card));
      });
      return actions;
    }

    // Player can play anything
    hands[player].forEach((card) => {
      actions.add(getPlayingAction(card));
    });
    return actions;
  }
}

export class Trick {
  playerFirstToAct;
  trumpSuit;
  cards;

  winningCard;
  winningPlayer;

  constructor(playerFirstToAct, trumpSuit, cards) {
    this.playerFirstToAct = playerFirstToAct;
    this.trumpSuit = trumpSuit;
    this.cards = cards;

    let sortedCards = [...cards];
    sortedCards.sort(getTrickComparator(cards[0], trumpSuit));
    this.winningCard = sortedCards[0];

    // Which player won the trick?
    let winningIndex;
    for (let i = 0; i < cards.length; i++) {
      if (this.winningCard.equals(cards[i])) {
        winningIndex = i;
        break;
      }
    }
    this.winningPlayer = normalizePlayer(playerFirstToAct + winningIndex);
  }
}

export class SnakeGame {
  /**
   * Constructor of SnakeGame.
   *
   * @param {object} args Configurations for the game. Fields include:
   *   - height {number} height of the board (positive integer).
   *   - width {number} width of the board (positive integer).
   *   - numFruits {number} number of fruits present on the screen
   *     at any given step.
   *   - initLen {number} initial length of the snake.
   */
  constructor(args) {
    if (args == null) {
      args = {};
    }
    if (args.height == null) {
      args.height = DEFAULT_HEIGHT;
    }
    if (args.width == null) {
      args.width = DEFAULT_WIDTH;
    }
    if (args.numFruits == null) {
      args.numFruits = DEFAULT_NUM_FRUITS;
    }
    if (args.initLen == null) {
      args.initLen = DEFAULT_INIT_LEN;
    }

    assertPositiveInteger(args.height, "height");
    assertPositiveInteger(args.width, "width");
    assertPositiveInteger(args.numFruits, "numFruits");
    assertPositiveInteger(args.initLen, "initLen");

    this.height_ = args.height;
    this.width_ = args.width;
    this.numFruits_ = args.numFruits;
    this.initLen_ = args.initLen;

    this.reset();
  }

  /**
   * Reset the state of the game.
   *
   * @return {object} Initial state of the game.
   *   See the documentation of `getState()` for details.
   */
  reset() {
    this.initializeSnake_();
    this.fruitSquares_ = null;
    this.makeFruits_();
    return this.getState();
  }

  /**
   * Perform a step of the game.
   *
   * @param {0 | 1 | 2 | 3} action The action to take in the current step.
   *   The meaning of the possible values:
   *     0 - left
   *     1 - top
   *     2 - right
   *     3 - bottom
   * @return {object} Object with the following keys:
   *   - `reward` {number} the reward value.
   *     - 0 if no fruit is eaten in this step
   *     - 1 if a fruit is eaten in this step
   *   - `state` New state of the game after the step.
   *   - `fruitEaten` {boolean} Whether a fruit is easten in this step.
   *   - `done` {boolean} whether the game has ended after this step.
   *     A game ends when the head of the snake goes off the board or goes
   *     over its own body.
   */
  step(action) {
    const [headY, headX] = this.snakeSquares_[0];

    // Calculate the coordinates of the new head and check whether it has
    // gone off the board, in which case the game will end.
    let done;
    let newHeadY;
    let newHeadX;

    this.updateDirection_(action);
    if (this.snakeDirection_ === "l") {
      newHeadY = headY;
      newHeadX = headX - 1;
      done = newHeadX < 0;
    } else if (this.snakeDirection_ === "u") {
      newHeadY = headY - 1;
      newHeadX = headX;
      done = newHeadY < 0;
    } else if (this.snakeDirection_ === "r") {
      newHeadY = headY;
      newHeadX = headX + 1;
      done = newHeadX >= this.width_;
    } else if (this.snakeDirection_ === "d") {
      newHeadY = headY + 1;
      newHeadX = headX;
      done = newHeadY >= this.height_;
    }

    // Check if the head goes over the snake's body, in which case the
    // game will end.
    for (let i = 1; i < this.snakeSquares_.length; ++i) {
      if (
        this.snakeSquares_[i][0] === newHeadY &&
        this.snakeSquares_[i][1] === newHeadX
      ) {
        done = true;
      }
    }

    let fruitEaten = false;
    if (done) {
      return { reward: DEATH_REWARD, done, fruitEaten };
    }

    // Update the position of the snake.
    this.snakeSquares_.unshift([newHeadY, newHeadX]);

    // Check if a fruit is eaten.
    let reward = NO_FRUIT_REWARD;
    for (let i = 0; i < this.fruitSquares_.length; ++i) {
      const fruitYX = this.fruitSquares_[i];
      if (fruitYX[0] === newHeadY && fruitYX[1] === newHeadX) {
        reward = FRUIT_REWARD;
        fruitEaten = true;
        this.fruitSquares_.splice(i, 1);
        this.makeFruits_();
        break;
      }
    }
    if (!fruitEaten) {
      // Pop the tail off if and only if the snake didn't eat a fruit in this
      // step.
      this.snakeSquares_.pop();
    }

    const state = this.getState();
    return { reward, state, done, fruitEaten };
  }

  updateDirection_(action) {
    if (this.snakeDirection_ === "l") {
      if (action === ACTION_TURN_LEFT) {
        this.snakeDirection_ = "d";
      } else if (action === ACTION_TURN_RIGHT) {
        this.snakeDirection_ = "u";
      }
    } else if (this.snakeDirection_ === "u") {
      if (action === ACTION_TURN_LEFT) {
        this.snakeDirection_ = "l";
      } else if (action === ACTION_TURN_RIGHT) {
        this.snakeDirection_ = "r";
      }
    } else if (this.snakeDirection_ === "r") {
      if (action === ACTION_TURN_LEFT) {
        this.snakeDirection_ = "u";
      } else if (action === ACTION_TURN_RIGHT) {
        this.snakeDirection_ = "d";
      }
    } else if (this.snakeDirection_ === "d") {
      if (action === ACTION_TURN_LEFT) {
        this.snakeDirection_ = "r";
      } else if (action === ACTION_TURN_RIGHT) {
        this.snakeDirection_ = "l";
      }
    }
  }

  /**
   * Get the current direction of the snake.
   *
   * @returns {'l' | 'u' | 'r' | 'd'} Current direction of the snake.
   */
  get snakeDirection() {
    return this.snakeDirection_;
  }

  initializeSnake_() {
    /**
     * @private {Array<[number, number]>} Squares currently occupied by the
     * snake.
     *
     * Each element is a length-2 array representing the [y, x] coordinates of
     * the square. The array is ordered such that the first element is the
     * head of the snake and the last one is the tail.
     */
    this.snakeSquares_ = [];

    // Currently, the snake will start from a completely-straight and
    // horizontally-posed state.
    const y = getRandomInteger(0, this.height_);
    let x = getRandomInteger(this.initLen_ - 1, this.width_);
    for (let i = 0; i < this.initLen_; ++i) {
      this.snakeSquares_.push([y, x - i]);
    }

    /**
     * Current snake direction {'l' | 'u' | 'r' | 'd'}.
     *
     * Currently, the snake will start from a completely-straight and
     * horizontally-posed state. The initial direction is always right.
     */
    this.snakeDirection_ = "r";
  }

  /**
   * Generate a number of new fruits at a random locations.
   *
   * The number of frtuis created is such that the total number of
   * fruits will be equal to the numFruits specified during the
   * construction of this object.
   *
   * The fruits will be created at unoccupied squares of the board.
   */
  makeFruits_() {
    if (this.fruitSquares_ == null) {
      this.fruitSquares_ = [];
    }
    const numFruits = this.numFruits_ - this.fruitSquares_.length;
    if (numFruits <= 0) {
      return;
    }

    const emptyIndices = [];
    for (let i = 0; i < this.height_; ++i) {
      for (let j = 0; j < this.width_; ++j) {
        emptyIndices.push(i * this.width_ + j);
      }
    }

    // Remove the squares occupied by the snake from the empty indices.
    const occupiedIndices = [];
    this.snakeSquares_.forEach((yx) => {
      occupiedIndices.push(yx[0] * this.width_ + yx[1]);
    });
    occupiedIndices.sort((a, b) => a - b); // TODO(cais): Possible optimization?
    for (let i = occupiedIndices.length - 1; i >= 0; --i) {
      emptyIndices.splice(occupiedIndices[i], 1);
    }

    for (let i = 0; i < numFruits; ++i) {
      const fruitIndex = emptyIndices[getRandomInteger(0, emptyIndices.length)];
      const fruitY = Math.floor(fruitIndex / this.width_);
      const fruitX = fruitIndex % this.width_;
      this.fruitSquares_.push([fruitY, fruitX]);
      if (numFruits > 1) {
        emptyIndices.splice(emptyIndices.indexOf(fruitIndex), 1);
      }
    }
  }

  get height() {
    return this.height_;
  }

  get width() {
    return this.width_;
  }

  /**
   * Get plain JavaScript representation of the game state.
   *
   * @return An object with two keys:
   *   - s: {Array<[number, number]>} representing the squares occupied by
   *        the snake. The array is ordered in such a way that the first
   *        element corresponds to the head of the snake and the last
   *        element corresponds to the tail.
   *   - f: {Array<[number, number]>} representing the squares occupied by
   *        the fruit(s).
   */
  getState() {
    return {
      s: this.snakeSquares_.slice(),
      f: this.fruitSquares_.slice(),
    };
  }
}

/**
 * Get the current state of the game as an image tensor.
 *
 * @param {object | object[]} state The state object as returned by
 *   `SnakeGame.getState()`, consisting of two keys: `s` for the snake and
 *   `f` for the fruit(s). Can also be an array of such state objects.
 * @param {number} h Height.
 * @param {number} w With.
 * @return {tf.Tensor} A tensor of shape [numExamples, height, width, 2] and
 *   dtype 'float32'
 *   - The first channel uses 0-1-2 values to mark the snake.
 *     - 0 means an empty square.
 *     - 1 means the body of the snake.
 *     - 2 means the haed of the snake.
 *   - The second channel uses 0-1 values to mark the fruits.
 *   - `numExamples` is 1 if `state` argument is a single object or an
 *     array of a single object. Otherwise, it will be equal to the length
 *     of the state-object array.
 */

export function getStateTensor(state, h, w) {
  if (!Array.isArray(state)) {
    state = [state];
  }
  const numExamples = state.length;
  // TODO(cais): Maintain only a single buffer for efficiency.
  const buffer = tf.buffer([numExamples, h, w, 2]);

  for (let n = 0; n < numExamples; ++n) {
    if (state[n] == null) {
      continue;
    }
    // Mark the snake.
    state[n].s.forEach((yx, i) => {
      buffer.set(i === 0 ? 2 : 1, n, yx[0], yx[1], 0);
    });

    // Mark the fruit(s).
    state[n].f.forEach((yx) => {
      buffer.set(1, n, yx[0], yx[1], 1);
    });
  }
  return buffer.toTensor();
}
