'use client';
import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { HandEditor } from './components';
import { HandScore, fetchPokerHands, fetchPokerScores, fullDeck } from './shared';


const Home: React.FC = () => {
  const [handOne, setHandOne] = useState<string[]>([]);
  const [handTwo, setHandTwo] = useState<string[]>([]);
  const [results, setResults] = useState<HandScore[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isLengthCorrect = handOne.length === 5 && handTwo.length === 5;

  const submitAction = useDebouncedCallback(async () => {
    if (!isLengthCorrect) {
      return;
    }
    setIsLoading(true);
    const result = await fetchPokerScores([handOne.join(','), handTwo.join(',')]);
    setResults(result);
    setIsLoading(false);
  }, 100);

  const dealAction = useDebouncedCallback(async () => {
    resetAction();
    const hands = await fetchPokerHands(5, 2);
    setHandOne(hands[0]);
    setHandTwo(hands[1]);
    setIsLoading(true);
    const result = await fetchPokerScores([handOne.join(','), handTwo.join(',')]);
    setResults(result);
    setIsLoading(false);
  }, 300)

  const resetAction = () => {
    setHandOne([]);
    setHandTwo([]);
    setResults([]);
    setIsLoading(false);
  };

  const suits = [fullDeck.slice(0, 13), fullDeck.slice(13, 26), fullDeck.slice(26, 39), fullDeck.slice(39, 52)];

  const onClickCard = (card: string) => {
    if (handOne.length < 5) {
      setHandOne((prev) => [...prev, card]);
    } else if (handTwo.length < 5) {
      setHandTwo((prev) => [...prev, card]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <br />
      <HandEditor
        handOne={handOne}
        handTwo={handTwo}
        results={results}
        isLoading={isLoading}
        suits={suits}
        isLengthCorrect={isLengthCorrect}
        onClickCard={onClickCard}
        resetAction={resetAction}
        dealAction={dealAction}
        submitAction={submitAction}
      />
      <br />
    </main>
  );
};

export default Home;