import * as express from "express";
import {fullDeck} from "../shared/types";
import {evaluateHands} from "./evaluateHands";


const ERROR_MISSING_PARAMETER = "Missing parameter: hands.";
const ERROR_EMPTY_OR_MISSING_HAND = "Empty Value or missing a hand.";
const ERROR_INVALID_CHARACTERS = "Invalid characters found: ";

/**
 * Validates the input data before processing the hand
 * @param {express.Request} req the request
 * @param {express.Response} res the response
 * @return {void}
 */
export const validateHandQuery = (
  req: express.Request,
  res: express.Response,
): void => {
  if (!req.query.hands) {
    res.status(400).json({error: ERROR_MISSING_PARAMETER});
    return;
  }
  const handString = (req.query.hands as string);
  const hands = handString.split("-");

  if (!Array.isArray(hands) || hands.length <= 1) {
    res.status(400).json({error: ERROR_EMPTY_OR_MISSING_HAND});
    return;
  }

  const invalidChars = hands
    .join(",")
    .split(",").filter((char) => !fullDeck.includes(char));

  if (invalidChars.length > 0) {
    res.status(400).json({
      error: `${ERROR_INVALID_CHARACTERS}${invalidChars.join(", ")}`,
    });
    return;
  }

  const handScore = evaluateHands(hands);
  res.status(200).json({results: handScore});
};
