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

import {
  assertPositiveInteger,
  assertIsValidAction,
  getRandomInteger,
} from "./utils";
import * as Deck from "./euchre_decks";
import { _ } from "core-js";
import { assert } from "console";

// --------- Euchre actions ---------
// TODO: Define shifts in base 2 rather than base 10?
const GOING_ALONE_SHIFT = 10;

// Bidding actions
const BIDDING_ACTION_SHIFT = 0;

export const ACTION_PASS = BIDDING_ACTION_SHIFT + 0;
export const ACTION_ORDER_TRUMP = BIDDING_ACTION_SHIFT + 1;
export const ACTION_ORDER_TRUMP_ALONE = ACTION_ORDER_TRUMP + GOING_ALONE_SHIFT;

export const BIDDING_ACTIONS = [
  ACTION_PASS,
  ACTION_ORDER_TRUMP,
  ACTION_ORDER_TRUMP_ALONE,
];

// Bidding on suit actions
const BIDDING_ON_SUIT_ACTION_SHIFT = 100;
const getOrderSuitAction = (suit) => BIDDING_ON_SUIT_ACTION_SHIFT + suit;
const getOrderSuitAloneAction = (suit) =>
  BIDDING_ON_SUIT_ACTION_SHIFT + GOING_ALONE_SHIFT + suit;
const getSuitFromOrderSuitAction = (action) => action % 10;

const getSuitFromAction = (action) => action % 10;
const isGoingAloneAction = (action) => Math.trunc(action / 10) % 10 === 1;

export const BIDDING_ON_SUIT_ACTIONS = Deck.Suits.map((suit) =>
  getOrderSuitAction(suit)
);
export const BIDDING_ON_SUIT_ALONE_ACTIONS = Deck.Suits.map((suit) =>
  getOrderSuitAloneAction(suit)
);
/*
export const ACTION_ORDER_CLUBS =
  BIDDING_ON_SUIT_ACTION_SHIFT + Deck.Suits.CLUBS;
export const ACTION_ORDER_DIAMONDS =
  BIDDING_ON_SUIT_ACTION_SHIFT + Deck.Suits.DIAMONDS;
export const ACTION_ORDER_HEARTS =
  BIDDING_ON_SUIT_ACTION_SHIFT + Deck.Suits.HEARTS;
export const ACTION_ORDER_SPADES =
  BIDDING_ON_SUIT_ACTION_SHIFT + Deck.Suits.SPADES;

export const ACTION_ORDER_CLUBS_ALONE = ACTION_ORDER_CLUBS + GOING_ALONE_SHIFT;
export const ACTION_ORDER_DIAMONDS_ALONE =
  ACTION_ORDER_DIAMONDS + GOING_ALONE_SHIFT;
export const ACTION_ORDER_HEARTS_ALONE =
  ACTION_ORDER_HEARTS + GOING_ALONE_SHIFT;
export const ACTION_ORDER_SPADES_ALONE =
  ACTION_ORDER_SPADES + GOING_ALONE_SHIFT;
*/

// Discard actions
const DISCARD_ACTION_SHIFT = 200;

const getDiscardAction = (card) => DISCARD_ACTION_SHIFT + card.hashCode();

