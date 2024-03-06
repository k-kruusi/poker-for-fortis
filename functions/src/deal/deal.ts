import * as shuffleArray from "shuffle-array";
import {fullDeck} from "../shared/types";


export const deal = (numCards: number, numPlayers: number): string[][] => {
  const shuffled = shuffleArray(fullDeck, {copy: true});

  const hands = [];
  for (let i = 0; i < numPlayers; i++) {
    hands.push(shuffled.splice(0, numCards));
  }

  return hands;
};
