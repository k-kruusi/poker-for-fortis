
export const colorMap = (card: string) => {
    const suit = card[1];

    if (suit === 'H' || suit === "D") {
        return 'red';
    }
    return 'black'
}


export const emojiText = (card: string) => {

    const face = card[0];
    const suit = card[1];

    switch (suit) {
        case 'H':
            return `${face}♥`;
        case 'D':
            return `${face}♦`;
        case 'C':
            return `${face}♣`;
        case 'S':
            return `${face}♠`;
    }
}