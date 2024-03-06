import React from 'react';
import { CardButton } from './cardButton';

export interface SuitSectionProps {
    suit: string[];
    selectedCards: string[];
    onClickCard: (card: string) => void;
}

export const SuitSection: React.FC<SuitSectionProps> = ({
    suit,
    selectedCards,
    onClickCard
}) => (
    <div>
        {suit.map((card) => {
            const isDisabled = selectedCards.includes(card);
            return <CardButton
                key={card}
                card={card}
                isDisabled={isDisabled}
                onClick={onClickCard} />;
        })}
    </div>
);