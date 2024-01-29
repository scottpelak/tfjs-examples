import * as Deck from "./euchre_decks";

describe("getOppositeSuit", () => {
  it.each([
    ["CLUBS", Deck.Suits.CLUBS, Deck.Suits.SPADES],
    ["DIAMONDS", Deck.Suits.DIAMONDS, Deck.Suits.HEARTS],
    ["HEARTS", Deck.Suits.HEARTS, Deck.Suits.DIAMONDS],
    ["SPADES", Deck.Suits.SPADES, Deck.Suits.CLUBS],
  ])("%s", (_, suit, expected) => {
    expect(Deck.getOppositeSuit(suit)).toStrictEqual(expected);
  });
});

describe.each([
  [Deck.CARD_A_C, 0, Deck.Suits.CLUBS, null, null],
  [Deck.CARD_K_C, 1, Deck.Suits.CLUBS, null, null],
  [Deck.CARD_Q_C, 2, Deck.Suits.CLUBS, null, null],
  [Deck.CARD_J_C, 3, Deck.Suits.CLUBS, Deck.Suits.CLUBS, Deck.Suits.SPADES],
  [Deck.CARD_T_C, 4, Deck.Suits.CLUBS, null, null],
  [Deck.CARD_N_C, 5, Deck.Suits.CLUBS, null, null],
  [Deck.CARD_A_D, 10, Deck.Suits.DIAMONDS, null, null],
  [Deck.CARD_K_D, 11, Deck.Suits.DIAMONDS, null, null],
  [Deck.CARD_Q_D, 12, Deck.Suits.DIAMONDS, null, null],
  [
    Deck.CARD_J_D,
    13,
    Deck.Suits.DIAMONDS,
    Deck.Suits.DIAMONDS,
    Deck.Suits.HEARTS,
  ],
  [Deck.CARD_T_D, 14, Deck.Suits.DIAMONDS, null, null],
  [Deck.CARD_N_D, 15, Deck.Suits.DIAMONDS, null, null],
  [Deck.CARD_A_H, 20, Deck.Suits.HEARTS, null, null],
  [Deck.CARD_K_H, 21, Deck.Suits.HEARTS, null, null],
  [Deck.CARD_Q_H, 22, Deck.Suits.HEARTS, null, null],
  [
    Deck.CARD_J_H,
    23,
    Deck.Suits.HEARTS,
    Deck.Suits.HEARTS,
    Deck.Suits.DIAMONDS,
  ],
  [Deck.CARD_T_H, 24, Deck.Suits.HEARTS, null, null],
  [Deck.CARD_N_H, 25, Deck.Suits.HEARTS, null, null],
  [Deck.CARD_A_S, 30, Deck.Suits.SPADES, null, null],
  [Deck.CARD_K_S, 31, Deck.Suits.SPADES, null, null],
  [Deck.CARD_Q_S, 32, Deck.Suits.SPADES, null, null],
  [Deck.CARD_J_S, 33, Deck.Suits.SPADES, Deck.Suits.SPADES, Deck.Suits.CLUBS],
  [Deck.CARD_T_S, 34, Deck.Suits.SPADES, null, null],
  [Deck.CARD_N_S, 35, Deck.Suits.SPADES, null, null],
])("%s", (card, hashCode, trumpSuit, rightBowerSuit, leftBowerSuit) => {
  it("should have expected hashCode", () => {
    expect(card.hashCode).toStrictEqual(hashCode);
  });

  describe.each(["CLUBS", "DIAMONDS", "HEARTS", "SPADES"])(
    "when trump is %s",
    (arg) => {
      let suit;

      beforeAll(() => {
        suit = Deck.Suits[arg];
      });

      it(`should have expected isRightBower(${arg})`, () => {
        expect(card.isRightBower(suit)).toStrictEqual(suit === rightBowerSuit);
      });

      it(`should have expected isLeftBower(${arg})`, () => {
        expect(card.isLeftBower(suit)).toStrictEqual(suit === leftBowerSuit);
      });

      it(`should have expected isTrump(${arg})`, () => {
        expect(card.isTrump(suit)).toStrictEqual(
          suit === trumpSuit || suit === leftBowerSuit
        );
      });
    }
  );
});