export const DISCARD_ACTIONS = Deck.STANDARD_EUCHRE_DECK.map((card) =>
  getDiscardAction(card)
);
/*
export const ACTION_DISCARD_A_C = getDiscardAction(Deck.CARD_A_C);
export const ACTION_DISCARD_K_C = getDiscardAction(Deck.CARD_K_C);
export const ACTION_DISCARD_Q_C = getDiscardAction(Deck.CARD_Q_C);
export const ACTION_DISCARD_J_C = getDiscardAction(Deck.CARD_J_C);
export const ACTION_DISCARD_T_C = getDiscardAction(Deck.CARD_T_C);
export const ACTION_DISCARD_N_C = getDiscardAction(Deck.CARD_N_C);
export const ACTION_DISCARD_A_D = getDiscardAction(Deck.CARD_A_D);
export const ACTION_DISCARD_K_D = getDiscardAction(Deck.CARD_K_D);
export const ACTION_DISCARD_Q_D = getDiscardAction(Deck.CARD_Q_D);
export const ACTION_DISCARD_J_D = getDiscardAction(Deck.CARD_J_D);
export const ACTION_DISCARD_T_D = getDiscardAction(Deck.CARD_T_D);
export const ACTION_DISCARD_N_D = getDiscardAction(Deck.CARD_N_D);
export const ACTION_DISCARD_A_H = getDiscardAction(Deck.CARD_A_H);
export const ACTION_DISCARD_K_H = getDiscardAction(Deck.CARD_K_H);
export const ACTION_DISCARD_Q_H = getDiscardAction(Deck.CARD_Q_H);
export const ACTION_DISCARD_J_H = getDiscardAction(Deck.CARD_J_H);
export const ACTION_DISCARD_T_H = getDiscardAction(Deck.CARD_T_H);
export const ACTION_DISCARD_N_H = getDiscardAction(Deck.CARD_N_H);
export const ACTION_DISCARD_A_S = getDiscardAction(Deck.CARD_A_S);
export const ACTION_DISCARD_K_S = getDiscardAction(Deck.CARD_K_S);
export const ACTION_DISCARD_Q_S = getDiscardAction(Deck.CARD_Q_S);
export const ACTION_DISCARD_J_S = getDiscardAction(Deck.CARD_J_S);
export const ACTION_DISCARD_T_S = getDiscardAction(Deck.CARD_T_S);
export const ACTION_DISCARD_N_S = getDiscardAction(Deck.CARD_N_S);
*/

// Playing actions
const PLAYING_ACTION_SHIFT = 300;

const getPlayingAction = (card) => PLAYING_ACTION_SHIFT + card.hashCode();

export const PLAYING_ACTIONS = Deck.STANDARD_EUCHRE_DECK.map((card) =>
  getPlayingAction(card)
);
/*
export const ACTION_PLAY_A_C = getPlayingAction(Deck.CARD_A_C);
export const ACTION_PLAY_K_C = getPlayingAction(Deck.CARD_K_C);
export const ACTION_PLAY_Q_C = getPlayingAction(Deck.CARD_Q_C);
export const ACTION_PLAY_J_C = getPlayingAction(Deck.CARD_J_C);
export const ACTION_PLAY_T_C = getPlayingAction(Deck.CARD_T_C);
export const ACTION_PLAY_N_C = getPlayingAction(Deck.CARD_N_C);
export const ACTION_PLAY_A_D = getPlayingAction(Deck.CARD_A_D);
export const ACTION_PLAY_K_D = getPlayingAction(Deck.CARD_K_D);
export const ACTION_PLAY_Q_D = getPlayingAction(Deck.CARD_Q_D);
export const ACTION_PLAY_J_D = getPlayingAction(Deck.CARD_J_D);
export const ACTION_PLAY_T_D = getPlayingAction(Deck.CARD_T_D);
export const ACTION_PLAY_N_D = getPlayingAction(Deck.CARD_N_D);
export const ACTION_PLAY_A_H = getPlayingAction(Deck.CARD_A_H);
export const ACTION_PLAY_K_H = getPlayingAction(Deck.CARD_K_H);
export const ACTION_PLAY_Q_H = getPlayingAction(Deck.CARD_Q_H);
export const ACTION_PLAY_J_H = getPlayingAction(Deck.CARD_J_H);
export const ACTION_PLAY_T_H = getPlayingAction(Deck.CARD_T_H);
export const ACTION_PLAY_N_H = getPlayingAction(Deck.CARD_N_H);
export const ACTION_PLAY_A_S = getPlayingAction(Deck.CARD_A_S);
export const ACTION_PLAY_K_S = getPlayingAction(Deck.CARD_K_S);
export const ACTION_PLAY_Q_S = getPlayingAction(Deck.CARD_Q_S);
export const ACTION_PLAY_J_S = getPlayingAction(Deck.CARD_J_S);
export const ACTION_PLAY_T_S = getPlayingAction(Deck.CARD_T_S);
export const ACTION_PLAY_N_S = getPlayingAction(Deck.CARD_N_S);
*/

export const getCardFromAction = (action) => Deck.getCard(action % 100);

