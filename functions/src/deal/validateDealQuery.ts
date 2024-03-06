import * as express from "express";
import {fullDeck} from "../shared/types";
import {deal} from "./deal";


export const ERROR_MISSING_PARAMETER =
    "Missing parameter: hands.";
export const ERROR_ASKED_TO_DEAL_TOO_MANY =
    "Asked to deal more then 52 cards.";
export const ERROR_INVALID_CHARACTERS =
    "Invalid parameter: numCards and numPlayers must be valid numbers.";
/**
 * Validates the input data before processing the hand
 * @param {express.Request} req the request
 * @param {express.Response} res the response
 * @return {void}
 */
export const validateDealQuery = (
  req: express.Request,
  res: express.Response,
): void => {
  if (!req.query.numCards || !req.query.numPlayers) {
    res.status(400).json({error: ERROR_MISSING_PARAMETER});
    return;
  }

  const numCards = parseInt((req.query.numCards as string));
  const numPlayers = parseInt((req.query.numPlayers as string));

  if (isNaN(numCards) || isNaN(numPlayers)) {
    res.status(400).json({error: ERROR_INVALID_CHARACTERS});
    return;
  }

  if (fullDeck.length < numCards * numPlayers) {
    res.status(400).json({error: ERROR_ASKED_TO_DEAL_TOO_MANY});
    return;
  }

  const hands = deal(numCards, numPlayers);
  res.status(200).json({hands});
};
