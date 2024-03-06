export const emojiMap = (card: string, isDisabled: boolean = false) => {

    const face = card[0];
    const suit = card[1];

    switch (suit) {
        case 'H':
            return <span className={isDisabled ? "text-gray-500" : "text-red-500"}>{face}♥ </span>;
        case 'D':
            return <span className={isDisabled ? "text-gray-500" : "text-red-500"}>{face}♦ </span>;
        case 'C':
            return <span className={isDisabled ? "text-gray-500" : "text-black"}>{face}♣ </span>;
        case 'S':
            return <span className={isDisabled ? "text-gray-500" : "text-black"}>{face}♠ </span>;
    }
}