/*
export const ALL_ACTIONS = [
  // Bidding
  ACTION_ORDER_TRUMP,
  ACTION_ORDER_TRUMP_ALONE,
  ACTION_PASS,
  // Biding on suit
  ACTION_ORDER_CLUBS,
  ACTION_ORDER_DIAMONDS,
  ACTION_ORDER_HEARTS,
  ACTION_ORDER_SPADES,
  // Discarding
  ACTION_DISCARD_A_C,
  ACTION_DISCARD_K_C,
  ACTION_DISCARD_Q_C,
  ACTION_DISCARD_J_C,
  ACTION_DISCARD_T_C,
  ACTION_DISCARD_N_C,
  ACTION_DISCARD_A_D,
  ACTION_DISCARD_K_D,
  ACTION_DISCARD_Q_D,
  ACTION_DISCARD_J_D,
  ACTION_DISCARD_T_D,
  ACTION_DISCARD_N_D,
  ACTION_DISCARD_A_H,
  ACTION_DISCARD_K_H,
  ACTION_DISCARD_Q_H,
  ACTION_DISCARD_J_H,
  ACTION_DISCARD_T_H,
  ACTION_DISCARD_N_H,
  ACTION_DISCARD_A_S,
  ACTION_DISCARD_K_S,
  ACTION_DISCARD_Q_S,
  ACTION_DISCARD_J_S,
  ACTION_DISCARD_T_S,
  ACTION_DISCARD_N_S,
  // Playing
  ACTION_PLAY_A_C,
  ACTION_PLAY_K_C,
  ACTION_PLAY_Q_C,
  ACTION_PLAY_J_C,
  ACTION_PLAY_T_C,
  ACTION_PLAY_N_C,
  ACTION_PLAY_A_D,
  ACTION_PLAY_K_D,
  ACTION_PLAY_Q_D,
  ACTION_PLAY_J_D,
  ACTION_PLAY_T_D,
  ACTION_PLAY_N_D,
  ACTION_PLAY_A_H,
  ACTION_PLAY_K_H,
  ACTION_PLAY_Q_H,
  ACTION_PLAY_J_H,
  ACTION_PLAY_T_H,
  ACTION_PLAY_N_H,
  ACTION_PLAY_A_S,
  ACTION_PLAY_K_S,
  ACTION_PLAY_Q_S,
  ACTION_PLAY_J_S,
  ACTION_PLAY_T_S,
  ACTION_PLAY_N_S,
];
*/
export const ALL_ACTIONS = [
  BIDDING_ACTIONS,
  BIDDING_ON_SUIT_ACTIONS,
  BIDDING_ON_SUIT_ALONE_ACTIONS,
  DISCARD_ACTIONS,
  PLAYING_ACTIONS,
].flat(1);
export const NUM_ACTIONS = ALL_ACTIONS.length;

/**
 * @param {Set} validActions
 * @returns Random action in validActions
 */
export function getRandomValidAction(validActions) {
  const actions = [...validActions];
  return actions[getRandomInteger(0, actions.length)];
}

export const normalizePlayer = (player) => player % 4;
export const getTeam = (player) => player % 2;

export const WINNING_SCORE = 10;

export class EuchreGame {
  _deck;
  isPlayingStickTheDealer = false;

  scores;
  sets;
  hands;
  currentDealer;
  currentHand;

  constructor(args) {
    this._deck = args.deck || Deck.STANDARD_EUCHRE_DECK;
    this.isPlayingStickTheDealer = !!args?.isPlayingStickTheDealer;

    // TODO: hard-coding to two teams.
    this.scores = [0, 0];
    this.sets = [0, 0];
    this.hands = [];

    this.currentDealer = getRandomInteger(0, 4);
    this.startNewHand();
  }

  shuffleDeck() {
    Deck.shuffleArray(this.deck);
  }

  get deck() {
    return this._deck;
  }

  get isDone() {
    for (let team = 0; team < this.scores.length; team++) {
      if (WINNING_SCORE <= this.scores[team]) {
        return true;
      }
    }
    return false;
  }

