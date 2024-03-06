import React from 'react';
import { HandScore } from '../shared/pokerTypes';
import { SuitSection } from './suitsSection';
import { Winner } from './winner';
import { Spinner } from './spinner';
import { emojiText } from '../shared';

export interface HandEditorProps {
    handOne: string[];
    handTwo: string[];
    results: HandScore[];
    isLoading: boolean;
    suits: string[][];
    isLengthCorrect: boolean;
    onClickCard: (card: string) => void;
    resetAction: () => void;
    dealAction: () => void;
    submitAction: () => void;
}

export const HandEditor: React.FC<HandEditorProps> = ({
    handOne,
    handTwo,
    results,
    isLoading,
    suits,
    isLengthCorrect,
    onClickCard,
    resetAction,
    dealAction,
    submitAction,
}) => {

    const handOneEmoji = handOne.map((card) => emojiText(card)).join();
    const handTwoEmoji = handTwo.map((card) => emojiText(card)).join();
    return (<div className="color-white text-center border p-2 rounded-lg">
        <div className="h-32 w-100% flex justify-center items-center border rounded-lg bg-green-700">
            {results.length > 1 && results[0] ? <Winner handScores={results} /> : isLoading && <Spinner />}
        </div>
        <h1 className="m-2 font-bold underline">Hand Editor</h1>
        <div className="flex m-2 justify-between" style={{ gap: 10 }}>
            <input className="text-black p-1 rounded-md text-center" type="text" name="handOne" value={handOneEmoji} readOnly />
            <input className="text-black p-1 rounded-md text-center" type="text" name="handTwo" value={handTwoEmoji} readOnly />
        </div>
        <div>
            {suits.map((suit, i) => (
                <SuitSection key={i} suit={suit} selectedCards={[...handOne, ...handTwo]} onClickCard={onClickCard} />
            ))}
        </div>
        <button className="text-white m-2 p-2 border border-gray-500 rounded-md" onClick={dealAction}>Deal</button>
        <button className="text-white m-2 p-2 border border-gray-500 rounded-md" onClick={resetAction}>
            Reset
        </button>
        <button
            className={`${isLengthCorrect ? 'text-white' : 'text-gray-500'} m-2 p-2 border border-gray-500 rounded-md`}
            onClick={submitAction}
            disabled={!isLengthCorrect}
        >
            Submit
        </button>
    </div>);
};