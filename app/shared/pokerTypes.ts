// HANDS
export enum HAND {
    INVALID = 0,
    HIGHCARD = 1,
    ONE_PAIR = 2,
    TWO_PAIRS = 3,
    THREE_OF_A_KIND = 4,
    STRAIGHT = 5,
    FLUSH = 6,
    FULL_HOUSE = 7,
    FOUR_OF_A_KIND = 8,
    STRAIGHT_FLUSH = 9,
}

export const handNames: Record<string, string> = {
    [`${HAND.INVALID}`]: 'invalid',
    [`${HAND.HIGHCARD}`]: 'highcard',
    [`${HAND.ONE_PAIR}`]: 'pair',
    [`${HAND.TWO_PAIRS}`]: 'two pair',
    [`${HAND.THREE_OF_A_KIND}`]: 'three of a kind',
    [`${HAND.STRAIGHT}`]: 'straight',
    [`${HAND.FLUSH}`]: 'flush',
    [`${HAND.FULL_HOUSE}`]: 'full house',
    [`${HAND.FOUR_OF_A_KIND}`]: 'four of a kind',
    [`${HAND.STRAIGHT_FLUSH}`]: 'straight flush'
}

// hand metadata
export type HandScore = {
    hand: string[],
    type: number,
    heuristic: number,
}

// constants
export const allFaces = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
export const allSuits = ['C', 'H', 'S', 'D'];
export const fullDeck = [
    '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC', 'AC',
    '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH', 'AH',
    '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS', 'AS',
    '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD', 'AD',
];

