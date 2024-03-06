import { emojiMap } from "./emojiMap";

export interface CardButtonProps {
    card: string;
    isDisabled: boolean;
    onClick: (card: string) => void;
}

export const CardButton: React.FC<CardButtonProps> = ({ card, isDisabled, onClick }) => (
    <button
        className={`m-1 p-1 ${isDisabled ? 'text-gray-500 bg-gray-600' : 'text-white  bg-blue-800'} border border-gray-400 rounded-md hover:bg-blue-500/90`}
        disabled={isDisabled}
        onClick={() => onClick(card)}
    >
        {emojiMap(card, isDisabled)}
    </button>
);



