import * as express from "express";
import {
  validateDealQuery,
  ERROR_MISSING_PARAMETER,
  ERROR_INVALID_CHARACTERS,
} from "./validateDealQuery";

describe("validateDealQuery function", () => {
  const mockRequest = (
    numCards: string,
    numPlayers: string
  ): express.Request => ({
    query: {numCards, numPlayers},
  } as unknown as express.Request);

  const mockResponse = (): express.Response => {
    const res: express.Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    return res;
  };

  it("should respond with an error if" +
        " numCards or numPlayers is missing", () => {
    const req = mockRequest("5", ""); // Missing numPlayers
    const res = mockResponse();

    validateDealQuery(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({error: ERROR_MISSING_PARAMETER});
  });

  it("should respond with an error if" +
        "numCards or numPlayers not a number", () => {
    const req = mockRequest("5", "P");
    const res = mockResponse();

    validateDealQuery(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({error: ERROR_INVALID_CHARACTERS});
  });

  it("should respond with hands if validation passes", () => {
    const req = mockRequest("5", "2");
    const res = mockResponse();

    validateDealQuery(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});
