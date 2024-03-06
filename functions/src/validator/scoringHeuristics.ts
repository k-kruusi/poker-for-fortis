import {
  PairMetadata,
  allFaces,
  ELEVATED_PRIORITY,
  HIGH_PRIORITY,
  LOW_PRIORITY,
  STANDARD_PRIORITY,
} from "../shared/types";

/**
 *
 * @param {number[]} faceValues card face values
 * @return {number} a score from using a scoring heuristic flush/straight
 */
export function getStraightFlushHeuristic(faceValues: number[]): number {
  // ties sorted by the highest card
  // NOTE: uses the same heuristic as straight
  return getStraightHeuristic(faceValues);
}

/**
 *
 * @param {PairMetadata[]} groups information about the pairs
 * @param {number[]} faceValues card face values
 * @return {number} a score from using a scoring heuristic for 4 of a kind
 */
export function getFourOfAKindHeuristic(
  groups: PairMetadata[],
  faceValues: number[]
): number {
  // ties sorted by the four of a kind, if they match, you look at the
  const largestGroupPref = ELEVATED_PRIORITY *
    allFaces.indexOf(groups[0].face);
  const kicker = faceValues.filter((x) => x !==
    allFaces.indexOf(groups[0].face))
    .reduce((acc, cur) => acc + cur, 0);
  return largestGroupPref + kicker;
}

/**
 *
 * @param {PairMetadata[]} groups information about the pairs
 * @return {number} a score from using a scoring heuristic for full house
 */
export function getFullHouseHeuristic(groups: PairMetadata[]): number {
  // ties sorted by the 3 of a kind, then the two of a kind
  const largestGroupPref = ELEVATED_PRIORITY *
    allFaces.indexOf(groups[0].face);
  const scoreBySmallerGroup = allFaces.indexOf(groups[1].face);
  return largestGroupPref + scoreBySmallerGroup;
}

/**
 *
 * @param {number[]} faceValues card face values
 * @return {number} a score from a scoring heuristic for flushes
 */
export function getFlushHeuristic(faceValues: number[]) {
  // ties sorted by the highest card, and so on moving
  // along till they no longer match.
  return getHighCardHeuristic(faceValues);
}

/**
 *
 * @param {number[]} faceValues card face values
 * @return {number} a score from a scoring heuristic for straight
 */
export function getStraightHeuristic(faceValues: number[]) {
  // ties sorted by the highest card
  const sortedValues = [...faceValues].sort((a, b) => b - a);
  return sortedValues[0];
}

/**
 *
 * @param {number[]} faceValues card face values
 * @param {PairMetadata[]} groups information about the pairs
 * @return {number} a score from a scoring heuristic 3 of a kind
 */
export function getThreeOfAKindHeuristic(
  faceValues: number[],
  groups: PairMetadata[]
) {
  // ties sorted by the 3 of the kind card,
  // if they match it goes to the higher kicker card,
  // and if they match it goes to the last kicker
  const largestGroupPref = ELEVATED_PRIORITY *
    allFaces.indexOf(groups[0].face);
  const kickers = faceValues.filter((x) => x !==
    allFaces.indexOf(groups[0].face))
    .sort((a, b) => b - a);
  const highKickPref = kickers[0] * STANDARD_PRIORITY;
  const lowKick = kickers[1];
  return largestGroupPref + highKickPref + lowKick;
}

/**
 *
 * @param {number[]} faceValues card face values
 * @param {PairMetadata[]} groups information about the pairs in the hand
 * @return {number} a score from a scoring heuristic two pairs
 */
export function getTwoPairHeuristic(
  faceValues: number[],
  groups: PairMetadata[]
) {
  // note that the groups array is already sorted
  // ties sorting goes from the higher of the pairs first, then
  // if they match then the lower pair then
  // if they match go to the kicker
  const largestGroupPref = ELEVATED_PRIORITY *
    allFaces.indexOf(groups[0].face);
  const scoreBySmallerGroup = allFaces.indexOf(groups[1].face) *
    STANDARD_PRIORITY;
  const kicker = faceValues.filter((x) => x !==
    allFaces.indexOf(groups[0].face) &&
    x !== allFaces.indexOf(groups[1].face))
    .reduce((acc, cur) => acc + cur, 0);
  return largestGroupPref + scoreBySmallerGroup + kicker;
}

/**
 *
 * @param {number[]} faceValues card face values
 * @param {PairMetadata[]}groups information about the pairs in the hand
 * @return {number} a score from a scoring heuristic for pair
 */
export function getPairHeuristic(faceValues: number[], groups: PairMetadata[]) {
  // ties are sorted by the pair first,
  // then by the highest kicker card,
  // until they dont match
  const largestGroupPref = ELEVATED_PRIORITY *
    allFaces.indexOf(groups[0].face);
  const kickers = faceValues.filter((x) => x !==
    allFaces.indexOf(groups[0].face))
    .sort((a, b) => b - a);
  const highKick = kickers[0] * STANDARD_PRIORITY;
  const mediumKick = kickers[1] * LOW_PRIORITY;
  const lowKick = kickers[2];
  return largestGroupPref + highKick + mediumKick + lowKick;
}

/**
 *
 * @param {number[]}faceValues card face values
 * @return {number} a score from a scoring heuristic for highcard
 */
export function getHighCardHeuristic(faceValues: number[]) {
  // ties sorted by the highest card,
  // and so on moving along till they no longer match.
  const sortedValues = [...faceValues].sort((a, b) => b - a);
  const highestCardsPref = HIGH_PRIORITY * sortedValues[0] +
    ELEVATED_PRIORITY * sortedValues[1] +
    STANDARD_PRIORITY * sortedValues[2] +
    LOW_PRIORITY * sortedValues[3] +
    sortedValues[4];
  return highestCardsPref;
}