  startNewHand() {
    this.currentHand = new EuchreHand(this, this.currentDealer);
    this.currentDealer = normalizePlayer(this.currentDealer + 1);
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
    this.currentHand.step(action);

    if (this.currentHand.isDone) {
      this.hands.push(this.currentHand);

      // Update scores and sets
      for (let team = 0; team < this.scores.length; team++) {
        this.scores[team] = this.scores[team] + this.currentHand.getScore(team);
        this.sets[team] =
          this.sets[team] + (this.currentHand.isTeamSet(team) ? 1 : 0);
      }

      if (!this.isDone) {
        this.startNewHand();
      }
    }
  }
}

export const Rounds = Object.freeze({
  BIDDING: 9,
  TRICK_1: 0,
  TRICK_2: 1,
  TRICK_3: 2,
  TRICK_4: 3,
  TRICK_5: 4,
});

export class EuchreHand {
  euchreGame;
  hands;

  dealer; // 0, 1, 2, 3
  dealerPartner;
  playerOrderingTrump;
  playerOrderingTrumpPartner;
  currentPlayer;

  trumpCandidate;
  trumpSuit;

  isBiddingOnTrumpCandidate = false;
  isBiddingOnSuit = false;
  isPlayerOrderingTrumpGoingAlone = false;
  isDealerDiscarding = false;

  tricks;
  currentTrick;
  teamTricks = [0, 0];

  publiclyKnownCards;

  constructor(euchreGame, dealer) {
    this.euchreGame = euchreGame;
    // Must be 1, 2, 3, or 4
    this.dealer = dealer;
    this.dealerPartner = normalizePlayer(dealer + 2);
    this.currentPlayer = normalizePlayer(dealer + 1);
    this.tricks = [];
    this.publiclyKnownCards = [];

    // Deal to players in 3-2 because...it's what we do.
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

    this.euchreGame.shuffleDeck();
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

    // The first remaining card is the trump candidate/flipped card.
    // Note this supports playing with modified decks, e.g. add a Joker.
    this.trumpCandidate = deck[20];

    // Track cards that were shown.
    this.publiclyKnownCards.push(this.trumpCandidate);

    this.isBiddingOnTrumpCandidate = true;
  }

  get isBidding() {
    return this.isBiddingOnTrumpCandidate || this.isBiddingOnSuit;
  }

  get isPlayingHand() {
    return !this.isBidding();
  }

  removeCardFromHand(cardToRemove, player) {
    hands[player] = hands[player].filter((card) => card === cardToRemove);
  }

