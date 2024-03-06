import {
  HAND,
  HandScore,
  TOP_PRIORITY,
  allFaces,
  allSuits,
} from "../shared/types";
import {
  getFlushHeuristic,
  getFourOfAKindHeuristic,
  getFullHouseHeuristic,
  getHighCardHeuristic,
  getPairHeuristic,
  getStraightFlushHeuristic,
  getStraightHeuristic,
  getThreeOfAKindHeuristic,
  getTwoPairHeuristic,
} from "./scoringHeuristics";


const NUM_CARD_FACES = 13;

// Helper function to check for duplicate cards
const hasDuplicateCards = (hand: string[]): boolean => {
  return new Set(hand).size !== hand.length;
};

// Helper function to get face indices
const getFaceIndices = (hand: string[]): number[] => {
  return hand.map((card) => allFaces.indexOf(card[0]));
};

// Helper function to get suit indices
const getSuitIndices = (hand: string[]): number[] => {
  return hand.map((card) => allSuits.indexOf(card[1]));
};

// instead of just taking in 2 hands i figured this requirement
// should be more flexible it makes sense to build it to handle
// a variety of hands as typically more then two people play
// poker, additionally, it returns all the hands in sorted order
// this also makes it easier to handle ties.

export const evaluateHands = (hands: string[]): HandScore[] => {
  const allHands = hands.map((hand) => hand.split(","));
  // figure out what kind of hand it is
  const results = allHands.map((hand) => {
    const handSize = hand.length;
    const faceIndexValues = hand.map((card) => allFaces.indexOf(card[0]));
    const suits = hand.map((card) => allSuits.indexOf(card[1]));

    if (hasDuplicateCards(hand) ||
      getFaceIndices(hand).some((face) => face === -1) ||
      getSuitIndices(hand).some((suit) => suit === -1)
    ) {
      // if theres a duplicate card found the hand is invalid "CHEATER"
      return {hand, type: HAND.INVALID, heuristic: 0};
    }

    // Determind the type of hand
    // in a flush all suits are the same
    const isFlush = suits.every((suit) => suit === suits[0]);

    // counting the number of pairs, separate index for different pairs
    const groups = allFaces.map((face, i) => {
      return {
        count: faceIndexValues.filter((j) => i === j).length,
        face,
      };
    }).sort((x, y) => y.count - x.count);

    // looking for a straight by checking if the delta is too big
    // between the cards and theres no duplicates
    // % to loop is around for Aces' etc.
    const shifted = faceIndexValues.map((cardFace) => (cardFace + 1) %
      NUM_CARD_FACES);
    const distance = Math.min(
      Math.max(...faceIndexValues) - Math.min(...faceIndexValues),
      Math.max(...shifted) - Math.min(...shifted)
    );
    const isStraight = groups[0].count === 1 && distance < handSize;

    // to avoid a nested if statement or switch thought this was clever
    // easier to read in anycase.
    const conditions = [
      {
        condition: isStraight && isFlush,
        type: HAND.STRAIGHT_FLUSH,
        callback: () => getStraightFlushHeuristic(faceIndexValues),
      },
      {
        condition: groups[0].count === 4,
        type: HAND.FOUR_OF_A_KIND,
        callback: () => getFourOfAKindHeuristic(groups, faceIndexValues),
      },
      {
        condition: groups[0].count === 3 && groups[1].count === 2,
        type: HAND.FULL_HOUSE,
        callback: () => getFullHouseHeuristic(groups),
      },
      {
        condition: isFlush,
        type: HAND.FLUSH,
        callback: () => getFlushHeuristic(faceIndexValues),
      },
      {
        condition: isStraight,
        type: HAND.STRAIGHT,
        callback: () => getStraightHeuristic(faceIndexValues),
      },
      {
        condition: groups[0].count === 3,
        type: HAND.THREE_OF_A_KIND,
        callback: () => getThreeOfAKindHeuristic(faceIndexValues, groups),
      },
      {
        condition: groups[0].count === 2 && groups[1].count === 2,
        type: HAND.TWO_PAIRS,
        callback: () => getTwoPairHeuristic(faceIndexValues, groups),
      },
      {
        condition: groups[0].count === 2,
        type: HAND.ONE_PAIR,
        callback: () => getPairHeuristic(faceIndexValues, groups),
      },
    ];

    // returns the first one where the condition is true
    const matchingCondition = conditions.find((condition) =>
      condition.condition);

    if (matchingCondition) {
      const {type, callback} = matchingCondition;
      return {
        hand,
        type,
        heuristic: callback(),
      };
    }

    // Default case
    return {
      hand,
      type: HAND.HIGHCARD,
      heuristic: getHighCardHeuristic(faceIndexValues),
    };
  }).sort((a, b) => {
    // type is given the highest priority,
    // heuristics only need to be used when theres a tie on type
    // but putting them in right away, means we only need to sort once.
    return (b.type * TOP_PRIORITY + b.heuristic) -
      (a.type * TOP_PRIORITY + a.heuristic);
  });
  return results;
};
