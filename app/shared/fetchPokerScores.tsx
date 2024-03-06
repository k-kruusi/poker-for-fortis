'use server';

import { HandScore, fullDeck } from "./pokerTypes";

const endpointUrl = 'https://us-central1-fortis-poker.cloudfunctions.net/app/validate';

const fetchScores = async (hands: string): Promise<HandScore[]> => {
    try {
        const result = await fetch(`${endpointUrl}?hands=${hands}`);
        const data = await result.json();
        return data.results;
    } catch (error: any) {
        throw new Error(`Error fetching poker data: ${error.message}`);
    }
}

const emptyHand = [{ hand: [], type: 0, heuristic: 0 }];

export const fetchPokerScores = async (hands: string[]): Promise<HandScore[]> => {

    const isInvalid = hands.join(',').split(',').filter((card) => !fullDeck.includes(card));

    if (isInvalid.length > 0) {
        console.error('Invalid input please reset and try again.');
        return emptyHand;
    }

    const allHands = hands.join('-');
    try {
        return await fetchScores(allHands);
    }
    catch (error: any) {
        console.error(error.message);
        return emptyHand;
    }
}