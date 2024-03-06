import * as supertest from "supertest";
import * as express from "express";
import {validateHandQuery} from "./validateHandQuery";

const app = express();

app.get("/validate", validateHandQuery);

describe("validateCards endpoint", () => {
  test("should respond with 400 for missing" +
    " or invalid cards parameter", async () => {
    // Missing cards parameter
    await supertest(app)
      .get("/validate")
      .expect(400, {error: "Missing parameter: hands."});
  });

  test("invalid data provided", async () => {
    // Invalid cards parameter (not an array)
    await supertest(app)
      .get("/validate")
      .query({hands: "invalid-7D,8D,9D,TD,JD"})
      .expect(400, {error: "Invalid characters found: invalid"});
  });

  test("should respond with 400 for invalid data", async () => {
    const handOne = "2C,3C,4C,5C,6C";
    // Invalid param in array "10D" should be "TD"
    const handTwo = "7D,8D,9D,10D,JD";
    await supertest(app)
      .get("/validate")
      .query({hands: handOne + "-" + handTwo})
      .expect(400, {error: "Invalid characters found: 10D"});
  });

  test("only sent one hand", async () => {
    const handOne = "2C,3C,4C,5C,6C";
    await supertest(app)
      .get("/validate")
      .query({hands: handOne})
      .expect(400, {error: "Empty Value or missing a hand."});
  });

  test("should respond with handScore for valid cards parameter", async () => {
    const handOne = "2C,3C,4C,5C,6C";
    const handTwo = "7D,8D,9D,TD,JD";
    await supertest(app)
      .get("/validate")
      .query({hands: handOne + "-" + handTwo})
      .expect(200)
      .then((response): void => {
        // TODO: more here
        expect(response.body.results).toBeDefined();
      });
  });
});
