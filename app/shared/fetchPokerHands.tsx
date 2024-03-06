'use server';

const endpointUrl = 'https://us-central1-fortis-poker.cloudfunctions.net/app/deal';

const fetchHands = async (numCards: number, numPlayers: number): Promise<string[][]> => {
    try {
        const result = await fetch(`${endpointUrl}?numCards=${numCards}&numPlayers=${numPlayers}`);
        const data = await result.json();
        return data.hands;
    } catch (error: any) {
        throw new Error(`Error fetching poker hands: ${error.message}`);
    }
}

export const fetchPokerHands = async (numCards: number, numPlayers: number): Promise<string[][]> => {
    try {
        return await fetchHands(numCards, numPlayers);
    }
    catch (error: any) {
        console.error(error.message);
        return [];
    }
}
