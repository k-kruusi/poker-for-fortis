import {
  getStraightFlushHeuristic,
  getFourOfAKindHeuristic,
  getFullHouseHeuristic,
  getFlushHeuristic,
  getStraightHeuristic,
  getThreeOfAKindHeuristic,
  getTwoPairHeuristic,
  getPairHeuristic,
  getHighCardHeuristic,
} from "./scoringHeuristics"; // Update with the correct path

describe("Scoring Heuristics", () => {
  test("getStraightFlushHeuristic", () => {
    const score = getStraightFlushHeuristic([2, 3, 4, 5, 6]);
    expect(score).toBe(6);
  });

  test("getFourOfAKindHeuristic", () => {
    const groups = [{face: "K", count: 4}];
    const indexValues = [11, 11, 11, 11, 5];
    const score = getFourOfAKindHeuristic(groups, indexValues);

    const groups2 = [{face: "K", count: 4}];
    const indexValues2 = [11, 11, 11, 11, 12];
    const score2 = getFourOfAKindHeuristic(groups2, indexValues2);

    expect(score).toBeLessThan(score2);
  });

  test("getFullHouseHeuristic", () => {
    const groups = [{face: "Q", count: 3}, {face: "K", count: 2}];
    const score = getFullHouseHeuristic(groups);

    const groups2 = [{face: "Q", count: 3}, {face: "A", count: 2}];
    const score2 = getFullHouseHeuristic(groups2);

    expect(score).toBeLessThan(score2);
  });

  test("getFlushHeuristic", () => {
    const indexValues = [10, 8, 6, 4, 2];
    const score = getFlushHeuristic(indexValues);

    const indexValues2 = [12, 10, 8, 6, 4];
    const score2 = getFlushHeuristic(indexValues2);

    expect(score).toBeLessThan(score2);
  });

  test("getStraightHeuristic", () => {
    const indexValues = [11, 10, 9, 8, 7];
    const score = getStraightHeuristic(indexValues);

    const indexValues2 = [12, 11, 10, 9, 8];
    const score2 = getStraightHeuristic(indexValues2);

    expect(score).toBeLessThan(score2);
  });

  test("getThreeOfAKindHeuristic", () => {
    const groups = [{face: "7", count: 3}];
    const indexValues = [5, 5, 5, 3, 2];
    const score = getThreeOfAKindHeuristic(indexValues, groups);

    const groups2 = [{face: "7", count: 3}];
    const indexValues2 = [5, 5, 5, 4, 1];
    const score2 = getThreeOfAKindHeuristic(indexValues2, groups2);

    expect(score).toBeLessThan(score2);
  });

  test("getTwoPairHeuristic", () => {
    const groups = [{face: "9", count: 2}, {face: "Q", count: 2}];
    const indexValues = [10, 10, 7, 7, 5];
    const score = getTwoPairHeuristic(indexValues, groups);

    const groups2 = [{face: "Q", count: 2}, {face: "9", count: 2}];
    const indexValues2 = [10, 10, 7, 7, 6];
    const score2 = getTwoPairHeuristic(indexValues2, groups2);

    expect(score).toBeLessThan(score2);
  });

  test("getPairHeuristic", () => {
    const groups = [{face: "J", count: 2}];
    const indexValues = [11, 9, 9, 6, 2];
    const score = getPairHeuristic(indexValues, groups);

    const groups2 = [{face: "J", count: 2}];
    const indexValues2 = [12, 9, 9, 6, 2];
    const score2 = getPairHeuristic(indexValues2, groups2);

    expect(score).toBeLessThan(score2);
  });

  test("getHighCardHeuristic", () => {
    const score = getHighCardHeuristic([10, 4, 6, 8, 2]);
    const score2 = getHighCardHeuristic([10, 4, 6, 8, 3]);

    expect(score).toBeLessThan(score2);
  });
});