describe("ALL_CARDS", () => {
  it("should have a unique hashCode for each card", () => {
    let hashCodes = new Set(Deck.ALL_CARDS.map((card) => card.hashCode));
    expect(hashCodes.size).toStrictEqual(Deck.ALL_CARDS.length);
  });

  it.each(Deck.ALL_CARDS)("getCard for %s hashCode", (card) => {
    expect(Deck.getCard(card.hashCode)).toStrictEqual(card);
  });
});

describe("STANDARD_EUCHRE_DECK", () => {
  let deck;
  let deckSet;

  beforeAll(() => {
    deck = Deck.STANDARD_EUCHRE_DECK;
    deckSet = new Set(deck);
  });

  it("shouldn't have duplicate cards", () => {
    let hashCodes = new Set(deck.map((card) => card.hashCode));
    expect(hashCodes.size).toStrictEqual(deck.length);
  });

  it("should have 24 cards", () => {
    expect(deck.length).toStrictEqual(24);
  });

  it.each([
    Deck.CARD_A_C,
    Deck.CARD_K_C,
    Deck.CARD_Q_C,
    Deck.CARD_J_C,
    Deck.CARD_T_C,
    Deck.CARD_N_C,
    Deck.CARD_A_D,
    Deck.CARD_K_D,
    Deck.CARD_Q_D,
    Deck.CARD_J_D,
    Deck.CARD_T_D,
    Deck.CARD_N_D,
    Deck.CARD_A_H,
    Deck.CARD_K_H,
    Deck.CARD_Q_H,
    Deck.CARD_J_H,
    Deck.CARD_T_H,
    Deck.CARD_N_H,
    Deck.CARD_A_S,
    Deck.CARD_K_S,
    Deck.CARD_Q_S,
    Deck.CARD_J_S,
    Deck.CARD_T_S,
    Deck.CARD_N_S,
  ])("should have %s", (card) => {
    expect(deckSet.has(card)).toBe(true);
  });
});

