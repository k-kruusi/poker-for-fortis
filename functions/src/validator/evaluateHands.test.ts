import {HAND} from "../shared/types";
import {evaluateHands} from "./evaluateHands";

describe("Poker Hand Evaluation", () => {
  // Helper function to check if two hands are equal regardless of order

  test("Evaluate hands - Invalid hand", () => {
    const invalidHand = "2C,3C,4C,5C,5C"; // Duplicate card
    const result = evaluateHands([invalidHand]);
    expect(result[0].type).toBe(HAND.INVALID);
  });

  test("Evaluate hands - Straight Flush", () => {
    const straightFlushHand = "2C,3C,4C,5C,6C";
    const result = evaluateHands([straightFlushHand]);
    expect(result[0].type).toBe(HAND.STRAIGHT_FLUSH);
  });

  test("Evaluate hands - Four of a Kind", () => {
    const fourOfAKindHand = "2C,2D,2S,2H,9C";
    const result = evaluateHands([fourOfAKindHand]);
    expect(result[0].type).toBe(HAND.FOUR_OF_A_KIND);
  });

  test("Evaluate hands - Full House", () => {
    const fullHouseHand = "2C,2D,3S,3H,3C";
    const result = evaluateHands([fullHouseHand]);
    expect(result[0].type).toBe(HAND.FULL_HOUSE);
  });

  test("Evaluate hands - Flush", () => {
    const flushHand = "2C,4C,6C,8C,9C";
    const result = evaluateHands([flushHand]);
    expect(result[0].type).toBe(HAND.FLUSH);
  });

  test("Evaluate hands - Straight", () => {
    const straightHand = "2C,3D,4S,5H,6C";
    const result = evaluateHands([straightHand]);
    expect(result[0].type).toBe(HAND.STRAIGHT);
  });

  test("Evaluate hands - Three of a Kind", () => {
    const threeOfAKindHand = "2C,3D,3S,3H,9C";
    const result = evaluateHands([threeOfAKindHand]);
    expect(result[0].type).toBe(HAND.THREE_OF_A_KIND);
  });

  test("Evaluate hands - Two Pairs", () => {
    const twoPairsHand = "2C,3D,3S,4H,4C";
    const result = evaluateHands([twoPairsHand]);
    expect(result[0].type).toBe(HAND.TWO_PAIRS);
  });

  test("Evaluate hands - One Pair", () => {
    const onePairHand = "2C,3D,4D,4H,9C";
    const result = evaluateHands([onePairHand]);
    expect(result[0].type).toBe(HAND.ONE_PAIR);
  });

  test("Evaluate hands - High Card", () => {
    const highCardHand = "2C,3D,4S,6H,9C";
    const result = evaluateHands([highCardHand]);
    expect(result[0].type).toBe(HAND.HIGHCARD);
  });

  test("Evalute multiple hands: High Card," +
    "Pair, Two Pairs, Three of a Kind", () => {
    const highCardHand = "2C,3D,4S,6H,9C";
    const onePairHand = "2C,3D,4S,4H,9C";
    const twoPairsHand = "2C,3D,3S,4H,4C";
    const threeOfAKindHand = "2C,3D,3S,3H,9C";
    const result = evaluateHands([
      highCardHand,
      onePairHand,
      twoPairsHand,
      threeOfAKindHand,
    ]);
    expect(result[0].type).toBe(HAND.THREE_OF_A_KIND);
    expect(result[0].hand.join(",")).toBe(threeOfAKindHand);
  });

  test("Evaluate multiple hands: Straight" +
    ", Flush, Full House, Four of a Kind", () => {
    const straightHand = "2C,3D,4S,5H,6C";
    const flushHand = "2C,4C,6C,8C,9C";
    const fullHouseHand = "2C,2D,3S,3H,3C";
    const fourOfAKindHand = "2C,2D,2S,2H,9C";

    const result = evaluateHands([
      straightHand,
      flushHand,
      fullHouseHand,
      fourOfAKindHand]);
    expect(result[0].type).toBe(HAND.FOUR_OF_A_KIND);
    expect(result[0].hand.join(",")).toBe(fourOfAKindHand);
  });

  test("Evaluate multiple hands of the same" +
    "type: High Card, High Card", () => {
    const highCardHand = "2C,3D,4S,6H,9C";
    const higherCardHand = "2C,3D,5S,6H,9C";
    const result = evaluateHands([
      highCardHand,
      higherCardHand]);
    expect(result[0].type).toBe(HAND.HIGHCARD);
    expect(result[0].hand.join(",")).toBe(higherCardHand);
    const lonelyResult = evaluateHands([highCardHand]);
    expect(result[0].heuristic)
      .toBeGreaterThan(lonelyResult[0].heuristic);
  });
});