  /**
   *
   * @param {int} player
   * @returns Set of valid action integers
   */
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
        actions.add(ACTION_ORDER_CLUBS_ALONE);
      }
      if (this.trumpSuit !== Suits.DIAMONDS) {
        actions.add(ACTION_ORDER_DIAMONDS);
        actions.add(ACTION_ORDER_DIAMONDS_ALONE);
      }
      if (this.trumpSuit !== Suits.HEARTS) {
        actions.add(ACTION_ORDER_HEARTS);
        actions.add(ACTION_ORDER_HEARTS_ALONE);
      }
      if (this.trumpSuit !== Suits.SPADES) {
        actions.add(ACTION_ORDER_SPADES);
        actions.add(ACTION_ORDER_SPADES_ALONE);
      }
      // The dealer can't pass if we're playing Stick the Dealer
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

  get nextPlayer() {
    if (this.isBiddingOnTrumpCandidate || this.isBiddingOnSuit) {
      return normalizePlayer(this.currentPlayer + 1);
    }
    if (this.isDealerDiscarding) {
      return this.dealer;
    }

    // Is playing a trick.
    let nextPlayer;
    if (this.currentTrick.cards.length === 0) {
      nextPlayer =
        this.tricks.length === 0
          ? normalizePlayer(this.dealer + 1)
          : this.tricks[this.tricks.length - 1].winningPlayer;
    } else {
      nextPlayer = normalizePlayer(this.currentPlayer + 1);
    }

    if (
      this.isPlayerOrderingTrumpGoingAlone &&
      nextPlayer === this.playerOrderingTrumpPartner
    ) {
      // The player going alone's partner isn't playing.
      return normalizePlayer(nextPlayer + 1);
    }
    return nextPlayer;
  }

  orderTrump(action) {
    this.playerOrderingTrump = this.currentPlayer;
    this.playerOrderingTrumpPartner = normalizePlayer(
      this.playerOrderingTrump + 2
    );
    this.isPlayerOrderingTrumpGoingAlone = isGoingAloneAction(action);
    this.trumpSuit = getSuitFromAction(action);

    // The dealer should discard if trump is ordered up unless the dealer's partner ordered alone.
    this.isDealerDiscarding =
      this.isBiddingOnTrumpCandidate &&
      !(
        this.isPlayerOrderingTrumpGoingAlone &&
        this.dealer === this.playerOrderingTrumpPartner
      );

    this.isBiddingOnTrumpCandidate = false;
    this.isBiddingOnSuit = false;
  }

  startRound() {
    this.currentTrick = new Trick(this.trumpSuit);
  }

  endRound() {
    // Analyze the trick.
    this.currentTrick.analyze();

    const teamWinningTrick = getTeam(this.currentTrick.winningPlayer);
    this.teamTricks[teamWinningTrick] = this.teamTricks[teamWinningTrick] + 1;

    this.tricks.push(this.currentTrick);

    // Start the next round
    if (this.tricks.length < 4) {
      this.startRound();
    } else {
      // TODO: is this ok???
      // There's only trick 5 left + everyone only has one card to play.
      for (let i = 0; i < this.numberOfPlayersPlaying; i++) {
        this.currentPlayer = nextPlayer;
        this.step([...this.getValidActions(this.currentPlayer)][0]);
      }
    }
  }

  get numberOfPlayersPlaying() {
    return this.isPlayerOrderingTrumpGoingAlone ? 3 : 4;
  }

  /**
   *
   * @param {*} action
   */
  step(action) {
    assertIsValidAction(action, this.getValidActions(this.currentPlayer));

    if (this.isBidding && action !== ACTION_PASS) {
      this.orderTrump(action);
    } else {
      const card = getCardFromAction(action);

      if (this.isDealerDiscarding) {
        if (card !== this.trumpCandidate) {
          // Remove card from dealer's hand.
          this.removeCardFromHand(card, this.dealer);

          // Add trumpCandidate to dealer's hand.
          hands[dealer].push(this.trumpCandidate);
        }

        this.isDealerDiscarding = false;
      } else {
        // ------- Must be playing -------
        // Add card to publiclyKnownCards for card counting.
        this.publiclyKnownCards.push(card);

        // Remove card from player's hand.
        this.removeCardFromHand(card, this.currentPlayer);

        // Add cards cards for trick.
        this.currentTrick.playCard(card, this.currentPlayer);

        if (this.currentTrick.cards.length === this.numberOfPlayersPlaying) {
          this.endRound();
        }
      }
    }

    this.currentPlayer = this.nextPlayer;
  }

  get isDone() {
    return this.tricks.length === 5;
  }

  get teamOrderedTrump() {
    return getTeam(this.playerOrderingTrump);
  }

  getScore(team) {
    if (team === this.teamOrderedTrump) {
      if (this.teamTricks[team] == 5) {
        return this.isPlayerOrderingTrumpGoingAlone ? 4 : 2;
      }
      if (2 < this.teamTricks[team]) {
        return 1;
      }
      return 0;
    }
    return 2 < this.teamTricks[team] ? 2 : 0;
  }

  isTeamSet(team) {
    return team === this.teamOrderedTrump && this.teamTricks[team] < 3;
  }
}

export class Trick {
  trumpSuit;
  cards;
  playerByCardHashCode;
  winningCard;
  winningPlayer;

  constructor(trumpSuit) {
    this.trumpSuit = trumpSuit;

    this.cards = [];
    this.playerByCardHashCode = {};
  }

  playCard(card, player) {
    this.cards.push(card);
    this.playerByCardHashCode[`${card.hashCode()}`] = player;
  }

  analyze() {
    this.winningCard = Deck.getWinningCard(this.cards, this.trumpSuit);
    this.winningPlayer =
      this.playerByCardHashCode[`${this.winningCard.hashCode()}`];
  }
}

/*
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
   *
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
   *
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
   *
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
   *
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
     *
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
     *
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
   *
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
   *
  getState() {
    return {
      s: this.snakeSquares_.slice(),
      f: this.fruitSquares_.slice(),
    };
  }
}
*/

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
