import { handNames } from "../shared";
import { HandScore } from "../shared/pokerTypes"
import { emojiMap } from "./emojiMap";

export const Winner: React.FC<{ handScores: HandScore[] }> = ({ handScores }) => {
    const cardRepresentation = handScores[0].hand.map(
        (card: string) => (<span key={card}>{emojiMap(card)}</span>)
    )
    const handIndex = `${handScores[0].type}`;
    const handName = handNames[handIndex];

    const isTie = handScores[0].type === handScores[1].type
        && handScores[0].heuristic === handScores[1].heuristic;

    if (isTie) {
        const secondRepresentation = handScores[1].hand.map((card: string) => (<span key={card}>{emojiMap(card)}</span>));
        return (
            <div>
                <h1 className="capitalize font-bold text-white">Tie Hands: {handName}</h1>
                <div>{cardRepresentation} • {secondRepresentation}</div>
            </div>
        )
    }

    return (
        <div >
            <h1 className="capitalize font-bold text-white">Winning Hand: {handName}</h1>
            <div>{cardRepresentation}</div>
        </div>
    );
}