describe.each([
  [
    [
      Deck.CARD_J_H.name,
      Deck.CARD_J_D.name,
      Deck.CARD_A_D.name,
      Deck.CARD_N_D.name,
    ],
    [Deck.CARD_J_H, Deck.CARD_J_D, Deck.CARD_A_D, Deck.CARD_N_D],
    [Deck.CARD_J_H, Deck.CARD_J_D, Deck.CARD_A_D, Deck.CARD_N_D],
    [Deck.CARD_J_D, Deck.CARD_J_H, Deck.CARD_A_D, Deck.CARD_N_D],
    [Deck.CARD_J_H, Deck.CARD_J_D, Deck.CARD_A_D, Deck.CARD_N_D],
    [Deck.CARD_J_H, Deck.CARD_J_D, Deck.CARD_A_D, Deck.CARD_N_D],
    Deck.CARD_N_D,
    [Deck.CARD_A_D, Deck.CARD_J_D, Deck.CARD_N_D, Deck.CARD_J_H],
    [Deck.CARD_J_D, Deck.CARD_J_H, Deck.CARD_A_D, Deck.CARD_N_D],
    [Deck.CARD_J_H, Deck.CARD_J_D, Deck.CARD_A_D, Deck.CARD_N_D],
    [Deck.CARD_A_D, Deck.CARD_J_D, Deck.CARD_N_D, Deck.CARD_J_H],
    Deck.CARD_J_H,
    Deck.CARD_J_D,
    Deck.CARD_J_H,
    Deck.CARD_J_H,
    [Deck.CARD_J_D, Deck.CARD_A_D, Deck.CARD_N_D],
    [Deck.CARD_J_H, Deck.CARD_J_D, Deck.CARD_A_D, Deck.CARD_N_D],
    [Deck.CARD_A_D, Deck.CARD_N_D],
    [Deck.CARD_J_D, Deck.CARD_A_D, Deck.CARD_N_D],
  ],
  [
    [
      Deck.CARD_N_C.name,
      Deck.CARD_J_D.name,
      Deck.CARD_J_S.name,
      Deck.CARD_J_H.name,
    ],
    [Deck.CARD_N_C, Deck.CARD_J_D, Deck.CARD_J_S, Deck.CARD_J_H],
    [Deck.CARD_J_S, Deck.CARD_N_C, Deck.CARD_J_D, Deck.CARD_J_H],
    [Deck.CARD_J_D, Deck.CARD_J_H, Deck.CARD_N_C, Deck.CARD_J_S],
    [Deck.CARD_J_H, Deck.CARD_J_D, Deck.CARD_N_C, Deck.CARD_J_S],
    [Deck.CARD_J_S, Deck.CARD_N_C, Deck.CARD_J_D, Deck.CARD_J_H],
    Deck.CARD_N_C,
    [Deck.CARD_J_S, Deck.CARD_N_C, Deck.CARD_J_D, Deck.CARD_J_H],
    [Deck.CARD_J_D, Deck.CARD_J_H, Deck.CARD_N_C, Deck.CARD_J_S],
    [Deck.CARD_J_H, Deck.CARD_J_D, Deck.CARD_N_C, Deck.CARD_J_S],
    [Deck.CARD_J_S, Deck.CARD_N_C, Deck.CARD_J_D, Deck.CARD_J_H],
    Deck.CARD_J_S,
    Deck.CARD_J_D,
    Deck.CARD_J_H,
    Deck.CARD_J_S,
    [Deck.CARD_N_C, Deck.CARD_J_S],
    [Deck.CARD_N_C],
    [Deck.CARD_N_C],
    [Deck.CARD_N_C],
  ],
  [
    [
      Deck.CARD_T_C.name,
      Deck.CARD_K_C.name,
      Deck.CARD_A_C.name,
      Deck.CARD_N_H.name,
    ],
    [Deck.CARD_T_C, Deck.CARD_K_C, Deck.CARD_A_C, Deck.CARD_N_H],
    [Deck.CARD_A_C, Deck.CARD_K_C, Deck.CARD_T_C, Deck.CARD_N_H],
    [Deck.CARD_T_C, Deck.CARD_K_C, Deck.CARD_A_C, Deck.CARD_N_H],
    [Deck.CARD_N_H, Deck.CARD_T_C, Deck.CARD_K_C, Deck.CARD_A_C],
    [Deck.CARD_T_C, Deck.CARD_K_C, Deck.CARD_A_C, Deck.CARD_N_H],
    Deck.CARD_T_C,
    [Deck.CARD_A_C, Deck.CARD_K_C, Deck.CARD_T_C, Deck.CARD_N_H],
    [Deck.CARD_A_C, Deck.CARD_K_C, Deck.CARD_T_C, Deck.CARD_N_H],
    [Deck.CARD_N_H, Deck.CARD_A_C, Deck.CARD_K_C, Deck.CARD_T_C],
    [Deck.CARD_A_C, Deck.CARD_K_C, Deck.CARD_T_C, Deck.CARD_N_H],
    Deck.CARD_A_C,
    Deck.CARD_A_C,
    Deck.CARD_N_H,
    Deck.CARD_A_C,
    [Deck.CARD_T_C, Deck.CARD_K_C, Deck.CARD_A_C],
    [Deck.CARD_T_C, Deck.CARD_K_C, Deck.CARD_A_C],
    [Deck.CARD_T_C, Deck.CARD_K_C, Deck.CARD_A_C],
    [Deck.CARD_T_C, Deck.CARD_K_C, Deck.CARD_A_C],
  ],
  [
    [
      Deck.CARD_T_C.name,
      Deck.CARD_J_S.name,
      Deck.CARD_A_C.name,
      Deck.CARD_N_H.name,
    ],
    [Deck.CARD_T_C, Deck.CARD_J_S, Deck.CARD_A_C, Deck.CARD_N_H],
    [Deck.CARD_J_S, Deck.CARD_A_C, Deck.CARD_T_C, Deck.CARD_N_H],
    [Deck.CARD_T_C, Deck.CARD_J_S, Deck.CARD_A_C, Deck.CARD_N_H],
    [Deck.CARD_N_H, Deck.CARD_T_C, Deck.CARD_J_S, Deck.CARD_A_C],
    [Deck.CARD_J_S, Deck.CARD_T_C, Deck.CARD_A_C, Deck.CARD_N_H],
    Deck.CARD_T_C,
    [Deck.CARD_J_S, Deck.CARD_A_C, Deck.CARD_T_C, Deck.CARD_N_H],
    [Deck.CARD_A_C, Deck.CARD_T_C, Deck.CARD_J_S, Deck.CARD_N_H],
    [Deck.CARD_N_H, Deck.CARD_A_C, Deck.CARD_T_C, Deck.CARD_J_S],
    [Deck.CARD_J_S, Deck.CARD_A_C, Deck.CARD_T_C, Deck.CARD_N_H],
    Deck.CARD_J_S,
    Deck.CARD_A_C,
    Deck.CARD_N_H,
    Deck.CARD_J_S,
    [Deck.CARD_T_C, Deck.CARD_J_S, Deck.CARD_A_C],
    [Deck.CARD_T_C, Deck.CARD_A_C],
    [Deck.CARD_T_C, Deck.CARD_A_C],
    [Deck.CARD_T_C, Deck.CARD_A_C],
  ],
  [
    [
      Deck.CARD_J_C.name,
      Deck.CARD_J_D.name,
      Deck.CARD_J_H.name,
      Deck.CARD_J_S.name,
    ],
    [Deck.CARD_J_C, Deck.CARD_J_D, Deck.CARD_J_H, Deck.CARD_J_S],
    [Deck.CARD_J_C, Deck.CARD_J_S, Deck.CARD_J_D, Deck.CARD_J_H],
    [Deck.CARD_J_D, Deck.CARD_J_H, Deck.CARD_J_C, Deck.CARD_J_S],
    [Deck.CARD_J_H, Deck.CARD_J_D, Deck.CARD_J_C, Deck.CARD_J_S],
    [Deck.CARD_J_S, Deck.CARD_J_C, Deck.CARD_J_D, Deck.CARD_J_H],
    Deck.CARD_J_C,
    [Deck.CARD_J_C, Deck.CARD_J_S, Deck.CARD_J_D, Deck.CARD_J_H],
    [Deck.CARD_J_D, Deck.CARD_J_H, Deck.CARD_J_C, Deck.CARD_J_S],
    [Deck.CARD_J_H, Deck.CARD_J_D, Deck.CARD_J_C, Deck.CARD_J_S],
    [Deck.CARD_J_S, Deck.CARD_J_C, Deck.CARD_J_D, Deck.CARD_J_H],
    Deck.CARD_J_C,
    Deck.CARD_J_D,
    Deck.CARD_J_H,
    Deck.CARD_J_S,
    [Deck.CARD_J_C, Deck.CARD_J_S],
    [Deck.CARD_J_C],
    [Deck.CARD_J_C],
    [Deck.CARD_J_C, Deck.CARD_J_S],
  ],
  [
    [
      Deck.CARD_J_C.name,
      Deck.CARD_T_H.name,
      Deck.CARD_N_C.name,
      Deck.CARD_J_S.name,
    ],
    [Deck.CARD_J_C, Deck.CARD_T_H, Deck.CARD_N_C, Deck.CARD_J_S],
    [Deck.CARD_J_C, Deck.CARD_J_S, Deck.CARD_N_C, Deck.CARD_T_H],
    [Deck.CARD_J_C, Deck.CARD_T_H, Deck.CARD_N_C, Deck.CARD_J_S],
    [Deck.CARD_T_H, Deck.CARD_J_C, Deck.CARD_N_C, Deck.CARD_J_S],
    [Deck.CARD_J_S, Deck.CARD_J_C, Deck.CARD_T_H, Deck.CARD_N_C],
    Deck.CARD_J_C,
    [Deck.CARD_J_C, Deck.CARD_J_S, Deck.CARD_N_C, Deck.CARD_T_H],
    [Deck.CARD_J_C, Deck.CARD_N_C, Deck.CARD_T_H, Deck.CARD_J_S],
    [Deck.CARD_T_H, Deck.CARD_J_C, Deck.CARD_N_C, Deck.CARD_J_S],
    [Deck.CARD_J_S, Deck.CARD_J_C, Deck.CARD_N_C, Deck.CARD_T_H],
    Deck.CARD_J_C,
    Deck.CARD_J_C,
    Deck.CARD_T_H,
    Deck.CARD_J_S,
    [Deck.CARD_J_C, Deck.CARD_N_C, Deck.CARD_J_S],
    [Deck.CARD_J_C, Deck.CARD_N_C],
    [Deck.CARD_J_C, Deck.CARD_N_C],
    [Deck.CARD_J_C, Deck.CARD_J_S],
  ],
])(
  "hand %s",
  (
    _,
    hand,
    handSortedByTrumpWhenClubsTrump,
    handSortedByTrumpWhenDiamondsTrump,
    handSortedByTrumpWhenHeartsTrump,
    handSortedByTrumpWhenSpadesTrump,
    cardLed,
    handSortedByTrickWhenClubsTrump,
    handSortedByTrickWhenDiamondsTrump,
    handSortedByTrickWhenHeartsTrump,
    handSortedByTrickWhenSpadesTrump,
    winningCardWhenClubsTrump,
    winningCardWhenDiamondsTrump,
    winningCardWhenHeartsTrump,
    winningCardWhenSpadesTrump,
    filteredToFollowSuitWhenClubsTrump,
    filteredToFollowSuitWhenDiamondsTrump,
    filteredToFollowSuitWhenHeartsTrump,
    filteredToFollowSuitWhenSpadesTrump
  ) => {
    it.each([
      ["CLUBS", handSortedByTrumpWhenClubsTrump],
      ["DIAMONDS", handSortedByTrumpWhenDiamondsTrump],
      ["HEARTS", handSortedByTrumpWhenHeartsTrump],
      ["SPADES", handSortedByTrumpWhenSpadesTrump],
    ])(
      `should be sorted with getTrumpComparator when %s is trump`,
      (trumpSuitArg, expected) => {
        const trumpSuit = Deck.Suits[trumpSuitArg];
        expect(trumpSuit).not.toBeUndefined();
        expect(trumpSuit).not.toBeNull();

        expect(
          [...hand].sort(Deck.getTrumpComparator(trumpSuit))
        ).toStrictEqual(expected);
      }
    );

    it.each([
      ["CLUBS", handSortedByTrickWhenClubsTrump],
      ["DIAMONDS", handSortedByTrickWhenDiamondsTrump],
      ["HEARTS", handSortedByTrickWhenHeartsTrump],
      ["SPADES", handSortedByTrickWhenSpadesTrump],
    ])(
      `should be sorted getTrickComparator when %s is trump`,
      (trumpSuitArg, expected) => {
        const trumpSuit = Deck.Suits[trumpSuitArg];
        expect(trumpSuit).not.toBeUndefined();
        expect(trumpSuit).not.toBeNull();

        expect(
          [...hand].sort(Deck.getTrickComparator(cardLed, trumpSuit))
        ).toStrictEqual(expected);
      }
    );

    it.each([
      [winningCardWhenClubsTrump, "CLUBS"],
      [winningCardWhenDiamondsTrump, "DIAMONDS"],
      [winningCardWhenHeartsTrump, "HEARTS"],
      [winningCardWhenSpadesTrump, "SPADES"],
    ])(
      `should return %s getWinningCard when %s is trump`,
      (expected, trumpSuitArg) => {
        const trumpSuit = Deck.Suits[trumpSuitArg];
        expect(trumpSuit).not.toBeUndefined();
        expect(trumpSuit).not.toBeNull();

        expect(Deck.getWinningCard(hand, trumpSuit)).toStrictEqual(expected);
      }
    );

    it.each([
      ["CLUBS", filteredToFollowSuitWhenClubsTrump],
      ["DIAMONDS", filteredToFollowSuitWhenDiamondsTrump],
      ["HEARTS", filteredToFollowSuitWhenHeartsTrump],
      ["SPADES", filteredToFollowSuitWhenSpadesTrump],
    ])(
      `should be filtered to follow suit when %s is trump and ${cardLed} is led`,
      (trumpSuitArg, expected) => {
        const trumpSuit = Deck.Suits[trumpSuitArg];
        expect(trumpSuit).not.toBeUndefined();
        expect(trumpSuit).not.toBeNull();

        expect(
          [...hand].filter(Deck.getFilterToFollowSuit(cardLed, trumpSuit))
        ).toStrictEqual(expected);
      }
    );
  }
);
/*
describe.each([
  [
    [
      Deck.CARD_J_H.name,
      Deck.CARD_J_D.name,
      Deck.CARD_A_D.name,
      Deck.CARD_N_D.name,
    ],
    Deck.CARD_N_D,
    [Deck.CARD_J_H, Deck.CARD_J_D, Deck.CARD_A_D, Deck.CARD_N_D],
    [Deck.CARD_A_D, Deck.CARD_J_D, Deck.CARD_N_D, Deck.CARD_J_H],
    [Deck.CARD_J_D, Deck.CARD_J_H, Deck.CARD_A_D, Deck.CARD_N_D],
    [Deck.CARD_J_H, Deck.CARD_J_D, Deck.CARD_A_D, Deck.CARD_N_D],
    [Deck.CARD_A_D, Deck.CARD_J_D, Deck.CARD_N_D, Deck.CARD_J_H],
  ],
  [
    [
      Deck.CARD_N_C.name,
      Deck.CARD_J_D.name,
      Deck.CARD_J_S.name,
      Deck.CARD_J_H.name,
    ],
    Deck.CARD_N_C,
    [Deck.CARD_N_C, Deck.CARD_J_D, Deck.CARD_J_S, Deck.CARD_J_H],
    [Deck.CARD_J_S, Deck.CARD_N_C, Deck.CARD_J_D, Deck.CARD_J_H],
    [Deck.CARD_J_D, Deck.CARD_J_H, Deck.CARD_N_C, Deck.CARD_J_S],
    [Deck.CARD_J_H, Deck.CARD_J_D, Deck.CARD_N_C, Deck.CARD_J_S],
    [Deck.CARD_J_S, Deck.CARD_N_C, Deck.CARD_J_D, Deck.CARD_J_H],
  ],
  [
    [
      Deck.CARD_T_C.name,
      Deck.CARD_K_C.name,
      Deck.CARD_A_C.name,
      Deck.CARD_N_H.name,
    ],
    Deck.CARD_T_C,
    [Deck.CARD_T_C, Deck.CARD_K_C, Deck.CARD_A_C, Deck.CARD_N_H],
    [Deck.CARD_A_C, Deck.CARD_K_C, Deck.CARD_T_C, Deck.CARD_N_H],
    [Deck.CARD_A_C, Deck.CARD_K_C, Deck.CARD_T_C, Deck.CARD_N_H],
    [Deck.CARD_N_H, Deck.CARD_A_C, Deck.CARD_K_C, Deck.CARD_T_C],
    [Deck.CARD_A_C, Deck.CARD_K_C, Deck.CARD_T_C, Deck.CARD_N_H],
  ],
  [
    [
      Deck.CARD_T_C.name,
      Deck.CARD_J_S.name,
      Deck.CARD_A_C.name,
      Deck.CARD_N_H.name,
    ],
    Deck.CARD_T_C,
    [Deck.CARD_T_C, Deck.CARD_J_S, Deck.CARD_A_C, Deck.CARD_N_H],
    [Deck.CARD_J_S, Deck.CARD_A_C, Deck.CARD_T_C, Deck.CARD_N_H],
    [Deck.CARD_A_C, Deck.CARD_T_C, Deck.CARD_J_S, Deck.CARD_N_H],
    [Deck.CARD_N_H, Deck.CARD_A_C, Deck.CARD_T_C, Deck.CARD_J_S],
    [Deck.CARD_J_S, Deck.CARD_A_C, Deck.CARD_T_C, Deck.CARD_N_H],
  ],
  [
    [
      Deck.CARD_J_C.name,
      Deck.CARD_J_D.name,
      Deck.CARD_J_H.name,
      Deck.CARD_J_S.name,
    ],
    Deck.CARD_J_C,
    [Deck.CARD_J_C, Deck.CARD_J_D, Deck.CARD_J_H, Deck.CARD_J_S],
    [Deck.CARD_J_C, Deck.CARD_J_S, Deck.CARD_J_D, Deck.CARD_J_H],
    [Deck.CARD_J_D, Deck.CARD_J_H, Deck.CARD_J_C, Deck.CARD_J_S],
    [Deck.CARD_J_H, Deck.CARD_J_D, Deck.CARD_J_C, Deck.CARD_J_S],
    [Deck.CARD_J_S, Deck.CARD_J_C, Deck.CARD_J_D, Deck.CARD_J_H],
  ],
])(
  "getTrickComparator for hand %s when %s is led",
  (
    _,
    cardLed,
    hand,
    handSortedWhenClubsTrump,
    handSortedWhenDiamondsTrump,
    handSortedWhenHeartsTrump,
    handSortedWhenSpadesTrump
  ) => {
    it.each([
      ["CLUBS", handSortedWhenClubsTrump],
      ["DIAMONDS", handSortedWhenDiamondsTrump],
      ["HEARTS", handSortedWhenHeartsTrump],
      ["SPADES", handSortedWhenSpadesTrump],
    ])(`should be sorted when %s is trump`, (trumpSuitArg, expected) => {
      const trumpSuit = Deck.Suits[trumpSuitArg];
      expect(trumpSuit).not.toBeUndefined();
      expect(trumpSuit).not.toBeNull();

      expect(
        [...hand].sort(Deck.getTrickComparator(cardLed, trumpSuit))
      ).toStrictEqual(expected);
    });
  }
);
*/
